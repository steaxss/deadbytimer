import React from "react";
type Props = Readonly<{ locked: boolean; scale: number }>;

export default function OverlayEditor({ locked, scale }: Props) {
  const [dragging, setDragging] = React.useState(false);
  const [snapTarget, setSnapTarget] = React.useState<string | null>(null);
  const pendingPointer = React.useRef<{ x: number; y: number } | null>(null);
  const moveInFlight = React.useRef(false);
  const moveFrame = React.useRef<number | null>(null);
  const dragActive = React.useRef(false);
  const wheelDelta = React.useRef(0);
  const wheelFrame = React.useRef<number | null>(null);

  const sendPendingMove = React.useCallback(async () => {
    if (moveInFlight.current) return;
    const pointer = pendingPointer.current;
    if (!pointer) return;
    pendingPointer.current = null;
    moveInFlight.current = true;
    try {
      const state = await window.api.overlay.moveDrag(pointer);
      if (dragActive.current) setSnapTarget(state?.snapTarget ?? null);
    } finally {
      moveInFlight.current = false;
      if (pendingPointer.current && moveFrame.current === null) {
        moveFrame.current = requestAnimationFrame(() => {
          moveFrame.current = null;
          void sendPendingMove();
        });
      }
    }
  }, []);

  React.useEffect(() => () => {
    if (wheelFrame.current !== null) cancelAnimationFrame(wheelFrame.current);
    if (moveFrame.current !== null) cancelAnimationFrame(moveFrame.current);
  }, []);

  const startDrag = async (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragActive.current = true;
    setDragging(true);
    await window.api.overlay.beginDrag({ x: event.screenX, y: event.screenY });
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    pendingPointer.current = { x: event.screenX, y: event.screenY };
    if (moveFrame.current === null) {
      moveFrame.current = requestAnimationFrame(() => {
        moveFrame.current = null;
        void sendPendingMove();
      });
    }
  };

  const endDrag = async (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pendingPointer.current = null;
    dragActive.current = false;
    setDragging(false);
    setSnapTarget(null);
    await window.api.overlay.endDrag();
  };

  const scaleWithWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    wheelDelta.current += event.deltaY;
    if (wheelFrame.current !== null) return;
    wheelFrame.current = requestAnimationFrame(() => {
      wheelFrame.current = null;
      const delta = wheelDelta.current;
      wheelDelta.current = 0;
      if (delta !== 0) void window.api.overlay.scaleBy(delta < 0 ? 1 : -1);
    });
  };

  if (locked) return null;
  return (
    <div
      className={`overlay-editor${dragging ? " is-dragging" : ""}${snapTarget ? " is-snapping" : ""}`}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={scaleWithWheel}
    >
      <i className="overlay-editor__corner top-left" /><i className="overlay-editor__corner top-right" />
      <i className="overlay-editor__corner bottom-left" /><i className="overlay-editor__corner bottom-right" />
      <div className="overlay-editor__badge">Timer <strong>{scale}%</strong></div>
      <button
        className="overlay-editor__lock"
        type="button"
        aria-label="Lock overlay position"
        title="Lock overlay position"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => { event.stopPropagation(); void window.api.overlay.lock(); }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
      </button>
      {snapTarget && <div className="overlay-editor__snap">Snap · {snapTarget.replaceAll("-", " ")}</div>}
    </div>
  );
}
