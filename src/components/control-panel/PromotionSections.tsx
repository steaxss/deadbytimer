export default function PromotionSections() {
  return (
<>
    {/* CTAs & Footer (inchangés) */}
    <section className="mt-8 relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 via-fuchsia-600/10 to-emerald-500/10 p-5">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-violet-500/30" />
      <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full blur-3xl bg-emerald-400/20" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">👑 PREMIUM OVERLAYS</div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Unlock more overlays & tools</h3>
        <p className="mt-2 text-sm text-zinc-200">
          Join our Discord to get the premium version: <b>killer streaks</b>, <b>survivor streaks</b>, <b>win/loss counter</b>, <b>tournament overlay</b>, and more!
        </p>
        <a href="http://discord.com/invite/aVdT8rRJKc" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition">
          Join the Discord
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>

    <section className="mt-6 relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-tr from-cyan-400/10 via-sky-500/10 to-indigo-500/10 p-5">
      <div className="pointer-events-none absolute -top-16 right-0 h-64 w-64 rounded-full blur-3xl bg-cyan-400/30" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">🎨 ReShade Filters</div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">GET STEAXS RESHADES</h3>
        <p className="mt-2 text-sm text-zinc-200">
          Competitive ReShade presets tailored for Dead by Daylight. One filter per map. Sharper visibility, clean colors, and a consistent look across maps.
        </p>
        <a href="https://discord.com/invite/6RHPNNVtKw" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition">
          Get the Presets
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>

    <section className="mt-6 relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-tr from-amber-400/10 via-orange-500/10 to-rose-500/10 p-5">
      <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl bg-amber-400/30" />
      <div className="pointer-events-none absolute -bottom-16 -left-20 h-64 w-64 rounded-full blur-3xl bg-rose-400/20" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">☕ SUPPORT THE PROJECT</div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">Buy me a coffee</h3>
        <p className="mt-2 text-sm text-zinc-200">
          If these overlays help you, consider buying me a coffee. Your donation keeps the project alive, funds maintenance, and fuels new features.
        </p>
        <a href="https://buymeacoffee.com/steaxss" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-white/15 transition">
          Buy Me a Coffee
          <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>

    {/* Footer */}
    <footer className="mt-6">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,.30)] px-4 py-3 text-center text-zinc-300">
        <div className="uppercase tracking-wider">
          © TIMER BY <b>STEAXS</b> &amp; PREMIUM VERSION BY <b>DOC</b> — 2025
        </div>
      </div>
    </footer>
</>
  );
}
