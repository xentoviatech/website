# PGA Copilot Solutions Page — Design Spec

**Date:** 2026-05-07
**Status:** Approved (brainstorming sign-off across positioning, prominence, disclosure, audience, CTA, scope, video handling, and visuals/animations)
**Author:** Santosh Ray
**Topic:** New `/solutions/pga-copilot/` page on xentovia.ai, plus home-page changes that lead with PGA Copilot

---

## 1. Goal

Ship a dedicated solutions page on xentovia.ai for **PGA Copilot** — the AI copilot for US customs brokers that pre-fills FDA Prior Notice, EPA TSCA §13, and Lacey PPQ-505 forms. Reposition the home page so PGA Copilot leads (hero + #1 in the solutions grid), without removing the broader Xentovia surface.

The page must:

- Tell brokers, in their language, what the product does and why now.
- Reinforce the "below the H350722 line" positioning that the sales deck/video have already established with prospects, so the website, deck, and YouTube briefing all say the same thing.
- Convert qualified inbound to **Book a 30-minute deep demo**.
- Reveal **zero internal architecture** (no agent design, model names, or pipeline tech).

## 2. Decisions

| Question | Decision |
|---|---|
| Where does the page live? | Sibling top-level solution at `/solutions/pga-copilot/index.html` |
| How prominent on the home page? | Lead the home page — new hero copy + #1 card in the solutions grid; customs-trade slides to #2 |
| Disclosure scope | Outcomes + regulatory wedge only. No architecture, no models, no agent names. |
| Audience | US licensed customs brokers (NCBFAA-style mid-tier firms). Not forwarders / importers / 3PLs on this page — they have customs-trade. |
| Public PGA scope | Same as v1 in the existing deck and YouTube briefing: FDA Prior Notice, EPA TSCA §13, Lacey PPQ-505. "Beyond v1" is internal maturity; the public surface stays the v1 three-PGA wedge so the page, deck, and video remain consistent. |
| Primary CTA | **Book a demo** — `mailto:sales@xentovia.ai` (matches the deck's slide-7 ask) |
| YouTube briefing video | **Not embedded or linked** on the page. The video remains an unlisted sales asset (cold emails, post-demo follow-ups) so the multi-agent architecture revealed in chapter 1:43 stays out of the public site. |

## 3. Disclosure rules (load-bearing)

These rules apply to the new page **and** the home-page changes. Treat as mandatory.

**Public on the page** (these are public regulatory or product-outcome facts, not architecture):

- The three v1 PGAs by name — FDA Prior Notice, EPA TSCA §13, Lacey PPQ-505. The product is *defined* by what it covers; not naming them is unworkable.
- Public regulatory citations — CBP HQ H350722 (Jan 2026), end of §321 de minimis (May 2025 / Aug 2025), Lacey Act Phase VII / PPQ-505 paper cutoff (Jan 1, 2026), 21 CFR 1.281, 15 USC §2612, 16 USC §3372.
- Outcomes & UX — pre-pilot ROI estimates (with the *pre-pilot estimate* caveat preserved verbatim), citation chips, confidence chips, audit-trail-replayable, the **"Review & approve for export"** button label.
- ICP signals — NCBFAA-member broker firms, mid-tier, senior filers, trade-compliance leads.
- The **broker-zone / agent-zone** framing (this is positioning copy, not architecture).

**NOT on the page** (these stay internal):

- Multi-agent design — no agent count, no named agents (Doc Reader, Triage, FDA / EPA / Lacey specialists, Validator, Orchestrator). No "five agents, one orchestrator" phrasing.
- Model names or model tiers (Sonnet, Opus, version numbers).
- Pipeline tech (FastAPI, Postgres, Alembic, ABI export shape internals, vision pipeline).
- The slide-3 architecture diagram from the deck (visual or verbal references).
- Concrete pricing or named-competitor comparisons — those live in the demo, per the deck's compliance rules.

**UI mockups on the page** are illustrative renderings (HTML / SVG), **not screenshots of the live product UI**. Field labels, citation references (e.g., *21 CFR 1.281*), and confidence values shown are representative examples. The page never shows the real product's app chrome, navigation, agent traces, or data layouts.

**Words to avoid anywhere on the page** (deck compliance rules):

- "Submit", "file", "customs business" — never describing what the system does. The broker submits; the broker files; the system suggests with citations.
- "Replaces your filer" or any phrasing that implies the system files autonomously.
- ROI claims without the *"pre-pilot estimate"* caveat.

## 4. Page structure

The new page is a single HTML file at `/solutions/pga-copilot/index.html`. Eight sections:

### 4.1 Hero

- **Eyebrow:** *For NCBFAA-member broker firms.*
- **H1:** *PGA Copilot pre-fills your forms. You decide.*
- **Sub:** *AI copilot for FDA Prior Notice, EPA TSCA §13, and Lacey PPQ-505 — built for licensed customs brokers, below the CBP HQ H350722 line.*
- **Primary CTA:** *Book a 30-minute deep demo* → `mailto:sales@xentovia.ai`
- **Secondary CTA:** *See how it stays below the H350722 line* — anchor link to the broker-zone / agent-zone section
- **Visual:** centered glass card with a static mockup of a PGA form field (confidence chip 97%, citation tooltip *21 CFR 1.281*, "Review & approve for export" button mockup) sitting alongside the headline column on desktop, stacked below on mobile. A small approval-stamp SVG (red/maroon) animates in slightly off-axis after the H1 lands.

### 4.2 "Why now" — three regulatory triggers

Three glass cards, one per rule. Same handles as the deck:

| Card | Headline | Body |
|---|---|---|
| 1 | **CBP HQ H350722 — Jan 2026** | The line was drawn on what unlicensed AI tools can decide on an entry. Most tools predate the ruling. |
| 2 | **End of §321 de minimis** | ~4.2B packages a year that came in duty-free now need formal entries — many flag PGAs they didn't a year ago. |
| 3 | **Lacey PPQ-505 paper cutoff — Jan 1, 2026** | Paper PPQ-505/505B no longer accepted. Filers must use ACE or APHIS LAWGS. |

Lucide icons: `gavel` · `package` · `leaf`. The big numbers (4.2B · 100% low-value FDA · 0 paper) **count up** when the card enters viewport.

### 4.3 What it does — three input → output cards

One card per v1 PGA. Each card is a horizontal split: stack of doc icons on the left → filled form output on the right.

| PGA | Input | Output |
|---|---|---|
| **FDA Prior Notice** (food) | Invoice · packing list · supplier registration | Filled Prior Notice fields with citations + confidence per field |
| **EPA TSCA §13** (chemicals/polymers) | Invoice · packing list · MSDS / COA | Positive or negative TSCA §13 statement with citations |
| **Lacey PPQ-505** (wood / plant products) | Invoice · packing list · product spec | Filled PPQ-505 declaration with species/origin citations |

Body copy for each card: one sentence on the input, one sentence on the output, both broker-facing.

### 4.4 The line we don't cross — broker zone / agent zone

**Page signature interaction.** Full-width centered SVG visualization.

- A horizontal "compliance line" draws left-to-right (~1.5s, SVG `stroke-dashoffset` animation).
- **Above the line — Broker zone** (label fades in, then chips):
  - You decide what data appears on the entry.
  - You derive 8- and 10-digit HTSUS subheadings.
  - You sign and submit via ABI.
- **Below the line — Agent zone** (label fades in, then chips):
  - Parse documents and suggest fields.
  - Cite regulations alongside every suggestion.
  - Classify HS to the 6-digit international ceiling.
- **Pull-quote below the visualization** (italic, large): *"An unlicensed entity cannot decide what data appears on an entry. Per CBP HQ H350722, January 2026."*

This is the moneyshot. Gets the most visual weight on the page. Reinforces the differentiation that the deck's slide 5 establishes with prospects.

### 4.5 Outcomes strip

Four stat cards. Numbers count up on scroll-in. *"Pre-pilot estimate"* caveat in small caps under each time card.

| Stat | Value |
|---|---|
| FDA Prior Notice — time per filing | ~38 min manual → ~4 min assisted * |
| Audit-prep time per case | hours → seconds * |
| Fields cited | every field |
| Fields overridable | every field |

\* Pre-pilot estimate. Replaced with your firm's numbers after a pilot.

A "Review & approve for export" button mockup sits alongside; on hover, an approval-stamp SVG animates onto a sample field.

### 4.6 Who this is for

Three quiet persona cards (fade-up only, no extra motion):

- **Broker firms** — NCBFAA-member, small / mid-tier
- **Senior filers** — the people who actually do the work today
- **Trade-compliance leads** — at brokerages and at importer firms

### 4.7 CTA band

Bold gradient bar with the deck's pilot offer copy:

> Bring your senior filer. We'll run two of your real shipments through the copilot on the call. If it makes sense, a 50-case pilot is free.

- Primary CTA: *Email sales@xentovia.ai* — `mailto:sales@xentovia.ai`
- Secondary: short note that demos run 30 minutes, hands-on with the prospect's docs.
- Approval-stamp watermark behind the headline.

### 4.8 Footer

Reuse the existing site footer unchanged.

## 5. Visual & animation system

### 5.1 Visual signature: the customs approval stamp

A subtle red/maroon ink-stamp graphic (`Review & approve for export ✓`) used as the page-unique visual signature. Appears in three spots:

1. Hero — animates in off-axis after the H1 lands.
2. Outcomes strip — animates onto a sample field on hover.
3. CTA band — sits as a watermark behind the headline.

This is what differentiates the PGA Copilot page from `/solutions/customs-trade/` (which leans abstract dataflow). Same dark-space palette, same Inter typeface, same glass cards, same lucide icons — just one extra motif.

### 5.2 Per-section motion

- **Hero:** H1 fades up → sub fades in (+200ms) → CTAs fade in (+400ms) → approval stamp rotates in (+600ms).
- **Why now:** three cards fade up with 150ms stagger; numbers count up via IntersectionObserver.
- **What it does:** each card is independent. On scroll-in: docs slide in from the left, an SVG arrow draws across (`stroke-dashoffset`), fields populate top-to-bottom on the right with a 60ms typing-rhythm stagger, citation chip pulses once, confidence chip pulses once. Cards stagger by 200ms.
- **Broker zone / agent zone:** compliance line draws left-to-right (~1.5s) → "Broker zone" label fades in → above-line chips fade in sequentially → "Agent zone" label fades in → below-line chips fade in sequentially → pull-quote fades in last.
- **Outcomes:** numbers count up; approval stamp animates on hover.
- **Who this is for:** simple fade-up.
- **CTA band:** subtle pulse on the primary CTA (existing site pattern).

### 5.3 Background ambient motion

Reuse the existing glow-orb system from `/solutions/customs-trade/` (purple / blue / cyan, `glowMove` / `glowMove2` / `glowMove3` keyframes). Add one extra cyan orb behind the broker-zone / agent-zone visualization for emphasis. No new ambient backgrounds.

### 5.4 Performance & accessibility

- All scroll animations are **one-shot**, triggered by IntersectionObserver. They do not replay on scroll-back.
- Respect `prefers-reduced-motion: reduce` — every animation collapses to an instant fade-in (or no animation for the count-ups; show the final value immediately).
- CSS `transform` and `opacity` only (no width/height/top/left animations — no layout shift).
- `will-change: transform` on animated elements; remove after the animation completes.
- No new JS libraries. Lucide is already on the site; the existing `animate-on-scroll` pattern + small inline IntersectionObserver helpers are sufficient.
- Lighthouse target: matches `/solutions/customs-trade/` (no regression on Performance, Accessibility, or Best Practices).

## 6. Home-page changes

Three changes to `/index.html`, in order of impact:

### 6.1 Hero rewrite

Today the hero is a horizontal AI-for-regulated-industries pitch. Rework so the H1, sub, and primary CTA all anchor on PGA Copilot.

- **H1 direction:** *PGA Copilot — AI for FDA, EPA, and Lacey filings, built below the H350722 line.*
- **Sub:** one-line broker-decides framing, links to `/solutions/pga-copilot/`.
- **Primary CTA:** *Book a demo* → `mailto:sales@xentovia.ai`.
- **Secondary:** *See PGA Copilot →* anchors to / links to the page.
- Add one short line below the hero acknowledging the broader Xentovia surface ("We also build agentic AI for healthcare, insurance, mortgage, and manufacturing — see Solutions") so the home page does not feel like a single-product microsite.

### 6.2 Solutions grid reorder

The bento grid currently leads with customs-trade. New order:

```
1. PGA Copilot      (NEW — replaces customs-trade as #1)
2. Customs & Trade  (was #1; slides to #2)
3. Insurance
4. Healthcare
5. Mortgage
6. Manufacturing
```

The PGA Copilot card uses a slightly stronger visual treatment than its peers — a `Now shipping` eyebrow chip and a subtle accent ring — to signal it is the flagship without breaking the grid.

### 6.3 Cross-link from `/solutions/customs-trade/`

Add a single banner-style callout near the top of the customs-trade page:

> Looking for AI for FDA Prior Notice, EPA TSCA §13, or Lacey PPQ-505? **See PGA Copilot →**

Does not restructure the customs-trade page; just routes the right reader to the right place. Preserves the broader horizontal pitch for forwarders, importers, and 3PLs.

### 6.4 What is NOT changing

- Top nav (no dedicated PGA Copilot nav link in this iteration — the user picked "lead the home page" not "lead + nav link").
- Other home-page sections below the hero ("how we work", "ecosystem", blog, footer).
- Any other solution pages besides the small customs-trade callout in §6.3.

## 7. Implementation surface

| File | Change |
|---|---|
| `/solutions/pga-copilot/index.html` | **NEW.** Full page per §4–§5. |
| `/index.html` | Hero rewrite (§6.1) + solutions grid reorder (§6.2). |
| `/solutions/customs-trade/index.html` | Add cross-link callout (§6.3). |
| `/assets/` (if needed) | Approval-stamp SVG asset, if not inlined. Inline preferred. |

No build step (the site is static HTML + Tailwind CDN). No new dependencies. No backend changes.

## 8. Out of scope (this spec)

- Re-cutting the YouTube briefing for public use (decided: keep unlisted).
- Pricing page or rate card (lives in the demo).
- Self-serve signup, account creation, or in-product UI screenshots beyond illustrative mockups.
- Top-nav changes or a `/pga-copilot/` brand microsite outside `/solutions/`.
- SEO microcopy beyond the basic `<title>`, `<meta description>`, and Open Graph tags (those are part of the page; no separate SEO sweep yet).
- Analytics events beyond what the site already does. No new instrumentation in this spec.
- Changes to the deck, the YouTube video, or `/blog/`.

## 9. Open items / not questions

- All clarifying questions resolved during brainstorming (positioning, prominence, disclosure, audience, CTA, scope, video, visuals).
- The implementation plan (next step via `writing-plans` skill) will sequence the file changes, copy approval, and visual QA.
