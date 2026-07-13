// native/xinput_bridge.cpp
// Compile : cl /O2 /EHsc xinput_bridge.cpp /link /SUBSYSTEM:CONSOLE
// Protocole stdout v1 (une ligne par "press") : DBT1<TAB><event>
// Events : BTN, DPAD, TRIGGER et AXIS validés côté Electron.
//
// Le Node bridge mappe ensuite ces libellés vers "toggle" / "swap".

#define WIN32_LEAN_AND_MEAN
#define NOMINMAX
#include <windows.h>
#include <Xinput.h>
#include <cstdio>
#include <cstring>
#include <algorithm>
#include <atomic>
#include <iostream>
#include <string>
#include <thread>

#pragma comment(lib, "Xinput9_1_0.lib") // fallback à l’édition disponible

typedef DWORD (WINAPI *XInputGetState_t)(DWORD, XINPUT_STATE*);
static XInputGetState_t pXInputGetState = nullptr;
static HMODULE hXInput = nullptr;

static bool loadXInput() {
    const wchar_t* dlls[] = {
        L"xinput1_4.dll",   // Win8+
        L"xinput1_3.dll",   // SDK June 2010
        L"xinput9_1_0.dll"  // Vista/Win7
    };
    for (auto dll : dlls) {
        hXInput = LoadLibraryW(dll);
        if (hXInput) {
            pXInputGetState = (XInputGetState_t)GetProcAddress(hXInput, "XInputGetState");
            if (pXInputGetState) return true;
            FreeLibrary(hXInput);
            hXInput = nullptr;
        }
    }
    return false;
}

static inline void emit(const char* s) {
    std::fputs("DBT1\t", stdout);
    std::fputs(s, stdout);
    std::fputc('\n', stdout);
    std::fflush(stdout);
}

struct AxisLatch {
    bool pos = false;
    bool neg = false;
};

struct ControllerState {
    bool connected = false;
    bool initialized = false;
    XINPUT_STATE prev{};
    bool ltDown = false;
    bool rtDown = false;
    AxisLatch lx{}, ly{}, rx{}, ry{};
    ULONGLONG nextProbeAt = 0;
};

static const int TRIGGER_THRESHOLD = 30; // 0..255
static const DWORD CONNECTED_POLL_MS = 8;
static const DWORD DISCONNECTED_POLL_MS = 2000;
static const SHORT LEFT_DEADZONE  = XINPUT_GAMEPAD_LEFT_THUMB_DEADZONE;  // 7849
static const SHORT RIGHT_DEADZONE = XINPUT_GAMEPAD_RIGHT_THUMB_DEADZONE; // 8689

static void checkButtons(const XINPUT_GAMEPAD& now, const XINPUT_GAMEPAD& old) {
    struct Btn { WORD mask; const char* name; } btns[] = {
        { XINPUT_GAMEPAD_A,             "BTN A" },
        { XINPUT_GAMEPAD_B,             "BTN B" },
        { XINPUT_GAMEPAD_X,             "BTN X" },
        { XINPUT_GAMEPAD_Y,             "BTN Y" },
        { XINPUT_GAMEPAD_LEFT_SHOULDER, "BTN LB" },
        { XINPUT_GAMEPAD_RIGHT_SHOULDER,"BTN RB" },
        { XINPUT_GAMEPAD_LEFT_THUMB,    "BTN LS" },
        { XINPUT_GAMEPAD_RIGHT_THUMB,   "BTN RS" },
        { XINPUT_GAMEPAD_BACK,          "BTN BACK" },
        { XINPUT_GAMEPAD_START,         "BTN START" },
        { XINPUT_GAMEPAD_DPAD_UP,       "DPAD UP" },
        { XINPUT_GAMEPAD_DPAD_DOWN,     "DPAD DOWN" },
        { XINPUT_GAMEPAD_DPAD_LEFT,     "DPAD LEFT" },
        { XINPUT_GAMEPAD_DPAD_RIGHT,    "DPAD RIGHT" },
    };
    for (auto& b : btns) {
        const bool pressedNow = (now.wButtons & b.mask) != 0;
        const bool pressedOld = (old.wButtons & b.mask) != 0;
        if (pressedNow && !pressedOld) {
            emit(b.name);
        }
    }
}

static void checkTriggers(ControllerState& c, const XINPUT_GAMEPAD& g) {
    // LT
    if (!c.ltDown && g.bLeftTrigger > TRIGGER_THRESHOLD) {
        emit("TRIGGER LT");
        c.ltDown = true;
    } else if (c.ltDown && g.bLeftTrigger <= TRIGGER_THRESHOLD) {
        c.ltDown = false;
    }
    // RT
    if (!c.rtDown && g.bRightTrigger > TRIGGER_THRESHOLD) {
        emit("TRIGGER RT");
        c.rtDown = true;
    } else if (c.rtDown && g.bRightTrigger <= TRIGGER_THRESHOLD) {
        c.rtDown = false;
    }
}

