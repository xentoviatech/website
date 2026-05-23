# Xentovia Founders — Print Business Cards

Design spec for printable visiting cards for the three co-founders. Source-controlled HTML + print CSS template that renders to a press-ready PDF.

## Goal

Produce one print-ready PDF (with bleed and crop marks) per founder — two pages each, front and back — so cards can be sent to any Indian or international printer (Printo, Vistaprint, local press) without further design work.

## Founders covered

| Role | Name | Email | Phone | Photo |
|---|---|---|---|---|
| CEO & Co-Founder | Ramachandran AV | `ram@xentovia.ai` | `+91 63623 04979` | `/assets/team/avr.jpg` (not used on print) |
| COO & Co-Founder | Rajnee Dubey | `rajnee@xentovia.ai` | omitted | `/assets/team/rd.jpg` (not used on print) |
| CTO & Co-Founder | Santosh Kumar | `santosh@xentovia.ai` | omitted | not used on print |

LinkedIn URLs are embedded in the QR payload where known; otherwise omitted. Photos are not printed on the cards (kept clean and text-led).

## Physical specs

- **Trim size**: 89 × 51 mm (India / EU standard)
- **Orientation**: landscape
- **Bleed**: 3 mm on all sides → full-bleed artboard 95 × 57 mm
- **Safe area**: 5 mm inside trim — no text or critical art outside this zone
- **Crop marks**: 3 mm offset from trim, hairline (0.25 pt)
- **Sides**: two (front + back)
- **Output**: single PDF per founder, vector-only (no rasters except the optional logo PNG; SVG logo preferred)
- **Stock recommendation** (not enforced by file): 350 gsm matte uncoated

## Visual system

### Palette (sRGB; printer will CMYK-convert)

| Token | Hex | Use |
|---|---|---|
| Paper | `#FAFAF7` | Background (warm off-white — low ink coverage, premium feel) |
| Ink (body) | `#0A1128` | Names, contact lines |
| Slate | `#475569` | Captions, role line, footer micro |
| Accent gradient | `#6366F1 → #06B6D4` | Logo glyph, 24 mm hairline divider only |

### Typography

- **Display**: Instrument Serif — names (~18 pt on front)
- **UI sans**: Inter 400/500 — email, phone, URL (~7.5 pt)
- **Mono caps**: JetBrains Mono 500, 0.22em tracking — wordmark, role line, captions

Fonts pulled from Google Fonts at render time (same families as the website). For the PDF generation step the fonts must be loaded (template waits on `document.fonts.ready` before considering the page ready to print).

## Layout

### Front face (89 × 51 mm landscape)

```
┌───────────────────────────────────────────────┐
│  ▣ XENTOVIA                                   │
│                                               │
│  Ramachandran AV                              │
│  CEO · CO-FOUNDER                             │
│  ─────────────                                │
│                                               │
│  ram@xentovia.ai                              │
│  +91 63623 04979                              │
│  xentovia.ai                                  │
│                                  bengaluru ·  │
└───────────────────────────────────────────────┘
```

- Logo + mono wordmark top-left (logo carries the indigo→cyan gradient; wordmark is slate mono caps)
- Name: Instrument Serif, deep navy, left-aligned, baseline ~22 mm from top
- Role: mono caps, slate, directly under the name
- 24 mm gradient hairline under the role
- Contact stack (email / phone / website): Inter 7.5 pt, navy, left-aligned
- Footer micro: "bengaluru ·" bottom-right, mono caps slate

If a contact line is omitted (no phone for Rajnee / Santosh), the remaining lines compact upward — no blank gap.

### Back face (89 × 51 mm landscape)

```
┌───────────────────────────────────────────────┐
│                                               │
│                ▢▢▢▢▢▢▢▢▢▢                   │
│                ▢█▢█▢█▢▢█▢                   │
│                ▢▢█▢█▢█▢█▢                   │
│                ▢▢▢▢▢▢▢▢▢▢                   │
│                                               │
│         SCAN TO SAVE CONTACT                  │
│                                               │
│                 ▣ xentovia.ai                 │
└───────────────────────────────────────────────┘
```

- Centred QR, ~28 mm square, navy modules on paper background (no white quiet-zone box — paper IS the quiet zone)
- Caption: "SCAN TO SAVE CONTACT" — mono caps slate, ~3 mm below QR
- Footer: logo glyph + `xentovia.ai` in mono, centred, near bottom

