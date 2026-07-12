# Refonte performances invisible — rapport consolidé

Date de validation locale : 12 juillet 2026. Ce rapport complète la baseline
historique de `phase-0.md`. Les validations DBD, OBS, EAC et matériel externe
restent volontairement séparées des résultats locaux.

## Résultat local

| Domaine | Avant | Après | Décision |
|---|---:|---:|---|
| TypeScript | 5.9.2 résolu, renderers principalement | 7.0.2, renderers et Electron stricts | Gardé |
| Typecheck | ~806 ms, ~183 Mo | ~151 ms, ~87,7 Mo | Gardé |
| XInput sans manette | 3,1247 % d'un cœur en moyenne | 0,125 % sur 5 × 5 s | Gardé, mesure quantifiée par pas Windows |
| CSS chargé par l'overlay | 34,41 kB | 4,21 kB | Gardé, −87,8 % |
| Obfuscation | vendor et code produit obfusqués | aucune obfuscation runtime | Retirée après régression CPU/mémoire |
| uIOhook décompressé | 1 025 277 octets | 175 361 octets | Gardé, −82,9 % |
| uIOhook avec F1/F2 | import natif au démarrage | lazy-load au premier besoin | Gardé, −17,6 ms warm médian |
| electron-updater au démarrage | import/configuration eager | lazy au check à 3 s | Gardé, −32,7 ms et −3,9 Mo privés |
| `electron/main.mjs` | 675 lignes | 437 lignes physiques | Gardé |
| `ControlPanel.tsx` | 844 lignes | 410 lignes physiques | Gardé |
| Vulnérabilités npm complètes | 4 | 0 | Gate passée |
| Vulnérabilités npm production | 0 | 0 | Gate passée |

Le typecheck TS7 utilise le compilateur natif stable. Les configurations
renderer et Electron sont séparées, avec `strict`, `noUncheckedIndexedAccess`
et `exactOptionalPropertyTypes`, sans `skipLibCheck`, `@ts-ignore` ni
`@ts-nocheck`. Les types Node 24.13.3 correspondent au runtime Node 24.15
d'Electron 42 ; `@types/semver` complète le contrat publié par
`electron-updater`. Le lint repose sur Oxlint 1.73.0 : il analyse TypeScript
sans dépendre de l'ancienne Compiler API et passe sans warning.
La règle `no-empty` est bloquante : aucun `catch {}` silencieux ne subsiste
dans le runtime ou les harness maintenus.

## Architecture et chemins chauds

- Le main Electron a été découpé en modules IPC, validation, persistence,
  updates et labels d'entrée, tous sous 450 lignes.
- Le panneau a été découpé par fonctionnalités sans changer l'ordre JSX, les
  classes ou les styles rendus. L'ancienne application jamais montée et le
  composant `DragHandle` jamais importé ont été retirés.
- Tous les appels IPC valident le sender exact, refusent les sous-frames et
  valident les payloads avant mutation.
- La persistence des noms/scores reste immédiatement visible, mais les écritures
  disque sont regroupées et flushées à l'arrêt.
- F1/F2 restent sur `globalShortcut`. uIOhook et le bridge manette ne démarrent
  que lorsqu'une configuration ou une capture les exige.
- Les actions manette rejoignent désormais le dispatch central et ne sont plus
  diffusées à toutes les fenêtres.
- Le dispatch possède un seul limiteur par action fondé sur `performance.now()` ;
  un test déterministe accepte 10 000 événements valides sans perte.
- Le bridge XInput sonde un slot connecté à 8 ms, place un slot absent en
  backoff de 2 s et ignore les paquets inchangés via `dwPacketNumber`.
- Son protocole stdout `DBT1` est versionné, borné et validé par whitelist avant
  qu'un événement puisse atteindre le dispatch Electron.
- L'arrêt envoie `QUIT` sur stdin puis applique un kill de secours à 2,5 s ; le
  test natif sort avec code 0 en 9,4 ms. Les crashes utilisent un backoff borné.
