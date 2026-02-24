# 💡 Suggestions d'amélioration - DBD Timer v3.0

## 🎨 **Design & UX**

### 1. **Themes presets** (Haute priorité)
Au lieu de choisir accent + name background séparément, proposer des **presets complets** :
- 🌙 **Dark Mode** : Accent bleu + Name dark
- ☀️ **Light Mode** : Accent or + Name white
- 🎮 **Streamer Mode** : Accent rose + Name default
- 🔥 **Competitive** : Accent rouge + Name dark

**Avantage** : Configuration rapide, meilleur onboarding.

---

### 2. **Preview de l'overlay dans le Control Panel**
Afficher une **mini-preview** de l'overlay dans le Control Panel (en temps réel) :
- Voir les changements de thème instantanément
- Pas besoin de basculer entre les fenêtres
- Peut être une image PNG mise à jour via canvas

**Fichier** : Nouveau composant `OverlayPreview.tsx` dans ControlPanel

---

### 3. **Raccourcis clavier dans le Control Panel**
Ajouter des raccourcis globaux :
- `Ctrl+O` : Toggle overlay ON/OFF
- `Ctrl+L` : Lock/Unlock overlay
- `Ctrl+R` : Reset scores

**Implémentation** : Via `globalShortcut` dans main.mjs (avec désactivation quand fenêtre n'a pas le focus)

---

### 4. **Timer sounds/notifications** (Feature demandée par users)
Sons optionnels :
- 🔔 Son quand timer atteint warn20 (10s avant loose)
- 🔔 Son quand timer atteint warn10 (derniers 5s)
- 🎉 Son quand gagnant (auto-score)

**Config** : Toggle "Enable sounds" + volume slider
**Fichiers audio** : Mettre des `.mp3` courts dans `public/sounds/`

---

### 5. **Drag & Drop pour repositionner l'overlay** (Amélioration)
Actuellement : Unlock → Drag bar appears → Drag
Mieux : Unlock → **Drag anywhere sur l'overlay** (pas que la barre)

**Implémentation** : CSS `-webkit-app-region: drag` sur tout `.timer-overlay` quand unlocked

---

## ⚙️ **Fonctionnalités**

### 6. **Historique des runs** (Moyenne priorité)
Sauvegarder les derniers runs (temps + gagnant) :
- Afficher dans un onglet "History" du Control Panel
- Export CSV pour analyse
- Stats : Temps moyen, win rate, etc.

**Storage** : `electron-store` avec array de runs (limiter à 100 derniers)

---

### 7. **Profiles / Presets de joueurs**
Sauvegarder des **profils** de joueurs :
- "Steaxs vs Doc"
- "Tournament Match 1"
- Quick load de noms + scores

**UI** : Dropdown "Load profile" en haut du Control Panel

---

### 8. **Custom win condition threshold**
Actuellement : Auto-score threshold fixe (25s)
Amélioration : **Slider ajustable** dans les settings (5s - 60s)

**UI** : Slider sous "Auto-score winner" avec label "Minimum time: {value}s"

---

### 9. **Chrono mode** (Feature alternative)
Mode alternatif où le **temps le plus COURT gagne** (speedrun DBD)
- Toggle "Shortest time wins" dans settings
- Inverse la logique de warn (vert = rapide, rouge = lent)

---

### 10. **Overlay opacity control**
Slider pour régler l'**opacité de l'overlay** (50% - 100%)
- Utile pour voir le jeu derrière sans cacher complètement
- CSS `opacity` sur `.timer-overlay`

---

## 🔒 **Sécurité & Robustesse**

### 11. **Auto-update system** (Haute priorité prod)
Intégrer `electron-updater` :
- Check for updates au lancement
- Notification + download en arrière-plan
- Installer au prochain démarrage

**Config** : `electron-builder.yml` avec `publish` config (GitHub releases)

---

### 12. **Crash reporting** (Production)
Intégrer Sentry ou custom crash reporter :
- Capture des erreurs non-catchées
- Logs anonymes envoyés à un endpoint
- Aide au debug post-release

---

### 13. **Validation des inputs** (Sécurité)
Actuellement : Noms de joueurs sans validation
Risque : XSS si on affiche du HTML (actuellement pas le cas, mais bon à avoir)

**Ajout** : Sanitize inputs (max length, regex alphanumeric + espaces)

---

### 14. **Backup/Restore settings**
Bouton "Export settings" → JSON file
Bouton "Import settings" → Load from JSON

**Use case** : Réinstallation, partage de config entre machines

---

## 🚀 **Performance**

### 15. **Lazy load du Control Panel**
Actuellement : Tout le Control Panel charge d'un coup
Mieux : **Code splitting** par sections (Hotkeys, Players, Themes)

**Vite** : Utiliser `React.lazy()` + `Suspense`

---

### 16. **Virtualisation de la liste d'accents** (Micro-optim)
Si on ajoute 50+ accents dans le futur, virtualiser avec `react-window`
Actuellement : 22 accents = OK, mais anticiper scaling

---

### 17. **Debounce sur les inputs de noms**
Actuellement : Chaque keystroke déclenche IPC + store update
Mieux : Debounce 300ms sur les inputs de noms de joueurs

**Impact** : Réduit IPC overhead de 80% pendant typing

---

## 🎯 **Ergonomie**

### 18. **Tooltips sur les boutons**
Ajouter des **tooltips** explicatifs :
- Hover sur "Lock Overlay" → "Clicks pass through when locked"
- Hover sur "Auto-score" → "Automatically awards +1 to longest time"

**Lib** : `react-tooltip` ou custom CSS

---

### 19. **Keyboard navigation** (Accessibilité)
Supporter `Tab` pour naviguer entre les inputs/boutons
Supporter `Enter` pour valider hotkey capture (au lieu de cliquer)

**Implémentation** : `tabIndex` + `onKeyDown` handlers

---

### 20. **Confirmation sur "Reset scores"**
Actuellement : Clic direct reset les scores
Mieux : Popup de confirmation "Are you sure? This cannot be undone"

**UI** : Custom modal ou `window.confirm()` simple

---

## 🎨 **Design avancé**

### 21. **Glassmorphism sur l'overlay** (Style)
Ajouter un effet **backdrop-blur** subtil sur les boxes des noms :
```css
.name {
  backdrop-filter: blur(10px);
  background: rgba(75, 75, 75, 0.3);
}
```

**Impact** : Look moderne, distinction avec le jeu derrière

---

### 22. **Animations sur score change** (Polish)
Quand le score change :
- Pulse animation sur le chiffre
- Confetti effect si gagnant atteint 5 points (best of 9)

**Lib** : `canvas-confetti` ou custom CSS animation

---

### 23. **Dark/Light mode du Control Panel**
Toggle pour passer le Control Panel en light mode (actuellement dark only)
- Utile pour streamers en journée
- `bg-zinc-950` → `bg-white` + inverse les couleurs

---

## 🛠️ **Code Quality**

### 24. **Tests unitaires** (Long terme)
Ajouter Vitest + React Testing Library :
- Tests sur `timerStore.ts` (toggle, reset, elapsed)
- Tests sur `ScrollingName` (overflow detection)
- Tests sur auto-score logic

**Config** : `vitest.config.ts` + dossier `__tests__/`

---

### 25. **Error boundaries React**
Wrapper l'app avec `ErrorBoundary` :
- Catch les erreurs de render
- Afficher fallback UI au lieu de crash complet

**Component** : `ErrorBoundary.tsx` wrapping `<App />`

---

### 26. **TypeScript strict mode**
Actuellement : Probablement pas en strict
Activer dans `tsconfig.json` :
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Impact** : Catch bugs at compile time

---

### 27. **ESLint + Prettier setup**
Config unified pour code style :
- ESLint pour linting (no-unused-vars, etc.)
- Prettier pour formatting
- Pre-commit hook avec Husky

**Files** : `.eslintrc.json`, `.prettierrc`, `package.json` scripts

---

## 📊 **Analytics (Optionnel)**

### 28. **Anonymous usage stats**
Track (anonyme) :
- Combien de runs par session
- Accents les plus utilisés
- Temps moyen des runs

**Privacy** : Opt-in, pas de PII, local-only ou endpoint GDPR-compliant

---

## 🌐 **Multi-langue (Future)**

### 29. **i18n support**
Supporter FR + EN :
- `react-i18n` ou `i18next`
- Fichiers `locales/en.json`, `locales/fr.json`
- Toggle langue dans settings

**Effort** : Moyen, mais augmente reach international

---

## 🎁 **Easter eggs / Fun**

### 30. **Konami code easter egg**
Si user tape Konami code (↑↑↓↓←→←→BA) :
- Affiche un message fun
- Ou unlock un accent secret "RGB Rainbow"

**Implémentation** : Event listener sur keydown sequence

---

### 31. **Random motivational quotes**
Afficher une quote random au lancement :
- "May the longest time win 🏆"
- "Good luck, have fun! 🎮"

**UI** : Petit toast en bas du Control Panel pendant 3s

---

## 🚨 **Priorités recommandées**

### Immédiat (Quick Wins) :
1. ✅ **Tooltips** (#18) - 30 min
2. ✅ **Confirmation sur Reset** (#20) - 15 min
3. ✅ **Custom threshold slider** (#8) - 30 min

### Court terme (1 semaine) :
4. 🔔 **Timer sounds** (#4) - 2h
5. 🎨 **Themes presets** (#1) - 3h
6. 📦 **Backup/Restore** (#14) - 2h

### Moyen terme (1 mois) :
7. 🔄 **Auto-update** (#11) - 4h
8. 📊 **Historique runs** (#6) - 6h
9. 🧪 **Tests unitaires** (#24) - 8h

### Long terme (Backlog) :
10. 🌐 **Multi-langue** (#29)
11. 🎮 **Chrono mode** (#9)
12. 🎨 **Overlay preview** (#2)

---

## 📝 **Notes**

- **Code signing** reste la priorité #1 pour distribution (déjà mentionné dans OPTIMIZATIONS.md)
- **uIOhook** : Envisager migration vers solution moins invasive si les AV problems persistent
- **Electron updates** : Passer à Electron 31+ quand stable (actuellement sur v30)

---

**Créé le** : 2026-02-24
**Version** : 3.0.0
**Auteur** : Claude Opus 4.6 (code analysis & suggestions)
