// native/xinput_bridge.cpp
// Compile : cl /O2 /EHsc xinput_bridge.cpp /link /SUBSYSTEM:CONSOLE
// Emissions stdout (une ligne par "press") :
//   BTN A|B|X|Y|LB|RB|LS|RS|START|BACK
//   DPAD UP|DOWN|LEFT|RIGHT
//   TRIGGER LT|RT
//   AXIS LX_POS|LX_NEG|LY_POS|LY_NEG|RX_POS|RX_NEG|RY_POS|RY_NEG
//
// Le Node bridge mappe ensuite ces libellés vers "toggle" / "swap".

#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <Xinput.h>
#include <cstdio>
#include <cstring>

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
};

static const int TRIGGER_THRESHOLD = 30; // 0..255
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

    ControllerState ctrl[4];

    while (true) {
        for (DWORD i = 0; i < 4; ++i) {
            XINPUT_STATE st{};
            DWORD res = pXInputGetState(i, &st);
            if (res == ERROR_SUCCESS) {
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
                } else {
                    // boutons (détecte uniquement les fronts montants)
                    checkButtons(st.Gamepad, ctrl[i].prev.Gamepad);
                    ctrl[i].prev = st;
                }
                // gâchettes + axes (gérés via latch indépendants)
                checkTriggers(ctrl[i], st.Gamepad);
                checkAxes(ctrl[i], st.Gamepad);
            } else {
                // déconnexion / indispo
                ctrl[i] = ControllerState{};
            }
        }
        Sleep(8); // ~125 Hz
    }
    // Note : process stoppé par le parent (kill), pas de cleanup nécessaire
    return 0;
}
