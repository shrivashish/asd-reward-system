# Star Board — Design System

A design system for **Star Board**, a reward-system PWA for autistic children. The system captures Star Board's calm, image-first, accessibility-first visual language so you can build new screens, marketing, decks, and prototypes that feel native to the product.

> **Source.** Reconstructed from the product's own React/CSS source:
> **GitHub — [shrivashish/asd-reward-system](https://github.com/shrivashish/asd-reward-system)** (the "Star Board" app).
> Explore that repository to go deeper on real component behavior and data flow. Colors, type, spacing, motion and component shapes here are lifted directly from its `src/styles/tokens.css` and CSS modules — not approximated.

---

## What Star Board is

Star Board is a **fully local, no-account, no-network** progressive web app that helps caregivers run a gentle star-reward system with an autistic child. A child earns stars for tasks, fills a visual board toward a self-chosen reward, and redeems it. The whole product is shaped by a set of explicit ethical principles:

- **P1 — Check capability before rewarding.** A child may not be *able*, not just unwilling; ask first.
- **P2 — Soft exit always.** A child can decline at any point and lose nothing earned.
- **P3 — First-try pays on the attempt**, not on success.
- **P4 — Earned is permanent.** The ledger is append-only; there is no star-removal tool.
- **P5 — Every task has a fade plan** — the scaffolding is meant to come down.
- **P6 — The child has a voice** in choosing goals and rewards.
- **P7 — Default to daily-living / first-try** behaviors.
- **P8 — Calm by default, accessible, image-first.**
- **P9 — Fully local, no network, no accounts.**

These principles are not decoration — they drive the UI. The award sheet leads with a capability check; the star picker has an explicit "0 stars is okay" option; rewards are shown as big images; animation can be switched off entirely.

**Two modes, one app:** a single-purpose **child board** (tasks + goal, nothing else) and a PIN-gated **parent area** (tabbed: Tasks, Rewards, Child, Settings, Guide).

---

## Content fundamentals

How Star Board writes.

- **Voice: warm, plain, reassuring — never clinical, never gamified-hype.** It speaks to a tired, caring adult and, on the board, gently to a child. No exclamation-point marketing energy; the one celebration line ("Great job!") is the loudest it ever gets.
- **Person.** Guidance to the parent uses **"you" / "your child"**. The child is referred to as **"they"** ("How much did they manage?", "They gave it a try — full stars!"). The app never refers to itself in the first person.
- **Casing: sentence case everywhere.** Titles, buttons, labels — "Add task", "Set goal", "Ready to redeem!". The only uppercase is small field labels with letter-spacing ("LABEL", "MAX STARS"), used as a quiet typographic device.
- **Punctuation.** Short labels and buttons carry no terminal period. Guidance paragraphs are full, calm sentences. Em dashes are used for soft asides — "that is okay, try again later".
- **Reassurance is built into the copy.** Empty/zero states never scold: "No stars — that is okay, try again later", "ask a parent to set one!". Destructive-sounding actions are softened ("Archive", not "Delete"; archived tasks can return).
- **Honesty about limits.** The Parent Guide openly says when *not* to use the tool ("including when not to", "the masking risk", "won't vs can't"). The brand is trusted because it is candid.
- **Emoji are content, not garnish** — see Iconography.

Representative strings: *"Is anything making this hard right now?"*, *"They gave it a try — full stars!"*, *"Earned is earned, always."*, *"No goal set yet — ask a parent to set one!"*, *"Great job!"*

---

## Visual foundations

The feeling is **calm, soft, and concrete.** A young child should not be over-aroused; a stressed parent should feel the screen is quiet and kind.

- **Color.** A cool gray-green canvas (`#EDF1F1`) keeps the screen low-arousal. **Teal (`#2F9E92`) is the single action color.** **Gold (`#F2B632`) is reserved for stars and rewards only** — its scarcity is what makes earning feel special. **Coral (`#F47B5A`) is destructive-only**; **plum (`#8C7AB0`) is a quiet informational accent** (the "First try" badge). Ink is a deep teal-gray (`#243334`), never pure black. A full **high-contrast theme** (`[data-contrast="high"]`) flips to black/white with neon teal & gold.
- **Type.** Two families: **Fredoka** (rounded, friendly) for display, titles, labels and star counts; **Nunito** (humanist, very legible) for body and UI. Sizing is **large by default** — body is 16px, screen titles 26px, never tiny. Field labels are the lone uppercase, letter-spaced (0.04em) detail.
- **Shape & corners.** Everything is rounded and soft — **18px** for buttons/fields/rows, **26px** for cards/sheets, pill for toggles and star buttons. Nothing is sharp.
- **Cards.** White surface, 26px radius, **one soft cool-tinted shadow** (`0 6px 20px rgba(31,58,56,.08)`) — no harsh borders. Selection is shown by a **2px colored border** (teal for active task/child, gold for the current goal), not by fills.
- **Elevation.** Minimal — one shadow token does almost all the work. Sheets sit over a calm dark scrim (`rgba(36,51,52,.6)`). No layered/neumorphic stacks.
- **Spacing.** Generous and consistent; 16px is the default padding and gap. Lists stack with 10–12px gaps. Whitespace is part of the calm.
- **Backgrounds.** Flat color only. **No gradients, no photographic hero backdrops, no patterns or textures.** Imagery lives *inside* tiles (emoji or a parent's photo), not behind the UI.
- **Motion.** Short and gentle: ~0.2s ease-out transitions, a small slide-up on sheets, a soft settle on the celebration. **No bounce, no parallax, no looping/idle animation.** Motion is honestly optional — **Calm mode** (`[data-calm="true"]`) and `prefers-reduced-motion` both collapse `--anim-dur` to 0s, and every state reads correctly with zero animation.
- **Hover / press.** This is a touch-first product, so the primary feedback is the **press** state: filled buttons darken to their `-deep` shade; the task card scales to 0.98; header/nav items shift to a slightly darker fill. No elaborate hover choreography.
- **Transparency & blur.** Used sparingly — only the modal scrim. No frosted-glass / backdrop-blur surfaces.
- **Imagery vibe.** Warm and literal: full-color emoji or real, unfiltered family photos shown in rounded tiles/avatars. No duotone, no grain, no moody color grading.
- **Accessibility is a visual rule, not an afterthought.** Minimum **56px** tap targets everywhere (`--tap-min`); large text; high-contrast theme; reduced-motion honored; emoji always paired with a text label.

---

## Iconography

**Emoji are Star Board's entire icon system** — and double as task/reward imagery. This is intentional and on-brand: emoji are instantly recognizable, language-independent, render at any size, and feel warm rather than clinical. (`lucide-react` is a dependency in the source but the shipped UI uses emoji glyphs.)

- **Navigation & actions** use emoji: 📋 Tasks, 🎁 Rewards, 👤 Child, ⚙️ Settings, 📖 Guide, 🔊 read-aloud, ✅ proceed, ← back.
- **Tasks & rewards** use a chosen emoji *or* a parent-supplied photo (image-first: a real toothbrush photo beats any icon). Defaults: 🦷 brush teeth, 👕 get dressed, 🍎 try a food, 🎬 movie.
- **The star** is the one true mark: the ★ glyph in UI, the gold-star SVG as favicon/app icon (`assets/star-mark.svg`).
- **No custom icon font, no monochrome line-icon set, no hand-drawn SVG icon library.** If you genuinely need a vector glyph the brand lacks, prefer a matching emoji; only fall back to a neutral line icon (e.g. Lucide) if emoji truly cannot express it — and keep it rare.

Assets live in `assets/` (`star-mark.svg`, `favicon.svg`).

---

## Visual foundations — at a glance (tokens)

| Concern | Token(s) | Value |
|---|---|---|
| Canvas / surface / inset | `--bg` `--surface` `--surface-2` | `#EDF1F1` `#FFFFFF` `#F6F8F8` |
| Ink / soft / line | `--ink` `--ink-soft` `--line` | `#243334` `#5C6B6C` `#E1E8E8` |
| Action | `--teal` `--teal-deep` | `#2F9E92` `#1F6E66` |
| Reward | `--gold` `--gold-deep` | `#F2B632` `#D99A14` |
| Destructive / info | `--coral` `--plum` | `#F47B5A` `#8C7AB0` |
| Display / body font | `--font-display` `--font-body` | Fredoka / Nunito |
| Radius | `--radius` `--radius-lg` `--radius-pill` | 18 / 26 / 99px |
| Shadow | `--shadow` | `0 6px 20px rgba(31,58,56,.08)` |
| Tap target | `--tap-min` | 56px |
| Motion | `--anim-dur` | 0.2s (→ 0 in calm / reduced-motion) |

---

## Index — what's in this system

**Foundations**
- `styles.css` — global entry point (consumers link only this). `@import`s everything below.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `fonts.css`, `base.css`.
- `guidelines/*.html` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `assets/` — `star-mark.svg`, `favicon.svg`.

**Components** (`window.StarBoardDesignSystem_0e745f.*` once the bundle is loaded)
- `components/core/` — **Button**, **Card**, **Badge**, **Toggle**, **Avatar**.
- `components/stars/` — **StarPips**, **StarRating** (award picker), **FillingBoard**, **GoalBar**.
- `components/layout/` — **AppHeader** / **HeaderAction**, **BottomNav**, **ListRow**, **TaskCard**, **Sheet**.

Each component directory has `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and a `*.card.html` specimen.

**UI kit**
- `ui_kits/star-board/` — interactive recreation of the app (child board, award flow, parent Tasks/Rewards/Settings/Guide). Open `index.html`.

**Skill**
- `SKILL.md` — makes this system usable as a downloadable Agent Skill.

---

## Notes & substitutions

- **Fonts** (Fredoka, Nunito) are the product's real typefaces, loaded via **Google Fonts** in `tokens/fonts.css` rather than bundled binaries. To fully self-host, drop the `.woff2` files in `assets/fonts/` and swap the `@import` for local `@font-face` rules. *(Flagged for the user — see below.)*
