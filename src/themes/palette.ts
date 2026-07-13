export type NameTheme = 'default' | 'dark' | 'white';

export type AccentKey =
  | 'default'    // bleu d'origine
  | 'rose'
  | 'rouge'
  | 'orange'
  | 'or'
  | 'jaune'
  | 'vert'
  | 'menthe'
  | 'bleu_fonce'
  | 'bleu_clair'
  | 'cyan'
  | 'violet'
  | 'lavande'
  | 'marron'
  | 'anthracite'
  | 'argent'
  | 'corail'
  | 'turquoise'
  | 'indigo'
  | 'fuchsia'
  | 'emeraude'
  | 'peche'
  | 'pastel_rose'
  | 'pastel_peche'
  | 'pastel_sauge'
  | 'pastel_ciel'
  | 'pastel_lilas'
  | 'pride';

export const NAME_BG: Record<NameTheme, string> = {
  default: 'linear-gradient(90deg, #4B4B4B 0%, #3A3A3A 50%, #3A3A3A 100%)',
  dark:    'linear-gradient(0deg, #000000 0%, #000000 50%, #111111 100%)',
  white:   'linear-gradient(0deg, #FFFFFF 0%, #FFFFFF 100%)',
};

export const ACCENTS: { key: AccentKey; label: string; gradient: string }[] = [
  { key: 'default',    label: 'Bleu (par défaut)', gradient: 'linear-gradient(90deg, #274B90 0.06%, #09327E 40.01%, #04296F 79.97%)' },
  { key: 'rose',       label: '🌸 Rose',           gradient: 'linear-gradient(90deg, #ff4da6 0%, #ed62a8 50%, #f881bc 100%)' },
  { key: 'rouge',      label: '❤️ Rouge',          gradient: 'linear-gradient(90deg, #e63946 0%, #f25056 50%, #f77b7b 100%)' },
  { key: 'orange',     label: '🧡 Orange',         gradient: 'linear-gradient(90deg, #ff7a00 0%, #ff9833 50%, #ffbb66 100%)' },
  { key: 'or',         label: '✨ Or',             gradient: 'linear-gradient(90deg, #d4af37 0%, #e1c85c 50%, #f0dd8c 100%)' },
  { key: 'jaune',      label: '💛 Jaune',          gradient: 'linear-gradient(90deg, #ffd60a 0%, #ffe24a 50%, #fff08a 100%)' },
  { key: 'vert',       label: '🌿 Vert',           gradient: 'linear-gradient(90deg, #2ecc71 0%, #42d77d 50%, #78e8a4 100%)' },
  { key: 'menthe',     label: '🍏 Menthe',         gradient: 'linear-gradient(90deg, #4ee44e 0%, #6ff06f 50%, #9cfb9c 100%)' },
  { key: 'bleu_fonce', label: '🔵 Bleu foncé',     gradient: 'linear-gradient(90deg, #0a3d91 0%, #1a4ea8 50%, #3b6fce 100%)' },
  { key: 'bleu_clair', label: '🔷 Bleu clair',     gradient: 'linear-gradient(90deg, #4da6ff 0%, #66b8ff 50%, #99d4ff 100%)' },
  { key: 'cyan',       label: '🔹 Bleu ciel',      gradient: 'linear-gradient(90deg, #5cd6ff 0%, #80e1ff 50%, #b3f0ff 100%)' },
  { key: 'violet',     label: '🟣 Violet',         gradient: 'linear-gradient(90deg, #8e44ad 0%, #a55bc4 50%, #c38edb 100%)' },
  { key: 'lavande',    label: '💜 Lavande',        gradient: 'linear-gradient(90deg, #9b59b6 0%, #b27acc 50%, #d0a6e3 100%)' },
  { key: 'marron',     label: '🟤 Marron',         gradient: 'linear-gradient(90deg, #7b3f00 0%, #9c5c26 50%, #c27d4f 100%)' },
  { key: 'anthracite', label: '⬛ Anthracite',     gradient: 'linear-gradient(90deg, #2c3e50 0%, #3f5367 50%, #5c7087 100%)' },
  { key: 'argent',     label: '⚪ Argent',         gradient: 'linear-gradient(90deg, #bdc3c7 0%, #b1b6b9 50%, #b1b6b9 100%)' },
  { key: 'corail',     label: '🌅 Corail',         gradient: 'linear-gradient(90deg, #ff6f61 0%, #ff8a7f 50%, #ffb2a6 100%)' },
  { key: 'turquoise',  label: '🐚 Turquoise',      gradient: 'linear-gradient(90deg, #14b8a6 0%, #2dd4bf 50%, #5eead4 100%)' },
  { key: 'indigo',     label: '🔮 Indigo',         gradient: 'linear-gradient(90deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%)' },
  { key: 'fuchsia',    label: '🎀 Fuchsia',        gradient: 'linear-gradient(90deg, #d946ef 0%, #e879f9 50%, #f0abfc 100%)' },
  { key: 'emeraude',   label: '💎 Émeraude',       gradient: 'linear-gradient(90deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)' },
  { key: 'peche',      label: '🍑 Pêche',          gradient: 'linear-gradient(90deg, #fb923c 0%, #fdba74 50%, #fed7aa 100%)' },
  { key: 'pride',      label: '🏳️‍🌈 Pride',          gradient: 'linear-gradient(90deg, #ff0080 0%, #ff6b35 25%, #ffd60a 50%, #00d9ff 75%, #a855f7 100%)' },
  { key: 'pastel_rose',  label: 'Pastel rose',  gradient: 'linear-gradient(90deg, #815063 0%, #92586C 50%, #9D5F74 100%)' },
  { key: 'pastel_peche', label: 'Pastel peach', gradient: 'linear-gradient(90deg, #805746 0%, #91604D 50%, #9A6652 100%)' },
  { key: 'pastel_sauge', label: 'Pastel sage',  gradient: 'linear-gradient(90deg, #486B5C 0%, #527665 50%, #587C6B 100%)' },
  { key: 'pastel_ciel',  label: 'Pastel sky',   gradient: 'linear-gradient(90deg, #486783 0%, #52728F 50%, #587795 100%)' },
  { key: 'pastel_lilas', label: 'Pastel lilac', gradient: 'linear-gradient(90deg, #66537F 0%, #715B8C 50%, #7C6499 100%)' },
];

export const ACCENTS_MAP: Record<AccentKey, string> =
  ACCENTS.reduce((m, a) => (m[a.key] = a.gradient, m), {} as Record<AccentKey,string>);
