# Phase 0 — baseline locale initiale

Date : 11 juillet 2026. Cette baseline ne modifie pas le runtime et ne constitue pas encore une validation DBD, OBS, EAC ou low-end.

## Environnement

- Windows 10.0.26200, Intel Core i7-13700K, 32 Go.
- NVIDIA RTX 4080 et Intel UHD Graphics 770.
- Electron 42.3.3, Chrome 148.0.7778.218, Node 24.15.0.
- Deux écrans 2319 × 1305, facteur DPI Chromium 1,1041666.
- Le harness sert le `dist` non modifié sur une boucle locale stricte, car Electron refusait le chargement `file://` isolé. Cette baseline ne mesure donc pas le cold start de production.

## Résultats

| Hypothèse | Preuve locale | Résultat | Décision Phase 0 |
|---|---:|---|---|
| XInput sonde trop agressivement sans manette | 5 × 5 s : médiane 3,1246 % d'un cœur, moyenne 3,1247 %, max 4,0618 %, WS moyen 9,036 Mo | Très au-dessus de la cible idle de 0,05 % | P0 confirmé; ne pas modifier avant baseline de latence/manette |
| Le timer renderer tient sa cadence sur cette machine | 303 mutations; intervalle moyen 32,999 ms, p99 34,3 ms, max 35,3 ms | Aucun trou > 100 ms dans ce run isolé | Baseline favorable mais insuffisante pour conclure en jeu |
| L'obfuscation gonfle les bundles distribués | panel +59,7 %, vendor +121,2 %, overlay +137,3 % | +29,4 % CPU renderer médian et +10,56 Mo WS sur le timer actif; cadence médiane stable | Confirmer par ETW; ne plus obfusquer le vendor sans justification mesurée |
| Le graphe de dépendances est sain | production : 0; complet : 1 critique, 2 hautes, 1 modérée | Gate complet en échec | Traiter par lot isolé avant toute migration de dépendances |

Les métriques Electron brutes sont dans `perf/artifacts/phase-0/metrics`. Sur le scénario timer actif de 10 s, le renderer rapporte 0,01487 % CPU moyen et 92,0 Mo de working set moyen; le processus GPU 0,04131 % CPU et 107,1 Mo. Ces chiffres sont des compteurs Electron sur une machine high-end et un seul run : ils ne sont pas directement assimilables aux compteurs système ETW et ne prouvent aucun impact DBD/OBS.

### A/B runtime propre contre obfusqué — cinq runs

| Scénario/processus | CPU médian propre | CPU médian obfusqué | WS médian propre | WS médian obfusqué |
|---|---:|---:|---:|---:|
| Overlay idle / renderer | 0,002258 % | 0,002984 % | 79,35 Mo | 89,57 Mo |
| Timer actif / renderer | 0,015227 % | 0,019701 % | 88,38 Mo | 98,94 Mo |
| Noms longs / renderer | 0,002716 % | 0,003603 % | 88,48 Mo | 98,54 Mo |
| Timer actif / GPU | 0,046246 % | 0,056192 % | 97,40 Mo | 97,18 Mo |

Sur le timer actif, l'obfuscation correspond à +29,4 % de CPU renderer médian et +10,56 Mo de working set renderer. Sur les noms longs, le delta CPU médian est +32,7 % et le delta mémoire +10,06 Mo. La cadence ne montre pas de régression médiane : p99 34,1 ms propre contre 34,0 ms obfusqué. Un run obfusqué atteint toutefois un intervalle maximum de 46,8 ms, contre 37,5 ms au maximum des runs propres.

Les valeurs CPU absolues sont minuscules et `app.getAppMetrics()` a même retourné une valeur négative sur un échantillon idle propre. Les deltas CPU sont donc un signal à confirmer par ETW, pas une estimation système fiable. Le delta mémoire renderer est plus stable : 10 à 11 Mo dans les trois scénarios. Les données agrégées et leur écart-type sont dans `ab-runtime-summary.json`.

### Candidat XInput idle

Un candidat natif séparé sonde les contrôleurs connectés toutes les 8 ms, place les slots absents en backoff de 2 s et ignore les paquets XInput inchangés via `dwPacketNumber`. Sur le même protocole sans contrôleur (5 × 5 s), le CPU moyen passe de 3,1247 % à 0,4374 % d'un cœur, soit environ −86 %. La médiane passe de 3,1246 % à 0,6249 %. Le working set reste stable autour de 9,04 Mo.

