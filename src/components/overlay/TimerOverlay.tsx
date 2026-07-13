import React from "react";
import { useTimerStore } from "@/store/timerStore";
import { formatMillisDynamic } from "@/utils/timer";
import ScrollingName from "@/components/ScrollingName";
import { NAME_BG, ACCENTS_MAP, NameTheme, AccentKey } from "@/themes/palette";
import { sanitizePlayerName } from "@/utils/sanitize";
import OverlayEditor from "@/components/overlay/OverlayEditor";

type TD = {
  player1: { name: string; score: number };
  player2: { name: string; score: number };
};

const MAX_CHARS = 8; // "MM:SS.CC"
const DIFF20 = 20_000;
const DIFF10 = 10_000;

/** Write formatted timer string directly into pre-allocated span elements */
function writeTimerSpans(spans: HTMLSpanElement[], ms: number) {
  if (spans.length === 0) return;
  const fmt = formatMillisDynamic(ms);
  let i = 0;
  for (; i < fmt.length && i < spans.length; i++) {
    const ch = fmt.charAt(i);
    const span = spans[i];
    if (!span) continue;
    if (span.textContent !== ch) span.textContent = ch;
    const isSep = ch === ':' || ch === '.';
    const want = isSep ? 'timer-char separator' : 'timer-char';
    if (span.className !== want) span.className = want;
    if (span.style.display === 'none') span.style.display = '';
  }
  for (; i < spans.length; i++) {
    const span = spans[i];
    if (span && span.style.display !== 'none') span.style.display = 'none';
  }
}

