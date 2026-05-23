# Xentovia Founder Cards — Dark Research-Lab Variant

Design spec for a second printable card design that lives alongside the existing light editorial cards at `print/cards/`. Same trim, same QR contract, different aesthetic.

## Goal

Ship a "modern AI research-lab" alternative the founders can print and choose between (or print both and use contextually). Each variant produces three PDFs (one per founder), independently rendered and shipped.

## Relationship to v1

| | v1 — Light editorial | v2 — Dark research-lab |
|---|---|---|
| Lives at | `print/cards/` | `print/cards-dark/` |
| Paper | `#FAFAF7` warm off-white | `#060B18` deep navy |
| Front layout | Two-column (identity + QR right) | Single-column with iconed contact rows |
| Back layout | Brand mark + url + legal | QR (on cream stamp) + caption + brand + legal |
| Code reuse | Source of truth for data.js / qr.js shape | Files copied, not symlinked — variants can drift independently |

Both variants share the same MECARD payload format, so a recipient saving either card lands the same contact details.

## Founders covered

Identical to v1 — Ramachandran A V (CEO), Rajnee Dubey (COO), Santosh Kumar (CTO). Phone shown only for Ram.

## Physical specs

Unchanged from v1: 89 × 51 mm trim, 3 mm bleed, 5 mm safe area, 95 × 57 mm artboard, two sides, three PDFs (one per founder).

## Palette

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#060B18` | Dark navy background (matches website `space-900`) |
| `--ink` | `#E2E8F0` | Body text (soft cream) |
| `--ink-bright` | `#F5F7FF` | Name display (slightly brighter) |
| `--slate` | `#94A3B8` | Captions, role line, footer micro |
| `--accent-from` | `#6366F1` | Logo halo / hairline (indigo end) |
| `--accent-to` | `#06B6D4` | Logo halo / hairline (cyan end) |
| `--qr-stamp` | `#FAFAF7` | Cream "stamp" the QR sits on (provides scanner contrast against the dark paper) |

## Typography

