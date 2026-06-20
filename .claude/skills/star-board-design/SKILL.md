---
name: star-board-design
description: Use this skill to generate well-branded interfaces and assets for Star Board (a calm, image-first, accessibility-first reward-system app for autistic children), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things live
- `README.md` — the full design guide: product context, content fundamentals, visual foundations, iconography, token table, and an index of everything.
- `styles.css` — the single global stylesheet to link; it `@import`s all tokens & fonts in `tokens/`.
- `tokens/` — color, typography, spacing, motion, font CSS custom properties.
- `components/` — React primitives (`core/`, `stars/`, `layout/`); each has `.jsx`, `.d.ts`, `.prompt.md`, and a `*.card.html` specimen.
- `ui_kits/star-board/` — an interactive recreation of the app; open `index.html`.
- `guidelines/*.html` — foundation specimen cards.
- `assets/` — `star-mark.svg`, `favicon.svg`.

## Non-negotiables when designing for Star Board
- **Calm by default.** Low-arousal cool gray-green canvas; flat color (no gradients/textures); short, optional motion.
- **Teal is the only action color. Gold is for stars & rewards only. Coral is destructive only.**
- **Accessibility is a visual rule:** ≥56px tap targets, large text, honor `prefers-reduced-motion` and the high-contrast / calm theme scopes.
- **Image-first, emoji-as-icons.** No custom icon set; pair every emoji with a text label.
- **Gentle, honest copy** in sentence case; second person to parents ("you/your child"), "they" for the child; never scold empty/zero states.