Cette mesure courte est limitée par la granularité de `TotalProcessorTime` sous Windows : deux runs candidats rapportent zéro et les autres évoluent par pas de 15,625 ms. Elle démontre un gain important, mais pas une valeur CPU précise ni l'atteinte de la cible 0,05 %.

Le bridge a ensuite été promu avec MSVC 14.44 en `/O2 /GL /LTCG /W4 /permissive- /Brepro`, CFG, ASLR haute entropie et NX. Deux builds successifs produisent le même SHA-256 `952DC687AFB4A9C2181CF3DEA8BC408BA8E15096158DC131B3577BDB7A791B7C`. La mesure du binaire promu donne 0,1875 % d'un cœur en moyenne et 0 % en médiane sur 5 × 5 s sans contrôleur, contre 3,1247 % et 3,1246 % initialement, soit environ −94 % sur la moyenne. La granularité rend la valeur absolue imprécise. Le binaire reste non signé Authenticode et les boutons, axes, latence et reconnexion doivent toujours être validés avec une manette physique.

### Phase 3 — CSS overlay isolé

L'overlay ne charge plus la feuille Tailwind du panneau. Le CSS chargé passe de 34,41 kB (30,50 kB partagé + 3,91 kB overlay) à 4,21 kB, soit −87,8 %. Les 50 snapshots DOM/styles calculés restent strictement identiques et 25/50 PNG sont bit-identiques; les différences restantes concernent les captures à phase animée non synchronisée. Sur cinq runs, le working set renderer médian varie entre −0,14 Mo et +0,08 Mo selon le scénario, donc aucun gain mémoire steady-state significatif n'est revendiqué. Le p99 médian du timer reste à 34,1 ms.

Un remplacement des deux RAF de noms par Web Animations a été essayé puis rejeté : une capture animée sur quatre perdait des couches visuelles dans `capturePage`. Même si un artefact Chromium était possible, ce risque concerne directement OBS et ne respecte pas le contrat de capture.

### Phase 3 — throttling ciblé

Le switch global `disable-background-timer-throttling` a été retiré; l'overlay conserve son option ciblée `backgroundThrottling: false`. Sur cinq runs appariés avec le CSS isolé, le p99 médian du timer reste à 34,1 ms et le pire intervalle observé sans switch est 36,6 ms. Le CPU renderer médian est stable ou légèrement inférieur dans les trois scénarios; les variations du processus browser sont faibles en valeur absolue et bruitées. Cette décision rend au panneau le throttling Chromium normal lorsqu'il est caché/minimisé sans dégrader la cadence de l'overlay visible dans le harness.

### Phase 3 — frontières IPC et I/O

Chaque handler IPC vérifie désormais l'identité exacte du `webContents`, refuse les sous-frames et limite les capacités au panneau ou à l'overlay attendu. Les payloads overlay, timer, hotkeys et dimensions sont validés et bornés avant mutation; les propriétés inconnues sont rejetées. Les écritures de noms/scores restent diffusées immédiatement à l'overlay, mais leur persistance disque est regroupée sur 150 ms et flushée à `will-quit`. Le test unitaire prouve que plusieurs mises à jour ne produisent qu'une écriture avec la valeur la plus récente. Le packaging Electron 42 démarre avec ces contrôles sans rejet IPC observé dans le log.

### Phase 7 — obfuscation retirée

L'obfuscation ciblée du panel et de l'overlay a été comparée sur cinq runs à l'artefact Vite minifié propre. Le timer actif montre +102,7 % de CPU renderer médian et +2,27 Mo de working set renderer. Les scénarios exécutés plus tard montrent une croissance de working set supérieure à 150 Mo pour le renderer et le GPU, incompatible avec les budgets même si la cadence timer reste stable à 34,1 ms p99. L'ancienne obfuscation globale était déjà plus lourde encore en taille et mémoire. Toute obfuscation runtime est donc rejetée; `javascript-obfuscator` et ses 62 packages ont été retirés. Vite/Rollup reste responsable de la minification.

### Phase 5 — politiques fenêtre

