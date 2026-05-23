# Xentovia Founder Cards — Hero Typography Variant

Third design (alongside light editorial at `print/cards/` and dark research-lab at `print/cards-dark/`). Same trim, same QR contract, layout-led: the founder's name becomes the magazine-cover focal element.

## Goal

A "name as poster" front face where the surname drops to a second line and the typography is the design. No QR on the front — recipients flip to see it.

## Relationship to v1 / v2

| | v1 light editorial | v2 dark research-lab | v3 hero (this) |
|---|---|---|---|
| Lives at | `print/cards/` | `print/cards-dark/` | `print/cards-hero/` |
| Paper | Cream `#FAFAF7` | Navy `#060B18` | Cream `#FAFAF7` |
| Front | 2-column (identity + QR) | Single column with icons | Single column, name dominant, no QR |
| Back | Brand mark only | QR on cream stamp + brand + legal | QR + caption + brand + legal |

All three share the same MECARD payload — recipients save identical contacts no matter which they scan.

## Founders

Identical to v1/v2 — Ramachandran A V, Rajnee Dubey, Santosh Kumar. Phone shown only for Ram.

## Physical specs

89 × 51 mm trim, 3 mm bleed, 5 mm safe area, 95 × 57 mm artboard. Two-sided. Three PDFs, one per founder.

## Palette

Same tokens as v1 (cream paper, navy ink, indigo→cyan accent). Reused intentionally so v1 and v3 read as siblings in a family.

| Token | Hex |
|---|---|
| `--paper` | `#FAFAF7` |
| `--ink` | `#0A1128` |
| `--slate` | `#475569` |
| `--accent-from` | `#6366F1` |
| `--accent-to` | `#06B6D4` |

## Typography

- Display: **Instrument Serif** at **26 pt** — first name (regular), surname (italic)
- UI: Inter 400/500 at 7.5 pt — contact lines
- Mono caps: JetBrains Mono 500 — wordmark, role, location

The italic-surname split is the defining typographic move: first name normal, surname italic, stacked on two lines. Echoes the italic "X" in the brand mark.

## Layout

### Front face

```
┌───────────────────────────────────────────┐
│  ▣ XENTOVIA                                │
│                                            │
│  Ramachandran                              │
│         A V                                │   ← italic, indented
│  ─────                                     │   ← gradient hairline, 24mm
│  CEO · CO-FOUNDER                          │
│                                            │
│                                            │
│  ram@xentovia.ai                           │
│  +91 63623 04979  ·  xentovia.ai           │
│                          BENGALURU · IN    │
└───────────────────────────────────────────┘
```

- Wordmark top-left: 5 mm logo + "XENTOVIA" mono caps, slate, 6.5 pt
- Name block: ~10 mm below wordmark
  - First name: Instrument Serif regular, 26 pt, deep navy, baseline left
  - Surname: Instrument Serif **italic**, 26 pt, deep navy, indented 8 mm from the left edge of the first name
- Gradient hairline (indigo→cyan) 24 mm wide, 0.35 mm tall, directly below the surname line
- Role line: mono caps 6.5 pt slate, 1.5 mm below hairline
- Contact stack at bottom-left:
  - Line 1: email (Inter 7.5 pt navy)
  - Line 2 (if phone present): `phone  ·  website` joined by an inline middot
  - Line 2 (if no phone): `website`
- Location bottom-right: mono caps 5.5 pt slate, "BENGALURU · IN"

If a contact line is omitted (no phone for Rajnee / Santosh), the website moves up to the email line's slot rather than leaving a gap — i.e., always exactly two contact lines on the front.

### Back face

```
┌───────────────────────────────────────────┐
│                                            │
│             ▢▢▢▢▢▢▢▢▢▢                    │
│             ▢▢ QR (30mm) ▢▢                │
│             ▢▢▢▢▢▢▢▢▢▢                    │
│         SCAN TO ADD CONTACT                │
│                                            │
│              ▣  xentovia.ai                │
│           Xentovia Tech Pvt Ltd            │
└───────────────────────────────────────────┘
```

- QR: 30 mm square (a touch bigger than v1's 28 mm since the back has more breathing room and the QR is now the only functional element on either face)
- Caption: "SCAN TO ADD CONTACT" mono caps 6 pt slate, centred 3 mm below QR
- Brand line: 4 mm logo + "xentovia.ai" mono caps slate, centred
- Legal: "Xentovia Tech Pvt Ltd" 5 pt mono caps slate-dim, centred at the bottom

## Per-founder name treatment

The first-name / surname split is uniform — first part of `full` on line 1, rest on line 2.

| Founder | Line 1 (regular) | Line 2 (italic) |
|---|---|---|
| Ram | Ramachandran | A V |
| Rajnee | Rajnee | Dubey |
| Santosh | Santosh | Kumar |

Implementation uses `data.js`'s existing `first` and `last` fields directly — no new data needed.

## File layout

```
print/
  cards-hero/
    index.html           ← new template
    cards.css            ← new stylesheet, hero typography rules
    data.js              ← COPIED from print/cards/data.js
    qr.js                ← COPIED from print/cards/qr.js
    render.sh            ← adapted from cards/render.sh
    README.md            ← variant-specific notes
    out/                 ← generated PDFs (gitignored)
.gitignore               ← add print/cards-hero/out/*.pdf
```

## Acceptance criteria

A v3 card is "done" when:

1. Front shows wordmark top-left, two-line name (first regular, surname italic, indented), gradient hairline, role, two-line contact block, location bottom-right — all inside the 5 mm safe area
2. The first name fits on one line at 26 pt (the longest first name, "Ramachandran", must not wrap)
3. Back shows ≥ 28 mm QR, caption, brand line, legal — all centred
4. Scanning the QR yields the same MECARD contact data as v1/v2
5. Generated PDF opens at 95 × 57 mm with crop marks at 3 mm offset

## Out of scope

- A standalone first-name page (one per founder showing only the name) — fun but not what was asked for
- Cross-variant data synchronisation (handled by manually copying `data.js` when contact info changes)
- Variable per-founder hero treatments (e.g. different name sizes per founder) — uniform is the spec
