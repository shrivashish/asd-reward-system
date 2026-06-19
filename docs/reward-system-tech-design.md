# Reward System for Autistic Children — Technical Design & Implementation Doc v0.1

**Status:** Draft v0.1 (implementation-ready)
**Author role:** Principal architect
**Date:** 19 June 2026
**Builds on (source of truth, in priority order):**
1. `reward-system-architecture-principles.md` — P1–P9, the two modes, the litmus test. **Principles win on any conflict.**
2. `reward-system-pwa-spec.md` — screens, flows, data model, build order.

This document is the *how*. It exists so an implementer (Claude Code) can build the app end to end. Where this doc and the principles doc disagree, the principles doc is correct and this doc is the bug.

---

## 0. Locked decisions (read first)

Four toolchain choices were open; they are now locked so there is a single build target. Each is a one-line swap if the maintainer overrides it.

| Decision | Locked choice | Swap if you prefer |
|---|---|---|
| Bundler | **webpack 5** (confirmed) | — |
| IndexedDB access | **`idb`** (tiny promise wrapper) | `dexie` for richer querying/migrations |
| Routing | **No router** — single `view` state + parent-gated menu | `react-router-dom` `HashRouter` (works from `file://`) |
| Styling | **Plain CSS Modules + design tokens** | Tailwind |
| Language | **JavaScript + Babel** (per approved stack) | TypeScript (`@babel/preset-typescript`) — recommended if scope grows |

Data shapes below are written in TS notation **for clarity only**; the build is JS unless TypeScript is approved.

---

## 1. Tech stack & dependencies

Versions are indicative (knowledge early 2026); install current stable.

**Runtime (ships in the folder):**
- `react`, `react-dom` (^19)
- `idb` (^8) — IndexedDB wrapper for structured data + image blobs
- `@fontsource/fredoka`, `@fontsource/nunito` — self-hosted fonts, bundled (no runtime CDN, P9)
- `lucide-react` — UI chrome icons only, tree-shaken *(optional; can inline SVGs to drop it)*

**Child-facing pictures:** emoji (zero-dependency default symbol set) **plus** photo capture/upload. No icon library needed for task/reward imagery.

**Browser APIs — no package:** Web Speech (`speechSynthesis`) for TTS; Blob/FileReader/file input for export-import; canvas resize for photo downscaling; `Intl` for dates.

**Build / dev (does NOT ship):**
- `webpack`, `webpack-cli`, `webpack-dev-server`
- `babel-loader`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react` *(swap babel-loader → `esbuild-loader` for faster builds)*
- `html-webpack-plugin`
- `css-loader`, `style-loader` (dev), `mini-css-extract-plugin` (prod) — CSS Modules built into `css-loader`
- `workbox-webpack-plugin` — service worker (offline precache + installability)
- `copy-webpack-plugin` — copies `manifest.json` + icons to output
- webpack 5 **asset modules** (built in) — fonts/images
- Dev hygiene *(optional)*: `eslint`, `prettier`, `vitest`, `@testing-library/react`

---

## 2. Project structure

```
reward-board/
  public/
    manifest.json
    icons/            icon-192.png, icon-512.png, icon-maskable-512.png
    favicon.png
  src/
    index.html        (template for HtmlWebpackPlugin)
    index.jsx         (entry: mount + SW registration)
    app/
      App.jsx
      AppHeader.jsx
      ParentGate.jsx
      ParentMenu.jsx
    screens/
      BoardScreen.jsx
      TasksScreen.jsx
      RewardsGoalScreen.jsx
      ChildScreen.jsx
      SettingsScreen.jsx
      GuideScreen.jsx
    components/
      GoalBar.jsx
      FillingBoard.jsx      (the star slots that fill — signature)
      TaskCard.jsx
      StarPips.jsx
      AwardSheet.jsx        (the award flow, §6)
      CapabilityCheck.jsx   (P1)
      StarPicker.jsx        (0..max, skill mode only)
      ImagePicker.jsx       (emoji set | photo | upload)
      TTSButton.jsx
      ConfirmCorrection.jsx
      CalmCelebration.jsx
    data/
      db.js             (idb open + schema + migrations)
      repo.js           (typed CRUD + ledger API, §4)
      exportImport.js
      seed.js           (first-run example child/tasks/rewards)
    state/
      AppContext.jsx    (current child, current view, settings)
      useBalance.js
    styles/
      tokens.css        (design tokens, §8)
      global.css
    guide/
      guideContent.js   (static parent guidance text)
  webpack.config.js
  babel.config.js
  package.json
  README.md