`Menu.setApplicationMenu(null)` est maintenant exécuté avant `app.whenReady()`. Le click-through verrouillé n'utilise plus `{ forward: true }`, car l'overlay ne possède aucun listener souris/pointeur ni règle `:hover`; transmettre les mouvements à Chromium n'avait donc aucun consommateur visible. Le comportement click-through de `setIgnoreMouseEvents(true)` et le comportement unlocked restent inchangés.

### Phase 8 — durcissement du renderer

Les deux fenêtres déclarent maintenant explicitement `sandbox: true`, en plus de `contextIsolation: true` et `nodeIntegration: false`. Les demandes de permissions Chromium et de périphériques sont refusées par défaut au niveau de la session. La CSP de production interdit les scripts inline, eval/wasm-eval, objets et formulaires; seuls les styles inline nécessaires aux styles React dynamiques restent autorisés. Le WebSocket Vite n'est ajouté à `connect-src` qu'en développement. Le golden complet charge sous cette CSP et le package Electron reste vivant après smoke test sans refus CSP de script/style/font.

Le package durci contient bien le bridge SHA-256 `952DC687AFB4A9C2181CF3DEA8BC408BA8E15096158DC131B3577BDB7A791B7C`. L'exécutable Electron et le bridge restent tous deux `NotSigned`; aucun certificat de signature n'est disponible localement.

## Golden master

- 50 PNG et 50 snapshots DOM JSON.
- Échelles 50/75/100/125/150/200 %, lock/unlock, trois thèmes, 23 accents.
- Noms vides, Unicode, 32 caractères et débordants.
- États stopped/running/paused, côté droit actif, warn20, warn10 et winning.
- Séquences échantillonnées du scrolling et de `pulseBar`.
- Trace Chromium `overlay-running-scrolling.json` de 2 212 086 octets.

Limites : capture locale Windows 11 uniquement; pas encore de Windows 10 réel, matrice DPI matérielle, vidéo frame-by-frame exhaustive, DBD, OBS, EAC, PresentMon, ETW ni soak 8 h. Les images sont une référence initiale, pas encore un oracle multi-machine homologué.

## Gates exécutés

```text
npm exec vite build                         PASS (34 modules)
npm test                                    PASS (6/6)
npm run typecheck                           PASS
npm audit --omit=dev --json                 PASS (0)
npm audit --json                            FAIL (4 vulnérabilités)
powershell -File perf/baseline/probe-xinput.ps1  PASS (mesure produite)
```

Le typecheck passant ne signifie pas que le code privilégié est couvert : la configuration actuelle laisse encore les `.mjs/.cjs` et plusieurs frontières preload hors typage strict effectif.

## Artefacts et reproduction

- `perf/artifacts/phase-0/manifest.json`
- `perf/artifacts/phase-0/golden/`
- `perf/artifacts/phase-0/metrics/`
- `perf/artifacts/phase-0/traces/`
- `perf/artifacts/phase-0/npm-audit-full.json`
- `perf/artifacts/phase-0/npm-audit-production.json`
- `perf/artifacts/phase-0/bundle-clean.json`
- `perf/artifacts/phase-0/bundle-obfuscated.json`
- `perf/artifacts/phase-0/ab-runtime-summary.json`
- `perf/artifacts/phase-0-clean-run-1/` à `phase-0-clean-run-5/`
- `perf/artifacts/phase-0-obfuscated-run-1/` à `phase-0-obfuscated-run-5/`

Lancer le golden/harness avec Electron directement, puis la sonde XInput :

```powershell
npm exec vite build
Start-Process node_modules/electron/dist/electron.exe -ArgumentList 'perf/baseline/run.mjs' -Wait -WindowStyle Hidden
powershell -NoProfile -ExecutionPolicy Bypass -File perf/baseline/probe-xinput.ps1
```

## Prochaines validations les plus rentables

1. Ajouter une mesure cold/warm start fiable sur l'artefact packagé.
2. Capturer ETW/PresentMon pour séparer Chromium, DWM et coût GPU réel.
3. Établir la baseline contrôleur absent/présent/reconnexion et latence avant le moindre changement XInput.
4. Répéter les scénarios sur les tiers low/mid/high et effectuer le soak de 8 h.
5. Exécuter les matrices DBD + OBS sur les machines cibles; aucune affirmation EAC/FPS avant ces résultats.