static void checkAxes(ControllerState& c, const XINPUT_GAMEPAD& g) {
    // LEFT X
    if (!c.lx.pos && g.sThumbLX > LEFT_DEADZONE) {
        emit("AXIS LX_POS");
        c.lx.pos = true;
    } else if (c.lx.pos && g.sThumbLX <= LEFT_DEADZONE) {
        c.lx.pos = false;
    }
    if (!c.lx.neg && g.sThumbLX < -LEFT_DEADZONE) {
        emit("AXIS LX_NEG");
        c.lx.neg = true;
    } else if (c.lx.neg && g.sThumbLX >= -LEFT_DEADZONE) {
        c.lx.neg = false;
    }

    // LEFT Y (note: Y haut = valeur positive)
    if (!c.ly.pos && g.sThumbLY > LEFT_DEADZONE) {
        emit("AXIS LY_POS");
        c.ly.pos = true;
    } else if (c.ly.pos && g.sThumbLY <= LEFT_DEADZONE) {
        c.ly.pos = false;
    }
    if (!c.ly.neg && g.sThumbLY < -LEFT_DEADZONE) {
        emit("AXIS LY_NEG");
        c.ly.neg = true;
    } else if (c.ly.neg && g.sThumbLY >= -LEFT_DEADZONE) {
        c.ly.neg = false;
    }

    // RIGHT X
    if (!c.rx.pos && g.sThumbRX > RIGHT_DEADZONE) {
        emit("AXIS RX_POS");
        c.rx.pos = true;
    } else if (c.rx.pos && g.sThumbRX <= RIGHT_DEADZONE) {
        c.rx.pos = false;
    }
    if (!c.rx.neg && g.sThumbRX < -RIGHT_DEADZONE) {
        emit("AXIS RX_NEG");
        c.rx.neg = true;
    } else if (c.rx.neg && g.sThumbRX >= -RIGHT_DEADZONE) {
        c.rx.neg = false;
    }

    // RIGHT Y
    if (!c.ry.pos && g.sThumbRY > RIGHT_DEADZONE) {
        emit("AXIS RY_POS");
        c.ry.pos = true;
    } else if (c.ry.pos && g.sThumbRY <= RIGHT_DEADZONE) {
        c.ry.pos = false;
    }
    if (!c.ry.neg && g.sThumbRY < -RIGHT_DEADZONE) {
        emit("AXIS RY_NEG");
        c.ry.neg = true;
    } else if (c.ry.neg && g.sThumbRY >= -RIGHT_DEADZONE) {
        c.ry.neg = false;
    }
}

int main() {
    // Pas de bruit de buffer
    setvbuf(stdout, nullptr, _IONBF, 0);

    if (!loadXInput()) {
        // XInput introuvable : on sort proprement (le parent peut décider de ne pas relancer)
        return 0;
    }

    std::atomic<bool> stopRequested{false};
    std::thread controlThread([&stopRequested]() {
        std::string command;
        while (std::getline(std::cin, command)) {
            if (command == "QUIT") break;
        }
        stopRequested.store(true, std::memory_order_relaxed);
    });

    ControllerState ctrl[4];

    while (!stopRequested.load(std::memory_order_relaxed)) {
        const ULONGLONG now = GetTickCount64();
        ULONGLONG nextWakeAt = now + DISCONNECTED_POLL_MS;
        for (DWORD i = 0; i < 4; ++i) {
            if (now < ctrl[i].nextProbeAt) {
                nextWakeAt = std::min(nextWakeAt, ctrl[i].nextProbeAt);
                continue;
            }

            XINPUT_STATE st{};
            DWORD res = pXInputGetState(i, &st);
            if (res == ERROR_SUCCESS) {
                ctrl[i].nextProbeAt = now + CONNECTED_POLL_MS;
                nextWakeAt = std::min(nextWakeAt, ctrl[i].nextProbeAt);
                if (!ctrl[i].connected) {
                    ctrl[i].connected = true;
                    ctrl[i].initialized = false;
                    ctrl[i].ltDown = ctrl[i].rtDown = false;
                    ctrl[i].lx = AxisLatch{};
                    ctrl[i].ly = AxisLatch{};
                    ctrl[i].rx = AxisLatch{};
                    ctrl[i].ry = AxisLatch{};
                }
                if (!ctrl[i].initialized) {
                    ctrl[i].prev = st;
                    ctrl[i].initialized = true;
                } else if (st.dwPacketNumber != ctrl[i].prev.dwPacketNumber) {
                    // boutons (détecte uniquement les fronts montants)
                    checkButtons(st.Gamepad, ctrl[i].prev.Gamepad);
                    ctrl[i].prev = st;
                } else {
                    continue;
                }
                // gâchettes + axes (gérés via latch indépendants)
                checkTriggers(ctrl[i], st.Gamepad);
                checkAxes(ctrl[i], st.Gamepad);
            } else {
                // déconnexion / indispo
                ctrl[i] = ControllerState{};
                ctrl[i].nextProbeAt = now + DISCONNECTED_POLL_MS;
                nextWakeAt = std::min(nextWakeAt, ctrl[i].nextProbeAt);
            }
        }
        const ULONGLONG afterPoll = GetTickCount64();
        const DWORD sleepMs = nextWakeAt > afterPoll
            ? static_cast<DWORD>(std::min<ULONGLONG>(nextWakeAt - afterPoll, DISCONNECTED_POLL_MS))
            : 1;
        Sleep(sleepMs);
    }
    // Note : process stoppé par le parent (kill), pas de cleanup nécessaire
    controlThread.join();
    if (hXInput) FreeLibrary(hXInput);
    return 0;
}
