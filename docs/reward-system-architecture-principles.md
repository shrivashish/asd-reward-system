# Reward System for Autistic Children — Architecture Principles & Foundation

**Status:** Draft v0.1 (foundation)
**Author role:** Principal architect
**Date:** 19 June 2026
**Purpose:** A base document that future design and implementation work builds on. It defines *why* this product exists, the non-negotiable principles that constrain how it may be built, the core domain model, and a test any future feature must pass. Read this before adding anything.

---

## 1. What we are building, and the honest claim

A local, private tool that helps a parent run a reward (token) system for an autistic child at home. It does three jobs: run a live reward board day-to-day, let the parent design the tasks and rewards, and teach the parent how to use a reward system *well* — including when not to.

We are deliberate about the size of the claim. A reward system helps or harms based mostly on conditions the software cannot control: whether the target is fair, whether the child has a say, whether the behavior was a "won't" or a "can't." So the software's honest value is narrow and real: **privacy, individualization, sensory-aware delivery, and honest guidance.** It is not a behavior-fixing machine, and the design must never present itself as one.

The guidance is not a secondary feature. For most parents, knowing how to aim a reward system is worth more than another star chart. Treat the guide as a first-class part of the product.

---

## 2. Foundational principles

These are constraints, not suggestions. Each states the principle, the reason it exists, and what it forces in the architecture. Where a principle can be enforced *structurally* (the system makes the wrong thing impossible rather than discouraged), prefer that over a warning.

### P1 — Behavior is communication
A child who resists a task may be unable, not unmotivated. Sensory pain, anxiety, and skill gaps look identical to defiance from the outside. Rewarding a "can't" is paying a child for failing to do something they couldn't do, and it escalates distress.
**Implication:** Reinforcement is never the system's first move. Tasks — especially daily-living ones — carry a lightweight "is something making this hard?" capability/sensory check that the parent passes through before a reward is framed as the answer. The default mental model the UI promotes is *check first, reward second*.

### P2 — Consent and a soft exit
The thing that makes an adult's paycheck ethical is that they chose it, set terms, and can quit. A child has none of these by default. The system must rebuild them.
**Implication:** Participation is an invitation, never a demand. The child can decline a task or stop partway through and **lose nothing they have already earned**. "Force" has no representation in the system — there is no mechanic that penalizes refusal. This is structural, not a tooltip.

### P3 — Reward to bridge, not to buy
The overjustification effect is real: rewarding something a child already does for internal reasons can erase that internal reason once the reward stops. Rewards are safe where intrinsic motivation is *absent* and risky where it is *present*.
**Implication:** The tool steers reinforcement toward effortful, new, or not-yet-habitual behavior, and away from things the child already enjoys. For attempts at new things, the system rewards **the trying, not the succeeding** — payout happens on the attempt, regardless of outcome. Tying payout to success quietly converts an invitation back into pressure.

### P4 — Earned is permanent
Removing earned tokens as punishment ("response cost") erodes trust and tends to trigger meltdowns over lost progress, disproportionately so for this population.
**Implication:** There is **no punitive star-removal mechanism.** The only downward adjustment permitted is a neutral correction of a genuine input mistake (e.g., a mis-tap), framed as a correction, not a consequence.

### P5 — Scaffolding is temporary
A token system is meant to be removed. The success state is the behavior becoming self-sustaining and the tool fading out. Systems that never plan the fade produce dependence — a child who only acts when paid.
**Implication:** Every reinforcement plan carries a **fade path** as a first-class concept, not an afterthought. The product should make tapering visible and easy, and should treat "this reward is no longer needed" as a win to celebrate, not a feature that's missing.

### P6 — The child has a voice
Buy-in and the antidote to masking both come from the child having a say in their own goals and rewards.
**Implication:** Goal-setting and reward selection are designed to *include* the child wherever the child's communication allows. The architecture should not assume a parent-only operator forever.

### P7 — Aim is everything
The reward engine is neutral; it will reinforce whatever it is pointed at, effectively. That neutrality is the danger. Pointed at stimming, eye contact, or other regulation/communication behaviors, an effective system trains masking — suppressing a real need and performing comfort the child doesn't feel.
**Implication:** The product actively steers target *selection*. It makes daily-living skills and brave first-tries the easy, default path, and it does not make it frictionless to set up reinforcement against self-regulation or communication behaviors. The autistic-led critique of compliance-based systems is treated as a design input, not a disclaimer.

### P8 — Sensory-first and accessible
For this population, sensory and access needs are central, not edge cases.
**Implication:** Calm by default (animation and sound off or gentle). Accessibility — readable type, optional text-to-speech, symbol/visual support, high contrast — is part of the core spec, scaled to the actual child once that child is known (see open decisions).

