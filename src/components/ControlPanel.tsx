import React, { useEffect, useState } from "react";
import { ACCENTS, AccentKey, NameTheme } from "@/themes/palette";
import { sanitizePlayerName } from "@/utils/sanitize";
import UpdateModal from "./UpdateModal";
import PremiumModal from "./PremiumModal";
import PreferencesModal from "./PreferencesModal";
import TitleBar from "./control-panel/TitleBar";
import AppearanceSection from "./control-panel/AppearanceSection";
import OverlaySettingsSection from "./control-panel/OverlaySettingsSection";
import PlayersSection from "./control-panel/PlayersSection";
import PromotionSections from "./control-panel/PromotionSections";
import GamepadHotkeysSection from "./control-panel/GamepadHotkeysSection";
import DesktopHotkeysSection from "./control-panel/DesktopHotkeysSection";
import type { HotkeyChord } from "@/types/ipc";

type HKGet = {
  start: number | HotkeyChord | null;
  reset: number | HotkeyChord | null;
  swap: number | HotkeyChord | null;
  startLabel?: string;
  resetLabel?: string;
  swapLabel?: string;
};

type GamepadMapping = {
  toggle: string[];
  swap: string[];
};

const ACCENT_LABELS_EN: Record<AccentKey, string> = {
  default: "Blue (default)",
  rose: "Pink",
  rouge: "Red",
  orange: "Orange",
  or: "Gold",
  jaune: "Yellow",
  vert: "Green",
  menthe: "Mint",
  bleu_fonce: "Dark Blue",
  bleu_clair: "Light Blue",
  cyan: "Sky/Cyan",
  violet: "Violet",
  lavande: "Lavender",
  marron: "Brown",
  anthracite: "Charcoal",
  argent: "Silver",
  corail: "Coral/Peach",
  turquoise: "Turquoise",
  indigo: "Indigo",
  fuchsia: "Fuchsia",
  emeraude: "Emerald",
  peche: "Peach",
  pride: "Pride Rainbow",
};

