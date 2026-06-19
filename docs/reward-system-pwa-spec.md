# Reward System for Autistic Children — Product Spec v0.1 (Local PWA)

**Status:** Draft v0.1
**Author role:** Principal architect
**Date:** 19 June 2026
**Builds on:** `reward-system-architecture-principles.md` (P1–P9, the two modes, the litmus test). That document is the spine. This one is the buildable layer and is expected to change; the principles are not.

---

## 1. How to read this

This spec describes the first buildable version of the product: a **local, offline, installable PWA** a parent runs at home, with a heavily visual, child-facing board and a parent-only setup area. Every screen and mechanic below is annotated with the principle it serves. If a future change to this spec would break a principle, the principle wins and the change is wrong.

Scope of v0.1: one device, parent-operated, image-first board, two reinforcement modes, local storage, no network. Multi-device/multi-caregiver sync is explicitly **out of scope** (see §14).

---

## 2. Platform & delivery

**Form:** A Progressive Web App — installable to the home screen, runs full-screen (standalone), works fully offline once loaded. No backend, no accounts, no network calls in normal operation (P9).

**Storage (important technical decision):**
- **IndexedDB**, not `localStorage`. We store image blobs (photos of the actual cake, the actual toothbrush), which `localStorage` cannot hold and which would blow its ~5 MB cap. IndexedDB holds both the structured data and the image blobs.
- Suggested object stores: `children`, `tasks`, `rewards`, `ledger`, `settings`, `images` (blobs keyed by `imageId`).
- All data stays on the device and is owned by the family (P9).

**Offline / service worker:** A service worker caches the app shell and all static assets so the app opens with no network. Note the honest constraint: **service workers require a secure context** (HTTPS or `localhost`). A bare `file://` open will run the page but will not register the service worker or install as a true PWA. Three workable ways to "serve locally from device":
1. Run a tiny static server on the device (e.g., a one-line local HTTP server) and open `http://localhost:PORT`. Full PWA + offline.
2. Host the static files once on any HTTPS static host, open it on the device, "Add to Home Screen." After first load it runs offline from the device cache. No further network needed.
3. Package it (e.g., wrap the PWA) into an installable app later if a store presence is ever wanted. Deferred.

For v0.1, document option 1 or 2 in the README; both keep data and behavior fully local.

**Suggested stack (flexible):** Plain HTML/CSS/JS is sufficient and keeps the app shell tiny and fast to cache. A light framework is fine if preferred. No heavy state libraries needed — the data model is small. Keep the app shell offline-pure: no CDN fonts/icons at runtime; bundle them.

**Backup / portability (P9):** Export produces a single file bundle of all structured data **plus images as base64**, so a family can back up or hand-carry their data to another device. Import restores it. This is the only sanctioned way data leaves the device, and it's user-initiated.

---

## 3. Screen map

**Child-facing (default, the 95% screen)**
- **Board (Home)** — the live screen from your user story. Visual-first. This is where the day happens.

**Parent-facing (behind a light parent gate — see note)**
- **Tasks** — create/edit the things that earn stars, each with an image and a max-star value.
- **Rewards & Goal** — create rewards (each with an image and a star cost) and choose the one the board is currently filling toward.
- **Child** — profile, avatar, sensory/access settings; child switcher if more than one.
- **Settings** — calm mode, sound, text-to-speech, contrast, export/import.
- **Guide** — short parent guidance on using the system well (first-class, per the principles doc).

**Parent gate note:** Setup screens sit behind a low-friction gate (e.g., press-and-hold, or a "what's 7 + 5?" tap) so a child on the board can't wander into editing tasks and rewards. It's a guardrail against accidents, not security. Keep it gentle and skippable in settings.

---

## 4. Board (Home) — the user story, made concrete

Faithful to what you described, top to bottom:

**Top — the goal bar (always visible).**
- Shows the current star total collected.
- Shows the current target as an **image first** — if the goal is cake, a cake picture fills the space, with the small word beneath it, not instead of it.
- Shows progress toward the goal as a filling visual (stars dropping into slots / a picture completing), so "how close am I" is readable at a glance without counting. Slots = the goal's star cost; filled = current balance (capped to the goal for the fill, while the true balance still shows as a number).

**Below — the task list (what needs to be done).**
- A vertical list of large, tappable cards, one per active task.
- Each card is **image-first**: the task's picture is the main element; the label is small supporting text (optionally read aloud on tap, P8).
- Each card shows its **max stars** as small star pips (e.g., ★★★ = up to 3), so it's clear what this task is worth at most.
- Tapping a card opens the **award flow** (§5). Nothing on this screen ever subtracts or punishes (P2, P4).