- Dans le package final, un mapping isolé lance bien le bridge ; vider le mapping
  l'arrête coopérativement en 63 ms, laisse l'app active et ne laisse aucun
  processus orphelin.
- Le switch global désactivant le throttling Chromium a été retiré. Seul
  l'overlay visible conserve `backgroundThrottling: false`.
- Le click-through verrouillé ne transmet plus les mouvements sans consommateur.

## Rendu et sécurité

Le golden final versionnable se trouve dans `perf/golden`. Il contient 50 PNG
et 50 snapshots DOM/styles. Par rapport au golden durci précédent, 47/50 JSON
sont byte-identiques. Les trois autres ne diffèrent que par le centième du timer
capturé (`0.09`/`0.10`, `0.13`/`0.12`, `22.33`/`22.29`) ; classes, structure,
géométrie et styles sont identiques. Les PNG animés ne sont pas comparables par
hash sans synchronisation de phase.

Le panneau possède désormais son oracle séparé dans `perf/golden-panel` : cinq
paires PNG/JSON couvrent haut, milieu, bas, Preferences et Premium à 1120 × 820.
Le harness affirme aussi toggle overlay, collapse/reopen hotkeys et ouverture
des deux modals. Deux runs donnent 10/10 fichiers byte-identiques, PNG compris.
Les images ont été inspectées localement. Comme cet oracle a été créé après le
premier découpage du panneau, il protège les travaux futurs mais ne constitue
pas une reconstruction artificielle des pixels pré-refactor indisponibles.

Les deux fenêtres conservent `contextIsolation: true`, `nodeIntegration: false`
et déclarent `sandbox: true`. Permissions et périphériques sont refusés par
défaut. La CSP de production refuse scripts inline, eval, objets et formulaires ;
le WebSocket Vite n'est permis qu'en développement. Le package final reste actif
après un smoke de 8 s sans refus CSP observé.

## Mesures finales locales

Cinq runs finaux appariés sont dans `perf/artifacts/final-run-1` à
`final-run-5` :

| Scénario | Processus | CPU moyen médian |
|---|---|---:|
| Overlay idle, noms courts | renderer | 0,00211 % |
| Overlay idle, noms longs | renderer | 0,00259 % |
| Timer actif | renderer | 0,01407 % |
| Timer actif | GPU | 0,04032 % |

Sur le timer actif, le p99 médian des écritures visibles est 34,0 ms, le pire
p99 des cinq runs 34,1 ms et le pire intervalle 34,9 ms. Aucun trou supérieur à
100 ms n'a été observé. Ces compteurs Electron sur i7-13700K/RTX 4080 ne sont
pas extrapolés à un low-end ni à DBD.

Un A/B packagé apparié mesure le démarrage warm jusqu'à la fenêtre principale :
médiane 326,1 ms avec import uIOhook eager contre 308,6 ms en lazy, soit
−17,6 ms. La mémoire privée du processus parent varie de +1,4 Mo en médiane,
dans le bruit de cinq runs ; aucun gain RAM n'est revendiqué. Il ne s'agit pas
d'un cold start avec cache OS purgé.

Un second A/B apparié isole `electron-updater` : la médiane passe de 322,1 à
289,5 ms et la mémoire privée avant le check différé de 52,8 à 48,9 Mo. Le
module est toujours chargé et configuré au premier check production à 3 s ou à
la première commande updater ; le test garantit un seul import.

Sur cinq lancements du package final, la détection Win32 donne une médiane de
300,7 ms jusqu'au panneau visible et 1 047,8 ms jusqu'aux deux BrowserWindow
visibles, overlay compris. La seconde valeur inclut le délai produit existant
de 800 ms. Ce protocole reste un warm start ; le cache OS n'est pas purgé.

### Coût de composition panneau + overlay

Une mesure OS stable de 15 s montre, avec les deux fenêtres visibles, environ
18,54 % d'un cœur dans le processus GPU et 1,88 % dans le renderer panneau.
Panneau minimisé, le GPU retombe à 1,15 % et le renderer panneau à zéro. Deux
packages expérimentaux ont isolé la cause : retirer les backdrop du panneau ne
gagne rien (GPU 19,69 %), tandis que figer les animations overlay descend à
0,31 %. Le coût provient donc principalement de la présentation continue de
`pulseBar` dans la fenêtre transparente, amplifiée quand le panneau est visible.

