import type React from "react";
import { ACCENTS, NAME_BG, type AccentKey, type NameTheme } from "@/themes/palette";
import NewBadge, { dismissNewFeature } from "@/components/NewBadge";

type Props = {
  nameTheme: NameTheme;
  setNameTheme: React.Dispatch<React.SetStateAction<NameTheme>>;
  accentKey: AccentKey;
  setAccentKey: React.Dispatch<React.SetStateAction<AccentKey>>;
  onPremium: () => void;
  accentLabels: Record<AccentKey, string>;
};

function Swatch({ title, background, isActive, onClick, newFeatureId }: { title: string; background: string; isActive: boolean; onClick: () => void; newFeatureId?: string | undefined }) {
  return (
    <span className="relative inline-flex">
      <button onClick={onClick} title={title} aria-label={title} aria-pressed={isActive}
        className={["h-7 w-14 sm:w-16 rounded-lg border-2 transition outline-none",
          isActive ? "border-white ring-2 ring-white/50 ring-offset-2 ring-offset-zinc-900" : "border-white/10 hover:border-white/30"].join(" ")}
        style={{ background }} />
      {newFeatureId && (
        <span className="absolute -right-1.5 -top-2 z-10">
          <NewBadge featureId={newFeatureId} compact />
        </span>
      )}
    </span>
  );
}

export default function AppearanceSection({ nameTheme, setNameTheme, accentKey, setAccentKey, onPremium, accentLabels: ACCENT_LABELS_EN }: Props) {
  return (
<>
    {/* ====== Timer Appearance ====== */}
    <section className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Timer Appearance</h2>

      {/* Name background */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Name background</span>
          <span className="text-xs text-zinc-500">Applies to player name boxes</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {(["default", "dark", "white"] as NameTheme[]).map((nt) => (
            <Swatch
              key={nt}
              title={nt === "default" ? "Default" : nt === "dark" ? "Dark" : "White"}
              background={NAME_BG[nt]}
              isActive={nameTheme === nt}
              onClick={() => {
                setNameTheme(nt);
                window.api.overlay.updateSettings({ nameTheme: nt });
              }}
            />
          ))}
        </div>
      </div>

      {/* Accent color */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Accent color</span>
          <span className="text-xs text-zinc-500">Affects score background & swap bar</span>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
          {ACCENTS.map((a) => (
            <Swatch
              key={a.key}
              title={ACCENT_LABELS_EN[a.key as AccentKey]}
              background={a.gradient}
              isActive={accentKey === (a.key as AccentKey)}
              newFeatureId={a.key.startsWith("pastel_") ? `accent-${a.key}-v1` : undefined}
              onClick={() => {
                const k = a.key as AccentKey;
                if (a.key.startsWith("pastel_")) dismissNewFeature(`accent-${a.key}-v1`);
                setAccentKey(k);
                window.api.overlay.updateSettings({ accentKey: k });
              }}
            />
          ))}
        </div>

        {/* Premium upsell */}
        <button
          onClick={onPremium}
          className="mt-2 w-full flex items-center justify-between pl-3.5 pr-3 py-2.5 rounded-lg border border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-transparent hover:from-amber-500/16 hover:border-amber-400/35 transition-all group cursor-pointer"
        >
          <span className="flex items-center gap-2 text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
            <svg className="w-3 h-3 shrink-0 text-amber-400/60 group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1l1.5 9.5L23 12l-9.5 1.5L12 23l-1.5-9.5L1 12l9.5-1.5L12 1z"/>
            </svg>
            <span>
              <span className="text-amber-300/90 font-semibold group-hover:text-amber-300 transition-colors">Premium</span>
              {' '}adds complete themes, more colors, and features like DBDLeague Ladder opponent auto-detection with rank display.
            </span>
          </span>
          <span className="ml-3 shrink-0 text-xs font-semibold text-amber-500/60 group-hover:text-amber-400 transition-colors">
            Unlock →
          </span>
        </button>

        <p className="mt-2 text-xs text-zinc-500">The swap bar automatically follows the score color.</p>
      </div>
    </section>
</>
  );
}