const ControlPanel: React.FC = () => {
  // Window controls
  const [isMaximized, setIsMaximized] = useState(false);
  const [appVersion, setAppVersion] = useState("3.0");

  // Overlay
  const [overlayOn, setOverlayOn] = useState(false);
  const [locked, setLocked] = useState(true);
  const [scale, setScale] = useState(100);
  const scaleDebounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const [nameTheme, setNameTheme] = useState<NameTheme>("default");
  const [accentKey, setAccentKey] = useState<AccentKey>("default");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Auto-score
  const [autoScore, setAutoScore] = useState<boolean>(true);
  const [autoScoreThresholdSec] = useState<number>(25);

  // Players
  const [players, setPlayers] = useState({
    player1: { name: "PLAYER 1", score: 0 },
    player2: { name: "PLAYER 2", score: 0 },
  });

  // Desktop hotkeys (keyboard/mouse)
  const [hkLabels, setHkLabels] = useState<{ start: string; reset: string; swap: string }>({
    start: "F1",
    reset: "—",
    swap: "F2",
  });
  const [capturing, setCapturing] = useState<null | "start" | "reset" | "swap">(null);

  // Gamepad
  const [gp, setGp] = useState<GamepadMapping>({ toggle: [], swap: [] });
  const [capturingGp, setCapturingGp] = useState<null | "toggle" | "swap">(null);

  // Collapsible hotkey sections
  const [kbOpen, setKbOpen] = useState(true);
  const [gpOpen, setGpOpen] = useState(true);

  useEffect(() => {
    // Window controls init
    window.api.win.isMaximized().then((v: boolean) => setIsMaximized(v));
    const cleanupMaximize = window.api.win.onMaximizeChange((v: boolean) => setIsMaximized(v));
    window.api.win.getVersion().then((v: string) => { if (v) setAppVersion(v); });

    window.api.timer.get().then((d) => {
      if (d?.player1 && d?.player2) {
        // Sanitize loaded names from store
        setPlayers({
          player1: {
            name: sanitizePlayerName(d.player1.name || "PLAYER 1"),
            score: d.player1.score || 0
          },
          player2: {
            name: sanitizePlayerName(d.player2.name || "PLAYER 2"),
            score: d.player2.score || 0
          },
        });
      }
    });

    window.api.hotkeys.get().then((h: HKGet) => {
      setHkLabels({ start: h.startLabel || "F1", reset: h.resetLabel || "—", swap: h.swapLabel || "F2" });
    });

    // Charger le mapping manette.
    if (window.api?.gamepad?.get) {
      window.api.gamepad.get().then((m) => {
        setGp(m && typeof m === "object" ? m : { toggle: [], swap: [] });
      });
    }

    const cleanupOverlayReady = window.api.overlay.onReady((v: boolean) => setOverlayOn(v));
    const cleanupOverlaySettings = window.api.overlay.onSettings((s) => {
      if (typeof s.locked === "boolean") setLocked(!!s.locked);
      if (typeof s.scale === "number") setScale(s.scale);
      if (s?.nameTheme) setNameTheme(
        s.nameTheme === 'dark' ? 'dark' : (s.nameTheme === 'white' ? 'white' : 'default')
      );
      if (s?.accentKey && ACCENTS.some((a) => a.key === s.accentKey)) setAccentKey(s.accentKey);
      if (typeof s?.autoScoreEnabled === "boolean") setAutoScore(s.autoScoreEnabled);
    });

    // Sync timer
    const cleanupTimerSync = window.api.timer.onSync((d) => {
      if (d?.player1 && d?.player2) {
        // Sanitize synced names
        setPlayers({
          player1: {
            name: sanitizePlayerName(d.player1.name || "PLAYER 1"),
            score: d.player1.score || 0
          },
          player2: {
            name: sanitizePlayerName(d.player2.name || "PLAYER 2"),
            score: d.player2.score || 0
          },
        });
      }
    });

    // Capture feedback
    const cleanupHotkeysCaptured = window.api.hotkeys.onCaptured(
      (p: { type: "start" | "reset" | "swap"; keycode?: number | null; label?: string; source?: "desktop" | "gamepad" }) => {
        // Desktop only: maj du libellé clavier/souris
        if ((p.source || "desktop") === "desktop" && p.label) {
          setHkLabels((prev) => ({ ...prev, [p.type]: p.label! }));
          setCapturing(null);
          // Re-sync les deux labels depuis le store (safety net contre les race conditions)
          window.api.hotkeys.get().then((h: HKGet) => {
            setHkLabels({ start: h.startLabel || "F1", reset: h.resetLabel || "—", swap: h.swapLabel || "F2" });
          });
        }

        // Gamepad only: ferme l'état de capture et recharge le mapping
        if (p.source === "gamepad") {
          setCapturingGp(null);
          if (window.api?.gamepad?.get) {
            window.api.gamepad.get().then((m) => {
              setGp(m && typeof m === "object" ? m : { toggle: [], swap: [] });
            });
          }
        }
      }
    );

    // Always on top
    window.api.overlay.updateSettings({ alwaysOnTop: true });

    // Cleanup all listeners on unmount
    return () => {
      cleanupMaximize();
      cleanupOverlayReady();
      cleanupOverlaySettings();
      cleanupTimerSync();
      cleanupHotkeysCaptured();
    };
  }, []);

  // Cancel capture overlay (mouse left click)
  const handleCancelCapture = async () => {
    try { await window.api.hotkeys.cancel(); } catch (error) {
      console.error("Failed to cancel hotkey capture", error);
    }
    setCapturing(null);
    setCapturingGp(null);
  };

  // Helpers
  const savePlayers = (next: typeof players) => {
    setPlayers(next);
    window.api.timer.set(next);
  };

  const onOverlayToggle = async (checked: boolean) => {
    setOverlayOn(checked);
    if (checked) await window.api.overlay.show();
    else await window.api.overlay.hide();
  };

  const onScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setScale(v); // UI update immédiat

    // Debounce IPC call pour éviter spam pendant drag
    if (scaleDebounceRef.current) clearTimeout(scaleDebounceRef.current);
    scaleDebounceRef.current = setTimeout(() => {
      window.api.overlay.updateSettings({ scale: v });
    }, 100);
  };

  const handleResetAll = () => {
    const next = {
      ...players,
      player1: { ...players.player1, score: 0 },
      player2: { ...players.player2, score: 0 },
    };
    savePlayers(next);
  };

  return (
    <>
      <UpdateModal />
      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
      {showPreferences && <PreferencesModal appVersion={appVersion} onClose={() => setShowPreferences(false)} />}

      <div className="flex flex-col h-screen text-zinc-100 overflow-hidden">
      <TitleBar
        appVersion={appVersion}
        isMaximized={isMaximized}
        onPreferences={() => setShowPreferences(true)}
      />

      {/* ====== Scrollable Content ====== */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 pb-6 pt-4">

      {/* Header: Overlay toggle */}
      <header className="mb-4 rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,.30)] px-5 py-3 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.15em] font-bold text-[#FF6BCB]/90">1v1 Overlay</div>
          <h1 className="text-lg font-semibold tracking-tight leading-tight">DBD Overlay Tools</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${overlayOn ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,.8)]" : "text-zinc-400"}`}>
            {overlayOn ? "Overlay Active" : "Overlay Hidden"}
          </span>
          <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
            <input type="checkbox" className="peer sr-only" checked={overlayOn} onChange={(e) => onOverlayToggle(e.target.checked)} />
            <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-emerald-500/70" />
            <span className="absolute h-5 w-5 translate-x-1 rounded-full bg-white transition peer-checked:translate-x-6" />
          </label>
        </div>
      </header>

      <div>
        <DesktopHotkeysSection
          open={kbOpen}
          setOpen={setKbOpen}
          labels={hkLabels}
          setLabels={setHkLabels}
          capturing={capturing}
          setCapturing={setCapturing}
        />

        <GamepadHotkeysSection
          open={gpOpen} setOpen={setGpOpen}
          mapping={gp} setMapping={setGp}
          capturing={capturingGp} setCapturing={setCapturingGp}
        />

        <PlayersSection players={players} savePlayers={savePlayers} />

        {/* Global actions */}
        <div className="mb-6 flex justify-center">
          <button
            className="rounded-lg border border-[#FF4141]/30 bg-[#FF4141]/15 text-[#FF4141] font-bold uppercase tracking-wide px-5 py-2"
            onClick={handleResetAll}
          >
            Reset scores
          </button>
        </div>

        <AppearanceSection
          nameTheme={nameTheme}
          setNameTheme={setNameTheme}
          accentKey={accentKey}
          setAccentKey={setAccentKey}
          onPremium={() => setShowPremiumModal(true)}
          accentLabels={ACCENT_LABELS_EN}
        />

        <OverlaySettingsSection
          scale={scale} onScale={onScale}
          autoScore={autoScore} setAutoScore={setAutoScore} autoScoreThresholdSec={autoScoreThresholdSec}
          locked={locked} setLocked={setLocked}
        />

        <PromotionSections />
      </div>
        </div>
      </div>

      {/* Overlay de cancel capture */}
      {(capturing || capturingGp) && (
        <div
          className="fixed inset-0 z-[100] bg-black/20"
          role="button"
          aria-label="Cancel capture"
          onClick={handleCancelCapture}
        >
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="mt-6 rounded-md bg-zinc-900/70 px-2 py-1 text-xs text-zinc-200">
              Click anywhere to cancel
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ControlPanel;