export default function TimerOverlay() {
  const [players, setPlayers] = React.useState<TD>({
    player1: { name: "Player 1", score: 0 },
    player2: { name: "Player 2", score: 0 },
  });

  // Granular zustand selectors — avoid full-object subscriptions
  const active = useTimerStore((s) => s.active);
  const status1 = useTimerStore((s) => s.status[1]);
  const status2 = useTimerStore((s) => s.status[2]);
  const elapsed = useTimerStore((s) => s.elapsed);

  const [locked, setLocked] = React.useState(false);
  const [scale, setScale] = React.useState(100);
  const [autoScoreEnabled, setAutoScoreEnabled] = React.useState(true);
  const [autoScoreThresholdMs, setAutoScoreThresholdMs] = React.useState(25_000);

  // Refs for direct DOM manipulation (bypass React for timer text updates)
  const t1ContainerRef = React.useRef<HTMLSpanElement>(null);
  const t2ContainerRef = React.useRef<HTMLSpanElement>(null);
  const timer1DivRef = React.useRef<HTMLDivElement>(null);
  const timer2DivRef = React.useRef<HTMLDivElement>(null);
  const t1SpansRef = React.useRef<HTMLSpanElement[]>([]);
  const t2SpansRef = React.useRef<HTMLSpanElement[]>([]);
  const lastCls1 = React.useRef('');
  const lastCls2 = React.useRef('');

  // Pre-allocate span pools on mount (created once, reused forever)
  React.useEffect(() => {
    const init = (container: HTMLSpanElement | null): HTMLSpanElement[] => {
      if (!container) return [];
      const pool: HTMLSpanElement[] = [];
      container.textContent = '';
      for (let i = 0; i < MAX_CHARS; i++) {
        const span = document.createElement('span');
        span.className = 'timer-char';
        span.style.display = 'none';
        container.appendChild(span);
        pool.push(span);
      }
      return pool;
    };
    t1SpansRef.current = init(t1ContainerRef.current);
    t2SpansRef.current = init(t2ContainerRef.current);
    writeTimerSpans(t1SpansRef.current, 0);
    writeTimerSpans(t2SpansRef.current, 0);
  }, []);

  // IPC: names/scores only (with sanitization)
  React.useEffect(() => {
    (async () => {
      const d = await window.api.timer.get();
      setPlayers({
        player1: {
          name: sanitizePlayerName(d?.player1?.name || "Player 1"),
          score: d?.player1?.score || 0
        },
        player2: {
          name: sanitizePlayerName(d?.player2?.name || "Player 2"),
          score: d?.player2?.score || 0
        }
      });
    })();
    const cleanup = window.api.timer.onSync((d) => {
      setPlayers({
        player1: {
          name: sanitizePlayerName(d?.player1?.name || "Player 1"),
          score: d?.player1?.score || 0
        },
        player2: {
          name: sanitizePlayerName(d?.player2?.name || "Player 2"),
          score: d?.player2?.score || 0
        }
      });
    });
    return cleanup;
  }, []);

  // Receive overlay settings (lock + scale + theme + auto-score)
  React.useEffect(() => {
    const cleanup = window.api.overlay.onSettings((s) => {
      setLocked(!!s.locked);
      setScale(s.scale || 100);

      const nt: NameTheme = s?.nameTheme === 'dark'
        ? 'dark' : (s?.nameTheme === 'white' ? 'white' : 'default');
      const candidateAccent = s.accentKey;
      const ak: AccentKey = candidateAccent && candidateAccent in ACCENTS_MAP
        ? candidateAccent : 'default';

      const root = document.documentElement;
      root.style.setProperty('--name-bg', NAME_BG[nt]);
      root.style.setProperty('--name-color', nt === 'white' ? '#000000' : '#FFFFFF');
      root.style.setProperty('--accent-gradient', ACCENTS_MAP[ak]);
      root.style.setProperty('--name-glow', nt === 'white'
        ? '0 0 2px rgba(0,0,0,0.70), 0 0 7px rgba(0,0,0,0.40)'
        : '0 0 6px rgba(255,255,255,0.50)');
      root.style.setProperty('--name-stroke', nt === 'white'
        ? '0.6px rgba(0,0,0,0.65)' : '0px transparent');

      setAutoScoreEnabled(s?.autoScoreEnabled !== false);
      const th = Number(s?.autoScoreThresholdSec);
      setAutoScoreThresholdMs(Number.isFinite(th) ? th * 1000 : 25_000);
    });
    return cleanup;
  }, []);

  // Hotkeys globales (venant du main via uiohook)
  React.useEffect(() => {
    const cleanup = window.api.hotkeys.on((p) => {
      const api = useTimerStore.getState();
      if (p?.type === "toggle") api.toggle();
      else if (p?.type === "reset") api.reset(api.active);
      else if (p?.type === "swap") api.select(api.active === 1 ? 2 : 1);
    });
    return cleanup;
  }, []);

  // Direct DOM updates avoid React re-renders while timers are running.
  React.useEffect(() => {
    const running = status1 === 'running' || status2 === 'running';

    const updateDOM = () => {
      const elapsed1 = elapsed(1);
      const elapsed2 = elapsed(2);

      // Timer text (direct DOM write, bypasses React)
      writeTimerSpans(t1SpansRef.current, elapsed1);
      writeTimerSpans(t2SpansRef.current, elapsed2);

      // Warn class computation + direct DOM class update
      const div1 = timer1DivRef.current;
      const div2 = timer2DivRef.current;
      if (!div1 || !div2) return;

      let warn = '';
      const actStatus = active === 1 ? status1 : status2;
      if (actStatus === 'running') {
        const other: 1 | 2 = active === 1 ? 2 : 1;
        const activeMs = active === 1 ? elapsed1 : elapsed2;
        const otherMs = other === 1 ? elapsed1 : elapsed2;
        if (otherMs > 0) {
          const delta = otherMs - activeMs;
          if (delta <= 0) warn = 'winning'; // Timer actif a dépassé l'autre = en train de gagner
          else if (delta <= DIFF10) warn = 'warn10';
          else if (delta <= DIFF20) warn = 'warn20';
        }
      }

      const cls1 = `timer left${active === 1 ? ' active' : ''}${active === 1 && warn ? ' ' + warn : ''}`;
      const cls2 = `timer right${active === 2 ? ' active' : ''}${active === 2 && warn ? ' ' + warn : ''}`;

      if (lastCls1.current !== cls1) { div1.className = cls1; lastCls1.current = cls1; }
      if (lastCls2.current !== cls2) { div2.className = cls2; lastCls2.current = cls2; }
    };

    if (!running) {
      // One-shot update for idle/paused state
      updateDOM();
      return;
    }

    updateDOM();
    const intervalId = window.setInterval(updateDOM, 33);

    return () => {
      clearInterval(intervalId);
    };
  }, [status1, status2, active, elapsed]);

  // Refresh display on visibility/focus changes
  React.useEffect(() => {
    const update = () => {
      writeTimerSpans(t1SpansRef.current, elapsed(1));
      writeTimerSpans(t2SpansRef.current, elapsed(2));
    };
    window.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);
    return () => {
      window.removeEventListener('visibilitychange', update);
      window.removeEventListener('focus', update);
    };
  }, [elapsed]);

  // Mesure pour le main (taille intrinsèque)
  React.useEffect(() => {
    const measure = () => {
      const el = document.getElementById("timerContainer");
      if (!el) return;
      window.api.overlay.measure(el.offsetWidth, el.offsetHeight);
    };
    if (document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure();
        setTimeout(measure, 50);
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [players.player1.name, players.player2.name]);

  // Auto-score
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
    const status = { 1: status1, 2: status2 };
    // Get elapsed from store directly to avoid closure issues
    const getElapsed = useTimerStore.getState().elapsed;

    ([1, 2] as const).forEach((n) => {
      if (prev[n] === "running" && status[n] === "paused") {
        pairRef.current[n] = getElapsed(n);
      }
      if (status[n] === "stopped") {
        pairRef.current[n] = null;
      }
    });

    const a = pairRef.current[1];
    const b = pairRef.current[2];

    if (a != null && b != null) {
      const minMs = Math.min(a, b);

      if (autoScoreEnabled && minMs >= autoScoreThresholdMs) {
        if (a === b) {
          pairRef.current[1] = null;
          pairRef.current[2] = null;
        } else {
          const winner: 1 | 2 = a > b ? 1 : 2;
          setPlayers((curPlayers) => {
            const next: TD = {
              player1: {
                ...curPlayers.player1,
                score: curPlayers.player1.score + (winner === 1 ? 1 : 0),
              },
              player2: {
                ...curPlayers.player2,
                score: curPlayers.player2.score + (winner === 2 ? 1 : 0),
              },
            };
            window.api.timer.set(next);
            return next;
          });
          pairRef.current[1] = null;
          pairRef.current[2] = null;
        }
      } else {
        if (a < autoScoreThresholdMs) pairRef.current[1] = null;
        if (b < autoScoreThresholdMs) pairRef.current[2] = null;
      }
    }

    prevStatusRef.current = { 1: status1, 2: status2 };
  }, [status1, status2, autoScoreEnabled, autoScoreThresholdMs]);

  // Purge snapshots on auto-score toggle
  const prevAutoRef = React.useRef(autoScoreEnabled);
  React.useEffect(() => {
    if (prevAutoRef.current !== autoScoreEnabled) {
      pairRef.current[1] = null;
      pairRef.current[2] = null;
    }
    prevAutoRef.current = autoScoreEnabled;
  }, [autoScoreEnabled]);

  const s = (scale || 100) / 100;

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        width: Math.round(520 * s),
        height: Math.round(120 * s),
        overflow: "hidden",
        position: "relative",
      }}
    >
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

          {/* Timers — className managed by RAF loop, not React reconciliation */}
          <div ref={timer1DivRef} className="timer left" aria-label={status1}>
            <span ref={t1ContainerRef} className="timer-text dbd-digits" />
          </div>
          <div ref={timer2DivRef} className="timer right" aria-label={status2}>
            <span ref={t2ContainerRef} className="timer-text dbd-digits" />
          </div>
        </div>
      </div>
      <OverlayEditor locked={locked} scale={scale} />
    </div>
  );
}