```

---

## 3. Build, run & the local-folder workflow

**Scripts (`package.json`):**
- `dev` → `webpack serve --mode development` (serves on `http://localhost`, SW registers, installable while developing)
- `build` → `webpack --mode production` → outputs `dist/`

**Critical webpack output setting:** `output.publicPath = './'` (relative), so the copied folder runs from any path, including a double-click. Hash filenames for cache-busting.

**The folder you copy = `dist/`.** It is plain HTML/CSS/JS + `service-worker.js` + `manifest.json` + assets. Copy it to the target device.

**Honest run note (must be in README):**
- Double-clicking `dist/index.html` (`file://`) → app **renders** and **IndexedDB persists**, but Chrome will **not** offer Install and the **service worker will not register** (both need a secure context). Functional, but not the installable offline app.
- To get install + offline: serve the folder over localhost, e.g. `npx serve dist` (no project dependency), open `http://localhost:3000` in Chrome → use the install icon in the address bar → it's now a home-screen app. After first load it runs offline from cache.

**`webpack.config.js` (reference shape):**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';
  return {
    entry: './src/index.jsx',
    output: { publicPath: './', filename: '[name].[contenthash].js', clean: true },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
        { test: /\.module\.css$/, use: [prod ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { modules: true } }] },
        { test: /\.css$/, exclude: /\.module\.css$/,
            use: [prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'] },
        { test: /\.(woff2?|png|jpe?g|svg)$/, type: 'asset' },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new CopyPlugin({ patterns: [{ from: 'public' }] }),
      ...(prod ? [new GenerateSW({ clientsClaim: true, skipWaiting: true })] : []),
    ],
    devServer: { port: 3000, hot: true },
  };
};
```

**`manifest.json` (key fields):**
```json
{
  "name": "Star Board",
  "short_name": "Star Board",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#EDF1F1",
  "theme_color": "#2F9E92",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```
SW registration in `index.jsx` must be guarded (`if ('serviceWorker' in navigator)`) and must fail silently on `file://`.

---

## 4. Data layer (IndexedDB via `idb`)

**Object stores & indexes:**
- `children` (keyPath `id`)
- `tasks` (keyPath `id`; index `by_child` on `childId`)
- `rewards` (keyPath `id`; index `by_child` on `childId`)
- `goals` (keyPath `childId`) — current goal pointer, one per child
- `ledger` (keyPath `id`; indexes `by_child` on `childId`, `by_child_ts` on `[childId, ts]`) — **append-only**
- `images` (keyPath `imageId`) — `{ imageId, blob }`
- `settings` (keyPath `key`) — single-row app settings

**`repo.js` API (the only sanctioned data access):**
```ts
// balance is ALWAYS derived, never stored (enforces P4)
getBalance(childId): Promise<number>           // sum of ledger.amount where childId

addEarn(childId, taskId, amount, note?): void   // amount > 0
addRedeem(childId, rewardId, cost): void        // appends amount = -cost
addCorrection(childId, amount, note): void       // signed; ONLY non-reward downward path (P4)
// NOTE: there is no deleteLedgerEntry, no updateBalance, no removeStar. By design.

listTasks(childId, {activeOnly}): Task[]
upsertTask(task): void
archiveTask(taskId): void                        // sets active=false; never hard-delete (P4)

listRewards(childId): Reward[]
upsertReward(reward): void
getGoal(childId) / setGoal(childId, rewardId)

putImage(blob): Promise<imageId>                 // downscale before store
getImageURL(imageId): Promise<string>            // objectURL; revoke on unmount

getSettings() / setSettings(patch)
```

**Image handling:** before `putImage`, downscale to max ~512px longest edge via canvas, store as JPEG/WebP blob. Always render a fallback glyph if `imageId` missing or load fails.

**Export/import (`exportImport.js`):** export → single JSON `{ version, children, tasks, rewards, goals, ledger, settings, images:[{imageId, dataUrl}] }` (images base64). Import → validate `version`, then bulk-put. User-initiated only (P9).

---

## 5. Domain types (shapes for clarity)

```ts
type Mode = 'skill' | 'firstTry';

interface Child { id; name; avatarImageId?; commProfile?; sensorySettings?; }

interface Task {
  id; childId; label; imageId?;
  maxStars: number;            // ceiling (skill mode); attempt payout (firstTry)
  mode: Mode;
  capabilityNote?: string;     // surfaced in CapabilityCheck (P1)
  active: boolean; order: number;
  fadePlan: { taperEvery?: number; targetStars?: number; note?: string }; // required (P5)
}

interface Reward { id; childId; label; imageId?; cost: number; active: boolean; }

interface Goal { childId; rewardId; }   // one current goal per child

interface LedgerEntry {                  // append-only
  id; childId;
  type: 'earn' | 'redeem' | 'correction';
  taskId?; rewardId?;
  amount: number;                        // signed
  ts: number; note?: string;
}

interface Settings { calmMode; sound; tts; highContrast; parentGate; }
```

---

## 6. The award flow (AwardSheet) — where principles become code

Triggered by tapping a `TaskCard`. Implemented as a bottom sheet / modal, fully cancellable (P2).

```
open AwardSheet(task)
 ├─ if task.mode === 'skill' AND settings show capability check:
 │     render <CapabilityCheck/>  (P1)
 │       options: too loud · hurts · too tired · doesn't want to · "all good →"
 │       (informational; does NOT block; logs nothing punitive)
 ├─ STEP: choose payout
 │     if mode === 'skill':  render <StarPicker min=0 max=task.maxStars/>
 │            label framing: "how much did they manage?" (effort, not grade)
 │     if mode === 'firstTry': NO picker. payout = task.maxStars, fixed.  (P3)
 │            copy: "they gave it a try — full stars"
 ├─ ACTIONS: [Give stars]  [Cancel]   ← Cancel/decline writes NOTHING, loses NOTHING (P2)
 └─ on confirm: repo.addEarn(...) → balance updates → CalmCelebration star-drop (calm-aware)
```

Hard rules the component must satisfy (acceptance criteria):
- `firstTry` mode renders **no** grading UI of any kind. There is no code path to award less than full on attempt.
- No path in this sheet (or anywhere) can produce a negative `earn` or remove past stars.
- Cancelling/declining is always available and is a no-op on the ledger.

---

## 7. Screens (map to spec §3–§9)

**BoardScreen (child-facing default, the 95% screen):**
- `GoalBar`: current balance number + goal as **image-first** (the cake picture, label small beneath) + `FillingBoard` (slots = goal cost, filled = min(balance, cost)). When `balance >= cost` → calm "ready to redeem" state.
- `TaskList` of `TaskCard`s: image-first, label small (TTS on tap), `StarPips` showing max. Tap → AwardSheet.
- Nothing here ever subtracts or shows a penalty (P2, P4).

**Parent area** (behind `ParentGate` — press-and-hold or simple sum; gentle, skippable in settings):
- `TasksScreen`: list + `TaskEditor` (ImagePicker, label, maxStars, **mode**, capabilityNote, active, reorder, archive).
- `RewardsGoalScreen`: reward list + `RewardEditor` (image, label, cost); pick current goal; optional rotation/refresh.
- `ChildScreen`: profile, avatar, sensory/access settings, child switcher/add.
- `SettingsScreen`: calmMode, sound, tts, highContrast, parentGate toggle, capability-check verbosity, export/import.
- `GuideScreen`: static content from `guide/guideContent.js` (won't-vs-can't, reward the attempt, protect intrinsic motivation, plan the fade, the masking caution) — first-class, P-aligned.

`ImagePicker` modes: (1) bundled emoji grid, (2) take photo (`<input type="file" accept="image/*" capture>`), (3) upload. All resolve to `putImage` → `imageId`.

---

## 8. Design tokens & sensory implementation (P8)

`tokens.css` (`:root`):
```
--bg:#EDF1F1; --surface:#FFFFFF; --surface-2:#F6F8F8;
--ink:#243334; --ink-soft:#5C6B6C; --line:#E1E8E8;
--teal:#2F9E92; --teal-deep:#1F6E66;
--gold:#F2B632; --gold-deep:#D99A14;
--coral:#F47B5A; --plum:#8C7AB0;
--radius:18px; --radius-lg:26px; --shadow:0 6px 20px rgba(31,58,56,.08);
--tap-min:56px;            /* child cards larger than the 44px floor */
--font-display:'Fredoka'; --font-body:'Nunito';
```
- **Calm mode:** `data-calm="true"` on `<html>` disables all transitions/animations and mutes sound. Also honor `@media (prefers-reduced-motion: reduce)` unconditionally.
- **No flashing, ever.** Celebrations are gentle scale/settle, never strobe.
- **Sound:** off by default; if on, short/soft (WebAudio or a tiny bundled clip).
- **TTS:** `speechSynthesis.speak(label)` on tap where enabled.
- **Contrast:** `data-contrast="high"` swaps a higher-contrast token set.
- **Targets/layout:** min `--tap-min`; generous spacing; stable layout that doesn't reflow between sessions.

---

## 9. Principle enforcement checklist (acceptance criteria)

A build is correct only if every row holds. These are testable.

| # | Enforced how, in code |
|---|---|
| P1 | `skill` tasks route through `CapabilityCheck` before payout; on by default; tunable in settings; never blocks the parent. |
| P2 | AwardSheet always cancellable; decline = no ledger write; **no "refused"/penalty path exists** anywhere. |
| P3 | `firstTry` renders no grading UI; payout fixed to full on attempt; impossible to gate on success. |
| P4 | `ledger` is append-only — `repo` exposes no update/delete of entries; balance is a derived sum; `correction` is a new entry; UI has no star-removal control; tasks archive, never hard-delete. |
| P5 | `Task.fadePlan` is required (non-empty); "ready to fade" prompt surfaces on a sustained streak; reward removal framed as a celebrated win. |
| P6 | Reward picking is reachable by the child (large image taps); architecture is not hard-wired parent-only. |
| P7 | Task creation defaults to and visually favors `skill`/`firstTry`; **no quick-add templates or suggestions** for stimming/eye-contact/communication; Guide names the masking risk. |
| P8 | Calm defaults; `prefers-reduced-motion` honored; no flashing; TTS + high-contrast present; `--tap-min` enforced. |
| P9 | No network at runtime; no analytics; fonts/icons self-hosted; export is the only data egress and is user-initiated. |

---

## 10. Build milestones (implementable order, mirrors spec §13)

1. **Scaffold + MVP:** webpack/babel build producing `dist/` with `publicPath:'./'`; `idb` schema + `repo`; `AppContext`; BoardScreen (`GoalBar` + `FillingBoard` + `TaskList`); `TaskEditor` with emoji images only; AwardSheet for **skill** mode (0…max) + append-only ledger; calm defaults; `seed.js` example child. One child. **Usable, principle-aligned tool.**
2. **First-try mode** (locked full-on-attempt) + `CapabilityCheck` (P1).
3. **Rewards & goal** management + redeem + child reward-picking (P6).
4. **Photo/upload images** (+ downscale), TTS, high contrast.
5. **Fade plans** + "ready to fade" prompt (P5).
6. **Export/import** + `manifest.json` + Workbox SW + install flow + README run instructions.
7. **Polish:** parent gate, reward rotation, multi-child switcher.

**Definition of done (per milestone):** the relevant P-rows in §9 pass; the app builds to `dist/`, runs from `http://localhost` as an installable offline PWA, and persists across reloads. Suggested first tests: `getBalance` = ledger sum; no API removes earned stars; `firstTry` cannot award < max.

---

## 11. Still open (does not block milestone 1)

Carried from the spec §14 — flag to maintainer, don't guess in code:
- **Who the specific child is** (age, verbal/nonverbal/AAC) → tunes TTS/symbol/contrast depth and confirms aim.
- **Daily-living intent** (new habits vs resisted-but-able) → tunes fade weighting defaults.
- **Reward satiation/rotation** mechanism detail.
- **Multi-device/caregiver** — out of scope; export/import is the interim patch.
- **Board metaphor** — stars vs marbles/coins/picture-completion (FillingBoard is built to allow swapping the slot visual).

---

*Living document. Keep subordinate to the principles doc; when they conflict, the principles win.*
