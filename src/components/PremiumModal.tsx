import React from 'react';

const PREVIEW_SWATCHES = [
  'linear-gradient(135deg, #ff6b9d 0%, #c44dff 100%)',
  'linear-gradient(135deg, #00d4c8 0%, #0066ff 100%)',
  'linear-gradient(135deg, #ffb347 0%, #ff3b78 100%)',
  'linear-gradient(135deg, #64ffda 0%, #5e5ce6 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
];

const FEATURES = [
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm0 2a7 7 0 110 14A7 7 0 0112 5zm0 2a5 5 0 100 10A5 5 0 0012 7zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
      </svg>
    ),
    title: 'More accent colors',
    desc: 'Neons, pastels, vibrant gradients — a wider palette to match any stream aesthetic.',
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
      </svg>
    ),
    title: 'Complete overlay themes',
    desc: 'Fully redesigned layouts with unique styles — far beyond a color swap.',
  },
];

const EXTRA_TAGS = [
  'Animated overlays',
  'Custom typography',
  'Exclusive designs',
  'Regular updates',
];

export default function PremiumModal({ onClose }: { onClose: () => void }) {
  const handleCta = () => {
    window.api.win.openPremium();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-amber-500/25 bg-zinc-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shrink-0 shadow-lg shadow-amber-500/25">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.5 7.5L5 14h14l2.5-6.5L17 11l-5-7-5 7-4.5-3.5zM5 16h14v2H5v-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Unlock Premium</h2>
            <p className="text-xs text-zinc-400">Elevate your overlay experience</p>
          </div>
        </div>

        {/* Swatch preview strip */}
        <div className="mb-5 flex gap-1.5">
          {PREVIEW_SWATCHES.map((g, i) => (
            <div
              key={i}
              className="h-7 flex-1 rounded-md shadow-sm"
              style={{ background: g }}
            />
          ))}
        </div>

        {/* Features */}
        <div className="mb-4 space-y-3">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
                {icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">{title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "And more" tag cloud */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {EXTRA_TAGS.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400"
            >
              {tag}
            </span>
          ))}
          <span className="px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs text-amber-400 font-medium">
            & more
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleCta}
          className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-bold text-black hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
        >
          Get Premium Access →
        </button>

        <p className="mt-3 text-center text-xs text-zinc-600">
          dbdoverlaytools.com
        </p>
      </div>
    </div>
  );
}