### P9 — Privacy is structural
This is a tool about a child's behavior. That data must never become someone else's asset.
**Implication:** Local-first. No accounts, no third-party analytics, no behavioral data leaving the family's control. The family owns and can export their data. This is also the product's clearest honest differentiator from commercial behavior-tracking apps.

---

## 3. Two reinforcement modes

The conversation surfaced two distinct uses that share a board but want different mechanics. Keep them as separate first-class modes; collapsing them loses the ethics.

| | **Skill-building (daily living)** | **First-try (new things)** |
|---|---|---|
| Examples | brushing, bathing, dressing, eating | trying a new food, place, activity |
| Goal | a durable habit the child owns | get the brave first attempt |
| Cadence | repeated, ongoing | one-off or short burst |
| What's reinforced | doing the task | the *attempt*, win or lose |
| Reward weighting | steady, then tapering | generous up front, fades fast |
| Exit | child may decline; keeps earnings | child may stop mid-try; keeps earnings |
| Fade (P5) | taper as the habit forms | remove once the child knows if they like it |
| Special caution | "can't" hides here (sensory/capability) — P1 check matters most | never gate payout on success — that reintroduces force |

---

## 4. Core domain model (implementation-agnostic)

Entities and the principles they carry. Fields are illustrative, not final.

- **Child** — name, avatar, communication profile, sensory/access settings. Anchors P8; future-proofs P6.
- **Task / Behavior** — label, icon, star value, **mode** (skill-building | first-try), and a **capability/sensory note** surfaced before reinforcement (P1). Mode drives reward weighting and fade behavior (Section 3).
- **Reward** — label, icon, star cost. Selectable by the child where possible (P6). Should support rotation to counter satiation.
- **Goal** — the single reward the board currently fills toward. One clear, visible target.
- **Star ledger** — append-only record of stars earned and rewards redeemed. Append-only encodes P4: earnings are permanent; corrections are explicit correcting entries, never deletions.
- **Fade plan** — per task/plan: current weighting and a taper toward removal (P5). A plan that cannot fade is incomplete.
- **Settings** — calm mode, sound, accessibility, data export/import (P8, P9).

---

## 5. What the system deliberately will NOT do (non-goals)

Defining the anti-features is as important as the features.

- No punitive removal of earned stars (P4).
- No mechanic that penalizes a child for declining or stopping (P2).
- No frictionless path to reinforcing stimming, eye contact, or other self-regulation/communication behaviors (P7).
- No payout gated on *succeeding* at a brave first-try (P3).
- No surveillance, accounts, cloud behavioral profiles, or third-party data flow (P9).
- No claim, in copy or framing, that the tool fixes behavior or substitutes for a child's care team.

---

## 6. Decision log (carried from design conversation)

**Decided / agreed in principle**
- Local-first, private, no-account tool. (Delivery format — single webpage vs other — intentionally deferred.)
- Reward systems are not wrong per se; the ethics live in *conditions* (target, consent, intrinsic-motivation protection) — encoded above as P1–P3, P7.
- Daily-living skills and brave first-tries are the two intended, ethically-clean use cases, with distinct mechanics (Section 3).
- Earned-is-permanent, soft-exit, and reward-the-attempt are hard constraints.

**Open — decide before deeper build**
- **Who the specific child is** — rough age, verbal / nonverbal / AAC user, and whether the real issue is motivation or capability. This most determines whether the tool is well-aimed and what the UI must support. *Highest-priority open question.*
- **Daily-living intent** — building habits that don't yet exist vs smoothing tasks the child *can* do but resists. Pulls reward weighting and fade differently.
- **Board metaphor** — gold stars vs marbles / coins / completing-a-picture; fit to the child.
- **Single vs multiple children** (sibling switcher).
- **Multi-device / multi-caregiver consistency** — known weak spot of local-only storage; export/import is a patch, not a solution.
- **Reward satiation** — rotation/refresh mechanism.

---

## 7. Litmus test for any new feature

Before building anything new, it must pass all of these. If it fails one, redesign or drop it.

1. **Won't vs can't** — does it assume capability, or does it leave room for "the child can't comfortably do this"? (P1)
2. **Soft exit** — can the child decline or stop and keep everything earned? (P2, P4)
3. **Intrinsic motivation** — does it reinforce something already loved (risky) or something effortful/new (safe)? Does it reward the attempt, not just the win? (P3)
4. **Fade** — is there a path for this to become unnecessary and be removed? (P5)
5. **Aim** — could this feature make it easy to reinforce masking or suppress communication/regulation? (P7)
6. **Privacy** — does any child data leave the family's control? (P9)

A feature that passes all six is aligned with this product. A feature that's merely useful but fails one is not.

---

*This is a living document. Update the decision log as open questions close, and keep the principles (Section 2) and litmus test (Section 7) stable — they are the spine the rest of the build hangs from.*