Le candidat figé a été rejeté et n'est pas présent dans `dist` : il change
visiblement l'animation contractuelle. La CSS actuelle est déjà une animation
d'opacité compositor-only ; sans modifier sa cadence ou son apparence, aucun
gain équivalent n'a été démontré. Le retrait du switch global de throttling est
conservé afin que le panneau derrière le jeu, occlus ou minimisé ne maintienne
pas ce coût combiné.

Le soak test-only de 8 h a été arrêté à la demande explicite de l'utilisateur
après 29 cycles et deux échantillons. Il est donc classé « annulé », et non
« réussi » : aucune conclusion sur la stabilité pendant huit heures n'en est
tirée. Les sorties volumineuses et reproductibles de `perf/artifacts` ont été
nettoyées avant livraison ; le harness reste disponible pour une future reprise.

## Artefact distribué

- Electron 42.3.3, archive ASAR, build x64 Windows.
- Aucun `.ts`/`.tsx`, dossier `perf` ou `javascript-obfuscator` dans l'ASAR.
- uIOhook packagé uniquement avec son prebuild `win32-x64` ; son cycle
  `start()`/`stop()` réussit depuis l'ASAR final.
- Bridge source et packagé : SHA-256
  `C7075579BBCF01B9F7F9263BFB15467C36C88AAB559303799D3F5F94B93B34EB`.
- Compilation MSVC `/W4 /permissive-` et analyse statique `/analyze` : zéro
  warning ; deux builds `/Brepro` ont le même hash.
- L'application et le bridge sont `NotSigned`. Aucun certificat Authenticode
  n'est disponible localement ; les logs `electron-builder` mentionnant
  signtool ne constituent pas une signature effective.

## Gates exécutées

```text
npm run check:lines        PASS
npm run lint               PASS, zéro warning
npm run typecheck          PASS, TS7 renderer + Electron
npm test                   PASS, 13 tests + timer monotone
npm audit                  PASS, 0 vulnérabilité
npm audit --omit=dev       PASS, 0 vulnérabilité
npm run build:dir          PASS, Electron 42 + uiohook natif
golden final               PASS, aucun écart structure/style
package smoke              PASS, vivant après 8 s
uIOhook ASAR start/stop    PASS
soak 8 h                    ANNULÉ à la demande utilisateur, non validé
```

## Validations externes restantes

Elles ne peuvent pas être déduites de cette machine et bloquent toute promesse
« zéro lag », « aucun impact FPS » ou certification EAC :

1. Manette XInput physique : boutons, axes, quatre slots, latence, déconnexion
   et reconnexion.
2. Windows 10/11 et tiers low/mid/high, dont portable iGPU/dGPU et DPI réels.
3. DBD seul puis DBD + timer, avec partie suffisamment longue et comparaison
   moyenne, 1 % low, 0,1 % low et frametimes.
4. OBS Game Capture + Window Capture Automatic/WGC/BitBlt, statistiques et logs
   sur 30 minutes non saturées.
5. Lancement normal DBD avec EAC, sans injection, contournement ou protection
   désactivée. Une certification commerciale demande une confirmation officielle.
6. Signature Authenticode après fourniture d'un certificat et d'un pipeline
   autorisés.

ETW et PresentMon ne font pas partie de la validation demandée par l'utilisateur.
Les matrices manuelles reproductibles sont documentées dans `TESTING.md`.

## Documentation officielle revalidée

- Electron performance : https://www.electronjs.org/docs/latest/tutorial/performance
- Electron security : https://www.electronjs.org/docs/latest/tutorial/security
- Electron BrowserWindow : https://www.electronjs.org/docs/latest/api/browser-window
- TypeScript 7 : https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
- TypeScript native : https://github.com/microsoft/typescript-go