**Reaching the goal.** When the balance meets the goal's cost, the board surfaces a calm, non-flashy celebration and a clear "ready to redeem" state for the goal reward. Celebration respects calm mode (P8).

---

## 5. Award flow (what happens when a task is tapped)

This is where several principles get enforced structurally.

1. **Capability/sensory check first (P1).** For skill-building / daily-living tasks, a one-tap, dismissible prompt: "Is anything making this hard right now?" with quick options (e.g., too loud, hurts, too tired, doesn't want to — and "all good, give the star"). This is a nudge to *check before paying*, not a gate that blocks the parent. It can be turned down to minimal in settings once a parent internalizes it, but it's on by default. First-try tasks skip the heavy version (the whole point there is lowering the bar to try).

2. **Decide how many stars, up to the max (your mechanic).**
   - **Skill-building mode:** the parent awards **0…maxStars**, framed as *how much of it the child did / how much effort* — this rewards partial progress, which is encouraging. The floor is 0 (you simply don't award); the flow can never go negative (P4). Awarding less than max is "reward what they managed," never "dock them for not finishing."
   - **First-try mode:** the award is **locked to full-on-attempt**. The "how many" selector is hidden. Attempting pays out in full regardless of outcome (P3). This is structural: in first-try mode the UI offers no way to grade the attempt, because grading reintroduces pressure and converts an invitation back into force.

3. **Soft exit (P2).** Every award flow can be cancelled, and the child can decline or stop a task at any point with **no penalty and no loss** of anything already earned. There is no "refused" outcome that removes or withholds past earnings.

4. **Commit.** On award, append an `earn` entry to the ledger (§10), update the visible balance, and play the gentle star-drop into the board (calm-mode aware).

---

## 6. The two modes, concretely

| | **Skill-building (daily living)** | **First-try (new things)** |
|---|---|---|
| Award | 0…maxStars (reward effort/partial) | full-on-attempt, locked |
| Capability check (P1) | on by default, prominent | light |
| Cadence | repeats daily | one-off / short burst |
| Fade (P5) | taper maxStars / frequency as habit forms | remove once the child knows if they like it |
| Structural guard | floor is 0, never negative | no success-grading possible |

Mode is a property of the task, set when it's created (§7), and it drives the award flow and the fade behavior. Collapsing the two modes into one is a principle violation, not a simplification.

---

## 7. Parent: manage tasks

Create / edit a task:
- **Image** (primary) — choose from a bundled, offline icon/symbol set, **or take a photo** (camera input), **or upload** an image. Stored as a blob in `images`, referenced by `imageId`. The image is the identity of the task on the board.
- **Label** (short text, supporting).
- **Max stars** — the ceiling the parent can award for this task.
- **Mode** — skill-building | first-try (drives §5/§6).
- **Capability/sensory note** (optional) — a private parent note surfaced in the P1 check (e.g., "mint toothpaste hurts — using the mild one").
- **Active** toggle and reorder.

Tasks are **archived, never hard-deleted**, so history and the ledger stay intact (P4). Archiving removes a task from the board without erasing what it earned.

---

## 8. Parent: rewards & goal

- **Reward** — image (same sourcing as tasks), label, **star cost**.
- **Current goal** — the single reward the board fills toward. One clear visible target (matches the top bar in §4).
- **Child involvement (P6)** — reward selection is designed so the child can help pick, where their communication allows (e.g., child taps the picture of what they're saving for). The architecture should not assume parent-only forever.
- **Satiation (P5 neighbour)** — support a small rotation/refresh so a stale reward can be swapped without losing earned balance. (Mechanism detail is an open question, §14.)

Redeeming spends stars (a `redeem` ledger entry); it never deletes earn history. Balance is the ledger sum, not a mutable counter.

---

## 9. Visual-first UX spec

This is a core requirement, not polish (P8).

- **Image carries the meaning; text supports it.** Every task, reward, goal, and the child avatar leads with an image. Labels are present but secondary, and can be read aloud (optional text-to-speech) for pre-literate or nonliterate children. This makes the board usable by a child who can't yet read.
- **Image sourcing & storage.** Bundled offline icon/symbol library for instant setup; plus photo-capture and upload for personal, concrete images (the real cake). Blobs live in IndexedDB; entities reference `imageId`. Always provide a sensible fallback glyph if an image is missing.
- **Calm by default (P8).** Animation and sound default to gentle/off. A **calm mode** strips all motion and sound. Honor the OS `prefers-reduced-motion`. No flashing, ever.
- **Sound** is optional and **off by default**; if on, soft and short.
- **Tap targets** are large (child-friendly; comfortably above 44px, bigger where space allows). Generous spacing, low clutter, predictable layout that doesn't move around between sessions.
- **Type & contrast** — large, highly legible type; optional high-contrast theme.
- **Accessibility** is part of the core spec, scaled to the actual child once known (§14).

---

## 10. Data model (concrete enough to build)

Illustrative fields; refine in implementation.

- **Child** — `id`, `name`, `avatarImageId`, `commProfile`, `sensorySettings`.
- **Task** — `id`, `childId`, `label`, `imageId`, `maxStars`, `mode` ("skill" | "firstTry"), `capabilityNote`, `active`, `order`, `fadePlan` (§11).
- **Reward** — `id`, `childId`, `label`, `imageId`, `cost`, `active`.
- **Goal** — current goal is just a pointer: `childId` → `rewardId`. One at a time.
- **Ledger entry (append-only)** — `id`, `childId`, `type` ("earn" | "redeem" | "correction"), `taskId?`, `rewardId?`, `amount` (signed), `ts`, `note?`. **Balance is the running sum of this ledger**, never a stored mutable number. This is how P4 is enforced: you can't quietly edit a balance, only append.
- **Image** — `imageId` → Blob.
- **Settings** — `calmMode`, `sound`, `tts`, `highContrast`, `parentGate`.

---

## 11. Star mechanics, corrections, and fade

- **Earning** appends a positive `earn` entry. **Redeeming** appends a negative `redeem` entry. Neither edits or deletes prior entries.
- **Corrections (P4).** The only sanctioned downward move is a `correction` entry for a genuine input mistake (a mis-tap), explicitly labelled as a correction and logged. There is no "take a star away as punishment" path anywhere in the UI. This is structural.
- **Fade (P5).** Every task carries a `fadePlan` — at minimum, a way to taper `maxStars` or frequency over time, and a surfaced prompt when a habit looks self-sustaining ("Leo's brushed his teeth unprompted for two weeks — ready to start fading this?"). Removing a reward because it's no longer needed is presented as a **win to celebrate**, not a missing feature. A task with no fade path is considered incomplete.

---

## 12. Non-goals (carried from principles doc)

- No punitive removal of earned stars (P4).
- No mechanic that penalizes declining or stopping (P2).
- No success-grading of first-try attempts (P3).
- No frictionless way to set up reinforcement against stimming/eye-contact/communication (P7) — the easy, default path is daily-living skills and brave first-tries.
- No accounts, surveillance, cloud profiles, or third-party data flow (P9).
- No copy that claims the tool fixes behavior or replaces the child's care team.

---

## 13. Suggested build order (MVP first)

1. **MVP slice:** IndexedDB schema + the Board (top goal bar with image + filling progress; task list image-first) + add/edit task with image (bundled icons only) + award flow for skill-building with 0…max + append-only ledger + calm defaults. One child. This alone is a usable, principle-aligned tool.
2. **First-try mode** (locked full-on-attempt award) + the P1 capability check.
3. **Rewards & goal management** + redeem + child reward-picking (P6).
4. **Photo/upload images**, text-to-speech, high contrast.
5. **Fade plans** + the "ready to fade" prompt (P5).
6. **Export/import** bundle, **service worker + manifest** hardening, install flow.
7. Polish: parent gate, reward rotation, multi-child switcher.

---

## 14. Open questions (narrowed)

- **Who the specific child is** — still the highest-leverage unknown (age, verbal/nonverbal/AAC, motivation vs capability). The image-first direction sensibly assumes a pre-literate-inclusive default, but the rest of the access spec (TTS, symbol sets, contrast) should be tuned to the real child.
- **Daily-living intent** — building habits that don't exist yet vs smoothing tasks the child can do but resists (changes fade and weighting).
- **Reward satiation / rotation** — exact refresh mechanism.
- **Multi-device / multi-caregiver** — known weak spot of local-only; export/import is a patch, not a solution. Revisit only if it becomes a real need.
- **Board metaphor** — gold stars vs marbles/coins/completing-a-picture; fit to the child.

---

*Living document. As open questions close, update §14 and the principles doc's decision log. Keep this spec subordinate to the principles: when they conflict, the principles win.*
