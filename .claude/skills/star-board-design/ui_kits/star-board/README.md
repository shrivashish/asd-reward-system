# Star Board — UI Kit

An interactive, high-fidelity recreation of the Star Board app, built entirely from the design-system components (`window.StarBoardDesignSystem_0e745f`).

Open **`index.html`** — it renders the app inside a phone frame.

## What you can do
- **Child board** (default): see the goal progress (FillingBoard) and tap a task tile.
- **Award flow**: tapping a *skill* task opens the capability check → star picker → calm "Great job!" celebration; a *first-try* task ("Try a new food") pays full stars on the attempt. Awarding **0 stars** is always allowed (soft exit) and the balance only ever grows.
- **Redeem**: once the balance reaches the goal cost, the goal card turns gold and shows "Ready to redeem!".
- **Parent area**: tap ⚙️, answer the gate (the answer is **12**), then use the bottom nav — Tasks, Rewards & goal, Children, Settings, Guide.
- **Settings** are live: toggling **Calm mode** removes animation; **High contrast** flips the whole frame to the black/white accessibility theme (applied via `data-calm` / `data-contrast` on the app root).

## Files
- `index.html` — phone-frame host; loads React, the DS bundle, and the scripts below.
- `data.js` — seed tasks/rewards, settings, capability options, and parent-guide copy (from the source app).
- `screens-child.jsx` — child board + the award flow (`ChildBoard`, `AwardFlow`).
- `screens-parent.jsx` — parent tabs (`TasksScreen`, `RewardsScreen`, `ChildSettingsScreen`, `SettingsScreen`, `GuideScreen`).
- `app.jsx` — app shell: header, parent gate, mode/nav routing, theme application.

## Notes
This is a cosmetic recreation, not the production app — there's no persistence, IndexedDB, TTS, or service worker. It faithfully reproduces the *look, flow, and tone*; for real behavior see the source repo linked in the root `README.md`.