### QR payload

MECARD format (same encoder already used on `/ceo/index.html`). Per founder:

```
MECARD:N:<Last>,<First>;ORG:Xentovia;TEL:<phone-if-any>;EMAIL:<email>;URL:https://xentovia.ai;NOTE:<Title>;;
```

- iOS Camera and Google Lens recognise MECARD natively → "Add to Contacts" prompt
- No website round-trip; works offline
- `TEL` field omitted when phone is not provided
- Error correction level: M (balances density and damage tolerance for a 28 mm print)

## File layout

```
print/
  cards/
    index.html              ← multi-page template, renders all 6 faces
    cards.css               ← @page rules, layout, type
    qr.js                   ← QR rendering (uses qrcode-generator from CDN)
    README.md               ← how to render the PDF
    out/                    ← generated PDFs (gitignored)
      ramachandran-av.pdf
      rajnee-dubey.pdf
      santosh-kumar.pdf
```

The template is placed under `print/cards/` rather than `assets/` because it is a build artifact, not a web asset served from `xentovia.ai`. The `out/` directory is gitignored — PDFs are regenerated on demand.

## Render flow

The deliverable is **three PDFs, one per founder**, each two pages (front + back). Printers prefer one file per SKU and it's clearer for the founders to hand the right file to a press.

**Per-founder selection** — append a query string: `index.html?only=ram` (or `?only=rajnee`, `?only=santosh`). The template's inline script hides the other founders' pages. With no query string, all six pages render — useful as an on-screen preview during iteration.

**Manual render (one founder at a time):**
1. Open `print/cards/index.html?only=ram` in Chrome
2. Cmd/Ctrl+P → destination "Save as PDF" → margins "None" → paper size "Custom 95 × 57 mm" → background graphics ON
3. Save as `print/cards/out/ramachandran-av.pdf`
4. Repeat for `?only=rajnee` and `?only=santosh`

**Headless (all three in one shot)** via a small `render.sh` shipped alongside the template:

```
chromium --headless --disable-gpu --no-margins \
  --print-to-pdf=print/cards/out/ramachandran-av.pdf \
  'print/cards/index.html?only=ram'
# repeat for rajnee and santosh
```

The template includes a print-only stylesheet so the same HTML also serves as an on-screen preview during iteration.

## Acceptance criteria

A founder's card is "done" when:

1. Front shows: wordmark, name, role, gradient hairline, contact stack, footer micro — all inside the 5 mm safe area
2. Back shows: QR, caption, centred footer wordmark — QR is at least 25 mm square
3. Scanning the QR on a stock iPhone Camera surfaces the "Add to Contacts" prompt with the right name, org, title, email, (phone if any), URL
4. Generated PDF opens in Acrobat / Preview at exactly 95 × 57 mm with visible crop marks at 3 mm offset
5. Type rendering uses the correct families (Instrument Serif, Inter, JetBrains Mono) — verified by visual inspection at 100%
6. Total ink coverage on the front is roughly ≤ 15% (light-card promise: low coverage = clean print on any press)

## Out of scope

- Designing a Xentovia brand mark / logotype — reusing existing `/favicon.png`
- Reverse / fold-over cards, premium finishes (foil, spot UV, edge paint)
- Localising the card into a second language
- Building digital `/coo/` and `/cto/` web pages (the earlier conversation considered this; deferred — QR uses MECARD only, not a per-person URL)
- CMYK colour-managed PDF export (printer's RIP will convert sRGB; if a press requires true CMYK we'll regenerate via Illustrator from the SVG)

## Risks

- **Font fallback in headless render**: if `chromium --print-to-pdf` is run without an active display, web-font loading can race the print event. Mitigation: the template awaits `document.fonts.ready` and a 500 ms post-load delay before signalling print-ready (`document.title` flips to `READY`).
- **Off-white reproduction**: `#FAFAF7` may print slightly different across presses. If the user prefers pure white paper, swapping to `#FFFFFF` is a one-line change.
- **QR scan-rate at 25 mm**: error-correction M with MECARD payload typically fits in a ~21×21 module grid → comfortable at 25 mm on 300 dpi+ presses. If a longer LinkedIn URL is added later, we may need to bump to 28 mm or drop to ECC L.