Same families as v1:
- Display: Instrument Serif — name at 16 pt (one notch smaller than v1's 18 pt because the dark background needs less type weight to read as the focal element)
- UI: Inter 400/500 — contact lines at 7.5 pt
- Mono caps: JetBrains Mono 500, 0.22 em tracking — wordmark, role, captions

## Layout

### Front face

```
┌─────────────────────────────────────────────┐
│ ○▣ XENTOVIA                                 │
│  ↑ logo with soft indigo radial glow        │
│                                             │
│  Ramachandran A V                           │
│  CEO · CO-FOUNDER                           │
│  ──── (indigo→cyan hairline)                │
│                                             │
│  ✉  ram@xentovia.ai                         │
│  ☎  +91 63623 04979                         │
│  ↗  xentovia.ai                              │
│                                             │
│  📍 BENGALURU · IN                          │
└─────────────────────────────────────────────┘
```

- Logo wrap: `.logo-glow` sits behind the 5 mm logo image, painting a soft radial indigo glow (`radial-gradient(circle, rgba(99,102,241,0.55) 0%, transparent 65%)`, blur-free since it's an SVG/CSS gradient — printer-safe)
- Wordmark: mono caps slate, gap 2 mm
- Name: Instrument Serif 16 pt bright cream
- Role: mono caps 6 pt slate, 1 mm below the name
- Hairline: 18 mm wide, 0.35 mm tall, indigo→cyan gradient
- Contact rows: flex row with 2 mm gap between icon and text. Inline SVG icons, 3 mm square, hairline stroke (`stroke-width="1.5"` on a `viewBox="0 0 24 24"`, ends up ~0.18 mm at print). Icons rendered in slate. Text in soft cream Inter 7.5 pt.
- Location row at the bottom uses a map-pin icon in the same style. Mono caps, slate, smaller (5.5 pt).

If a contact line is omitted (no phone for Rajnee / Santosh), the remaining rows compact upward — same rule as v1.

### Back face

```
┌─────────────────────────────────────────────┐
│                                             │
│         ┌──────────────────┐                │
│         │ ▢▢▢▢▢▢▢▢▢▢▢▢▢▢ │                │
│         │ ▢▢ dark QR on  ▢ │                │
│         │ ▢▢ cream stamp ▢ │                │
│         │ ▢▢▢▢▢▢▢▢▢▢▢▢▢▢ │                │
│         └──────────────────┘                │
│         SCAN TO ADD CONTACT                 │
│                                             │
│              ○▣  xentovia.ai                │
│           Xentovia Tech Pvt Ltd             │
└─────────────────────────────────────────────┘
```

- QR stamp: 28 mm square, cream `--qr-stamp` background, rounded 1.5 mm, 1 mm internal padding. Inside: standard MECARD QR with dark navy (`#0A1128`) modules. Why a stamp rather than inverted modules: not all QR scanners reliably parse inverted (light-on-dark) codes; the stamp guarantees compatibility while still making the QR a striking focal element.
- "SCAN TO ADD CONTACT" caption: mono caps 6 pt slate, 3 mm below the stamp.
- Small brand line: 4 mm logo with subtle glow + "xentovia.ai" mono caps. The legal line (`Xentovia Tech Pvt Ltd`) sits 3 mm below in 5 pt mono caps at 60% slate.

## Icons

Inline SVG, defined once at the top of the inline script (icon source-of-truth lives in a small `ICONS` map), referenced by name. Each icon:
- `viewBox="0 0 24 24"`
- Stroke-only (`fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`)
- Rendered at 3 mm square in contact rows, 2.5 mm in the location row.
- `currentColor` = slate, inherited from the parent text colour.

Icons needed:
- `mail` — envelope outline
- `phone` — handset outline
- `link` — diagonal arrow box (matches the existing CEO digital card)
- `pin` — map pin outline

Paths copied/adapted from Lucide (MIT-licensed, same family as the existing `/ceo/` card's icons) — no runtime dependency, just inlined `<path d="…">`.

## QR payload

Unchanged from v1: MECARD with `N`, `ORG=Xentovia`, optional `TEL`, `EMAIL`, `URL`, `NOTE`. Same `buildMECARD` function.

## File layout

```
print/
  cards-dark/
    index.html           ← single-page template, all 6 faces
    cards.css            ← dark palette, single-column front, iconed contact rows
    data.js              ← COPIED from print/cards/data.js (no symlink — variants can drift)
    qr.js                ← COPIED from print/cards/qr.js (identical content for now)
    render.sh            ← COPIED structure, writes into cards-dark/out/
    README.md            ← variant-specific notes (paper recommendation differs)
    out/                 ← generated PDFs (gitignored)
.gitignore               ← add print/cards-dark/out/*.pdf
```

The render script writes:
```
print/cards-dark/out/
  ramachandran-av.pdf
  rajnee-dubey.pdf
  santosh-kumar.pdf
```

## Print considerations specific to dark

- Ink coverage is high (entire card is dark navy). Recommend **350 gsm matte uncoated** like v1, but request the press use a CMYK rich black build (`C40 M30 Y30 K100`) instead of `K100` alone — flat black on coated stock can look thin against the cream stamp. The README documents this.
- Edge wear shows more on dark cards. Lamination is optional but the README mentions it.
- Avoid glossy or metallic finishes — they fight the editorial restraint and complicate the QR scan.

## Acceptance criteria

A v2 founder card is "done" when:

1. Front shows wordmark with glowing logo, name, role, hairline, three iconed contact rows (or two for phone-less founders), location row — all inside the 5 mm safe area
2. Back shows QR on cream stamp (≥ 25 mm), "SCAN TO ADD CONTACT" caption, brand line, legal line
3. Scanning the QR on stock iPhone Camera surfaces the "Add to Contacts" prompt — same content as v1's QR
4. Generated PDF opens at 95 × 57 mm with crop marks at 3 mm offset
5. The cream stamp is sharply rectangular with no visible halo (no soft shadow bleed)
6. The logo halo is visible but not blown out — it should read as glow, not as a separate shape

## Out of scope

- Sharing data.js / qr.js between v1 and v2 via symlink (deliberate duplication — variants will likely drift)
- A third or fourth variant (datasheet, dev-terminal) — they're available as future work, not in this spec
- Editing v1 — v1 stays exactly as-is
- Embedding photos
- CMYK colour-managed PDF export (printer's RIP handles conversion; if true CMYK needed, regenerate via Illustrator from the SVG)
