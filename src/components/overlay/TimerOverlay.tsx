import React from "react";
import { useTimerStore } from "@/store/timerStore";
import { formatMillisDynamic } from "@/utils/timer";
import ScrollingName from "@/components/ScrollingName";
import { NAME_BG, ACCENTS_MAP, NameTheme, AccentKey } from "@/themes/palette";

type TD = {
  player1: { name: string; score: number };
  player2: { name: string; score: number };
};

function splitForTheme(fmt: string) {
  // support "SS.CC" ou "M:SS.CC"
  const arr: { ch: string; sep?: boolean }[] = [];
  for (let i = 0; i < fmt.length; i++) {
    const ch = fmt[i];
    if (ch === ":" || ch === ".") arr.push({ ch, sep: true });
    else arr.push({ ch });
  }
  return arr;
}

export default function TimerOverlay() {
  const [players, setPlayers] = React.useState<TD>({
    player1: { name: "Player 1", score: 0 },
    player2: { name: "Player 2", score: 0 },
  });

  const active = useTimerStore((s) => s.active);
  const status = useTimerStore((s) => s.status); // Record<1|2, 'stopped'|'running'|'paused'>
  const elapsed = useTimerStore((s) => s.elapsed);

  const [locked, setLocked] = React.useState(false);
  const [scale, setScale] = React.useState(100);

  // === Auto-score (config reçue via overlay-settings) ===
  const [autoScoreEnabled, setAutoScoreEnabled] = React.useState(true);
  const [autoScoreThresholdMs, setAutoScoreThresholdMs] = React.useState(25000);

  // IPC: names/scores only
  React.useEffect(() => {
    (async () => setPlayers(await window.api.timer.get()))();
    window.api.timer.onSync((d: any) => setPlayers(d));
  }, []);

  // Receive overlay settings (lock + scale + theme + auto-score)
  React.useEffect(() => {
    window.api.overlay.onSettings((s: any) => {
      setLocked(!!s.locked);
      setScale(s.scale || 100);
      
      // === Thèmes ===
      const nt: NameTheme = s?.nameTheme === 'dark' ? 'dark' : 'default';
      const ak: AccentKey = (s?.accentKey in ACCENTS_MAP ? s.accentKey : 'default') as AccentKey;

      // Appliquer les variables CSS au document (overlay window)
      const root = document.documentElement;
      root.style.setProperty('--name-bg', NAME_BG[nt]);
      root.style.setProperty('--accent-gradient', ACCENTS_MAP[ak]);

      // === Auto-score ===
      setAutoScoreEnabled(s?.autoScoreEnabled !== false); // par défaut: true
      const th = Number(s?.autoScoreThresholdSec);
      setAutoScoreThresholdMs(Number.isFinite(th) ? th * 1000 : 25000);
    });
  }, []);

  // Hotkeys globales (venant du main via uiohook)
  React.useEffect(() => {
    const handler = (p: any) => {
      const api = useTimerStore.getState();
      if (p?.type === "toggle") api.toggle();
      else if (p?.type === "swap") api.select(api.active === 1 ? 2 : 1);
    };
    window.api.hotkeys.on(handler);
  }, []);

  // Tick adaptatif : 60 FPS quand ça tourne, 8 FPS à l'arrêt/pausé
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const s1 = status[1];
    const s2 = status[2];
    const running = s1 === "running" || s2 === "running";

    let cancel = false;
    let raf = 0;
    let intervalId: number | undefined;

    const bump = () => setTick((t) => (t + 1) | 0);

    if (running) {
      const loop = () => {
        if (cancel) return;
        bump();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      // ~8 FPS
      intervalId = window.setInterval(bump, 125);
    }

    return () => {
      cancel = true;
      if (raf) cancelAnimationFrame(raf);
      if (intervalId) clearInterval(intervalId);
    };
  }, [status[1], status[2]]);

  // Mesure pour le main (taille intrinsèque)
  React.useEffect(() => {
    const measure = () => {
      const el = document.getElementById("timerContainer");
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      window.api.overlay.measure(w, h);
    };
    // fonts prêtes → mesurer
    // @ts-ignore
    if (document.fonts?.ready) {
      // @ts-ignore
      document.fonts.ready.then(() => {
        measure();
        setTimeout(measure, 50);
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [players.player1.name, players.player2.name]);

  const t1 = splitForTheme(formatMillisDynamic(elapsed(1)));
  const t2 = splitForTheme(formatMillisDynamic(elapsed(2)));

  const p1Scroll = players.player1.name.length > 16;
  const p2Scroll = players.player2.name.length > 16;

  const s = (scale || 100) / 100;

  // ---- état d’alerte sur le timer actif (approche/dépassement) ----
  const DIFF20 = 20000; // 20s -> orange
  const DIFF10 = 10000; // 10s -> rouge clair clignotant

  const warnClass = (() => {
    const isRunning = status[active] === "running";
    if (!isRunning) return "";
    const other = active === 1 ? 2 : 1;
    
    const otherMs = elapsed(other);
    if (otherMs <= 0) return "";

    const deltaToLoose = otherMs - elapsed(active); // temps restant avant de rattraper l'autre
    if (deltaToLoose <= 0) return "loose";
    if (deltaToLoose <= DIFF10) return "warn10";
    if (deltaToLoose <= DIFF20) return "warn20";
    return "";
  })();
  // ----------------------------------------------------------------------

  // ===================== AUTO-SCORE =====================
  // On déclenche à la transition running -> paused pour chaque côté,
  // on mémorise les deux durées, puis on attribue +1 au plus long si
  // (a) les deux côtés sont renseignés et (b) ***min >= seuil***.
  // En cas d'égalité parfaite (a === b ≥ seuil) : **aucun point**, on purge la paire.
  const prevStatusRef = React.useRef<{ 1: string; 2: string }>({
    1: "stopped",
    2: "stopped",
  });
  const pairRef = React.useRef<{ 1: number | null; 2: number | null }>({
    1: null,
    2: null,
  });

  React.useEffect(() => {
    const prev = prevStatusRef.current;

    // 1) détecter fin de run: running -> paused
    ([
      1, 2
    ] as const).forEach((n) => {
      if (prev[n] === "running" && status[n] === "paused") {
        // snapshot au moment de la pause
        pairRef.current[n] = elapsed(n);
      }
      // reset si l'utilisateur stoppe avant d'avoir pairé
      if (status[n] === "stopped") {
        pairRef.current[n] = null;
      }
    });

    // 2) si on a les deux valeurs, décider et (éventuellement) scorer
    const a = pairRef.current[1];
    const b = pairRef.current[2];

    if (a != null && b != null) {
      // Règle: *les deux* doivent atteindre le seuil
      const minMs = Math.min(a, b);

      if (autoScoreEnabled && minMs >= autoScoreThresholdMs) {
        if (a === b) {
          // Égalité parfaite: pas de point, on réinitialise la paire.
          pairRef.current[1] = null;
          pairRef.current[2] = null;
        } else {
          const winner: 1 | 2 = a > b ? 1 : 2; // strict '>' pour éviter de scorer en égalité
          setPlayers((prevPlayers) => {
            const next: TD = {
              player1: {
                ...prevPlayers.player1,
                score: prevPlayers.player1.score + (winner === 1 ? 1 : 0),
              },
              player2: {
                ...prevPlayers.player2,
                score: prevPlayers.player2.score + (winner === 2 ? 1 : 0),
              },
            };
            // persister (et synchroniser le Control Panel)
            window.api.timer.set(next);
            return next;
          });
          // Paire traitée → purge des deux côtés
          pairRef.current[1] = null;
          pairRef.current[2] = null;
        }
      } else {
        // Pas de score (ex: faux départ) → ne purge *que* le(s) côté(s) < seuil
        // pour conserver la valeur valide de l'autre côté (persistance).
        if (a < autoScoreThresholdMs) pairRef.current[1] = null;
        if (b < autoScoreThresholdMs) pairRef.current[2] = null;
        // Si les deux sont >= seuil mais autoScoreEnabled=false, on garde les deux.
      }
    }

    prevStatusRef.current = { ...status };
  }, [status[1], status[2], autoScoreEnabled, autoScoreThresholdMs, elapsed]);
  // ======================================================

  // === Nouveau : purge des snapshots à chaque bascule ON↔OFF de l'auto-score ===
  const prevAutoRef = React.useRef(autoScoreEnabled);
  React.useEffect(() => {
    const was = prevAutoRef.current;
    if (was !== autoScoreEnabled) {
      // ON -> OFF ou OFF -> ON : on vide la paire pour éviter tout scoring "fantôme"
      pairRef.current[1] = null;
      pairRef.current[2] = null;
    }
    prevAutoRef.current = autoScoreEnabled;
  }, [autoScoreEnabled]);
  // ==============================================================================

  return (
    // wrapper extérieur = dimension exacte *après* zoom → pas de scroll
    <div
      className="pointer-events-none select-none"
      style={{
        width: Math.round(520 * s),
        height: Math.round((120 + (locked ? 0 : 30)) * s),
        overflow: "hidden",
      }}
    >
      {/* Drag handle (visible quand unlock) */}
      <div className={`drag-handle ${locked ? "" : "visible"}`}>Drag to move</div>

      {/* Coins carrés: pas de rounded ni border */}
      {/* Zoom par transform sur le contenu interne */}
      <div
        style={{
          transform: `scale(${s})`,
          transformOrigin: "top left",
          width: 520,
          height: 120,
        }}
      >
        <div className="timer-overlay" id="timerContainer">
          {/* Noms + score */}
            <div className="name left">
              <ScrollingName
                text={players.player1.name || "PLAYER 1"}
                className="player-name scrolling-name--hover"
              />
            </div>

            <div className="score-value">
              {players.player1.score} – {players.player2.score}
            </div>

            <div className="name right">
              <ScrollingName
                text={players.player2.name || "PLAYER 2"}
                className="player-name scrolling-name--hover"
              />
            </div>

          {/* Timers */}
          <div
            className={`timer left ${active === 1 ? "active" : ""} ${active === 1 ? warnClass : ""}`}
            aria-label={status[1]}
          >
            <span className="timer-text dbd-digits">
              {t1.map((c, i) => (
                <span key={i} className={`timer-char ${c.sep ? "separator" : ""}`}>
                  {c.ch}
                </span>
              ))}
            </span>
          </div>
          <div
            className={`timer right ${active === 2 ? "active" : ""} ${active === 2 ? warnClass : ""}`}
            aria-label={status[2]}
          >
            <span className="timer-text dbd-digits">
              {t2.map((c, i) => (
                <span key={i} className={`timer-char ${c.sep ? "separator" : ""}`}>
                  {c.ch}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}