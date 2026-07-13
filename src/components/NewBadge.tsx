import { useEffect, useState, type MouseEvent } from "react";

const STORAGE_PREFIX = "dbd-timer:dismissed-new:";
const DISMISS_EVENT = "dbd-timer:dismiss-new-feature";

type Props = Readonly<{
  featureId: string;
  compact?: boolean;
}>;

function wasDismissed(featureId: string): boolean {
  try {
    return window.localStorage.getItem(`${STORAGE_PREFIX}${featureId}`) === "1";
  } catch {
    return false;
  }
}

export function dismissNewFeature(featureId: string) {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${featureId}`, "1");
  } catch {
    // The event below still dismisses the badge for the current session.
  }
  window.dispatchEvent(new CustomEvent<string>(DISMISS_EVENT, { detail: featureId }));
}

export default function NewBadge({ featureId, compact = false }: Props) {
  const [visible, setVisible] = useState(() => !wasDismissed(featureId));

  useEffect(() => {
    const onDismiss = (event: Event) => {
      if ((event as CustomEvent<string>).detail === featureId) setVisible(false);
    };
    window.addEventListener(DISMISS_EVENT, onDismiss);
    return () => window.removeEventListener(DISMISS_EVENT, onDismiss);
  }, [featureId]);

  if (!visible) return null;

  const dismiss = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dismissNewFeature(featureId);
  };

  return (
    <button
      type="button"
      onClick={dismiss}
      title="Click to dismiss"
      aria-label="New feature. Click to dismiss this badge permanently."
      className={`new-badge rounded-full border border-[#FF6BCB]/45 bg-zinc-950/90 font-bold tracking-[0.12em] text-[#FF8ED7] shadow-[0_0_10px_rgba(255,107,203,.22)] transition-colors hover:border-[#FF6BCB]/75 hover:bg-[#FF6BCB]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6BCB]/70 ${compact ? "px-1.5 py-px text-[7px]" : "px-2 py-0.5 text-[9px]"}`}
    >
      NEW
    </button>
  );
}
