# Founder Business Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a source-controlled HTML + print-CSS template that renders three press-ready PDF visiting cards (89 × 51 mm, two-sided, with MECARD QR) for the Xentovia co-founders.

**Architecture:** A single self-contained HTML page under `print/cards/` lays out all six faces (3 founders × front + back) as fixed-size print pages using CSS `@page` rules. A small inline script renders each founder's MECARD payload to an inline SVG QR using the same `qrcode-generator@1.4.4` CDN library the digital `/ceo/` card already depends on. A `?only=<id>` query string narrows the print run to one founder so each ships as its own PDF. PDFs are produced by Chrome "Save as PDF" (manual) or `chromium --headless --print-to-pdf` via a small `render.sh`.

**Tech Stack:** HTML5, CSS3 with `@page`, vanilla JS (DOM APIs, no `innerHTML` on data paths), `qrcode-generator@1.4.4` (CDN), Google Fonts (Instrument Serif / Inter / JetBrains Mono), Chromium for PDF generation.

**Spec:** `docs/superpowers/specs/2026-05-23-business-cards-design.md`

---

## File Structure

```
print/
  cards/
    index.html        ← single-page template, all six faces
    cards.css         ← @page rules, layout, type, palette tokens
    data.js           ← founder records (single source of truth)
    qr.js             ← MECARD builder + safe SVG QR renderer (createElementNS)
    render.sh         ← headless chromium driver, writes 3 PDFs
    README.md         ← how to render, customise, and re-print
    out/              ← generated PDFs (gitignored)
.gitignore            ← add print/cards/out/
```

**Why this layout:**
- `index.html` stays small and presentational — semantics + class hooks only
- `cards.css` owns all visual rules; one place to tweak palette, typography, spacing
- `data.js` is the only file that changes when contact info changes
- `qr.js` is a pure rendering helper, isolated so it can be unit-tested
- `render.sh` and `README.md` make re-printing a one-command operation for the founders themselves

---

## Task 1: Scaffold the directory and gitignore

**Files:**
- Create: `print/cards/.gitkeep`
- Create: `print/cards/out/.gitkeep`
- Create or modify: `.gitignore`

- [ ] **Step 1: Create the directories with gitkeep placeholders**

```bash
mkdir -p print/cards/out
touch print/cards/.gitkeep print/cards/out/.gitkeep
```

- [ ] **Step 2: Add the generated-PDF directory to .gitignore**

If `.gitignore` does not exist, create it with:

```
# generated print artefacts
print/cards/out/*.pdf
```

If it exists, append the same two lines.

- [ ] **Step 3: Verify**

Run: `git status print/`
Expected: `.gitkeep` files appear as untracked; no `.pdf` files yet.

- [ ] **Step 4: Commit**

```bash
git add .gitignore print/cards/.gitkeep print/cards/out/.gitkeep
git commit -m "Scaffold print/cards/ directory for founder business cards"
```

---

## Task 2: Define founder data (single source of truth)

**Files:**
- Create: `print/cards/data.js`

- [ ] **Step 1: Write the founder records**

`print/cards/data.js`:

```javascript
// Single source of truth for founder card content.
// Editing here regenerates all faces and QR codes on next render.
window.FOUNDERS = [
  {
    id: 'ram',
    first: 'Ramachandran',
    last: 'AV',
    full: 'Ramachandran AV',
    title: 'CEO & Co-Founder',
    role: 'CEO · CO-FOUNDER',
    email: 'ram@xentovia.ai',
    phone: '+916362304979',
    phoneDisplay: '+91 63623 04979',
    website: 'https://xentovia.ai',
    location: 'BENGALURU · IN',
  },
  {
    id: 'rajnee',
    first: 'Rajnee',
    last: 'Dubey',
    full: 'Rajnee Dubey',
    title: 'COO & Co-Founder',
    role: 'COO · CO-FOUNDER',
    email: 'rajnee@xentovia.ai',
    phone: null,
    phoneDisplay: null,
    website: 'https://xentovia.ai',
    location: 'BENGALURU · IN',
  },
  {
    id: 'santosh',
    first: 'Santosh',
    last: 'Kumar',
    full: 'Santosh Kumar',
    title: 'CTO & Co-Founder',
    role: 'CTO · CO-FOUNDER',
    email: 'santosh@xentovia.ai',
    phone: null,
    phoneDisplay: null,
    website: 'https://xentovia.ai',
    location: 'BENGALURU · IN',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add print/cards/data.js
git commit -m "Add founder data records for printed business cards"
```

---

## Task 3: MECARD builder + safe SVG QR renderer

**Files:**
- Create: `print/cards/qr.js`

The `qrcode-generator` library is loaded from CDN by `index.html` and exposes a global `qrcode` function. This module wraps it and adds the MECARD payload builder. SVG is built via `document.createElementNS` (no innerHTML), so the renderer can never inject markup it didn't itself construct.

- [ ] **Step 1: Write the module**

`print/cards/qr.js`:

```javascript
// Builds a MECARD payload (a vCard-lite format recognised by iOS Camera
// and Google Lens — scans trigger a native "Add to Contacts" prompt).
// Spec: https://en.wikipedia.org/wiki/MeCard_(QR_code)
function buildMECARD(c) {
  const esc = (s) => String(s).replace(/([\\;,])/g, '\\$1');
  const parts = [
    `N:${esc(c.last)},${esc(c.first)}`,
    `ORG:Xentovia`,
  ];
  if (c.phone) parts.push(`TEL:${esc(c.phone)}`);
  parts.push(`EMAIL:${esc(c.email)}`);
  parts.push(`URL:${esc(c.website)}`);
  parts.push(`NOTE:${esc(c.title)}`);
  return 'MECARD:' + parts.join(';') + ';;';
}

// Renders the payload as an inline SVG inside `target` (a DOM element).
// SVG nodes are constructed via createElementNS — no innerHTML, no string
// interpolation into markup, so no XSS surface even if the payload changes.
function renderQR(payload, target) {
  if (typeof qrcode !== 'function') {
    target.textContent = 'QR library failed to load';
    return false;
  }
  const qr = qrcode(0, 'M'); // 0 = auto-size, M = error correction
  qr.addData(payload);
  qr.make();
  const count = qr.getModuleCount();
  const dark = '#0A1128';
  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('xmlns', NS);
  svg.setAttribute('viewBox', `0 0 ${count} ${count}`);
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Contact QR code');

  for (let r = 0; r < count; r++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(r, col)) {
        const rect = document.createElementNS(NS, 'rect');
        rect.setAttribute('x', String(col));
        rect.setAttribute('y', String(r));
        rect.setAttribute('width', '1');
        rect.setAttribute('height', '1');
        rect.setAttribute('fill', dark);
        svg.appendChild(rect);
      }
    }
  }

  while (target.firstChild) target.removeChild(target.firstChild);
  target.appendChild(svg);
  return true;
}

window.buildMECARD = buildMECARD;
window.renderQR = renderQR;
```

- [ ] **Step 2: Commit**

```bash
git add print/cards/qr.js
git commit -m "Add MECARD builder and safe SVG QR renderer for print cards"
```

---

## Task 4: Print stylesheet — page, palette, typography, layout

**Files:**
- Create: `print/cards/cards.css`

- [ ] **Step 1: Write the stylesheet**

`print/cards/cards.css`:

```css
/* ─────────────────────────────────────────────────────────────
   Xentovia founder business cards — print stylesheet
   Trim: 89×51mm landscape. Bleed: 3mm. Artboard: 95×57mm.
   ───────────────────────────────────────────────────────────── */

@page {
  size: 95mm 57mm;     /* artboard = trim + 3mm bleed on all sides */
  margin: 0;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --paper:  #FAFAF7;
  --ink:    #0A1128;
  --slate:  #475569;
  --accent-from: #6366F1;
  --accent-to:   #06B6D4;

  --bleed: 3mm;
  --trim-w: 89mm;
  --trim-h: 51mm;
  --safe:   5mm; /* inside trim */
}

html, body {
  background: #ffffff;
  color: var(--ink);
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── On-screen preview: lay the pages out vertically with a soft bg ─── */
@media screen {
  body {
    background: #e5e7eb;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .card-page {
    box-shadow: 0 12px 32px -12px rgba(0,0,0,0.4);
  }
}

/* ─── Print: one card-page per sheet ─── */
@media print {
  body { background: #ffffff; padding: 0; gap: 0; }
  .card-page { page-break-after: always; box-shadow: none; }
  .card-page:last-child { page-break-after: auto; }
}

/* Each .card-page is the full 95×57mm artboard (trim + bleed). */
.card-page {
  width: 95mm;
  height: 57mm;
  background: var(--paper);
  position: relative;
  overflow: hidden;
}

/* Inner content sits inside the safe zone (5mm inset from trim,
   so 8mm from the artboard edge: 3mm bleed + 5mm safe). */
.card-inner {
  position: absolute;
  inset: 8mm;            /* 3mm bleed + 5mm safe */
  display: flex;
  flex-direction: column;
}

/* ─── Crop marks: hairline ticks at 3mm offset from trim ─── */
.crop {
  position: absolute;
  background: var(--ink);
}
.crop-h { height: 0.18mm; width: 3mm; }   /* horizontal tick */
.crop-v { width: 0.18mm; height: 3mm; }   /* vertical tick */

/* Top-left, top-right, bottom-left, bottom-right corner pairs.
   Trim edges are 3mm in from each side of the artboard. */
.crop.tl-h { top: 3mm;   left: 0; }
.crop.tl-v { top: 0;     left: 3mm; }
.crop.tr-h { top: 3mm;   right: 0; }
.crop.tr-v { top: 0;     right: 3mm; }
.crop.bl-h { bottom: 3mm; left: 0; }
.crop.bl-v { bottom: 0;   left: 3mm; }
.crop.br-h { bottom: 3mm; right: 0; }
.crop.br-v { bottom: 0;   right: 3mm; }

/* ─────────────────────────────────────────────────────────────
   FRONT FACE
   ───────────────────────────────────────────────────────────── */
.front .wordmark {
  display: inline-flex;
  align-items: center;
  gap: 2mm;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 6.5pt;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--slate);
}
.front .wordmark .glyph {
  width: 4mm;
  height: 4mm;
  border-radius: 1mm;
  background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
  box-shadow: 0 0 0 0.18mm rgba(10,17,40,0.10);
}

.front .name {
  margin-top: 8mm;
  font-family: 'Instrument Serif', ui-serif, Georgia, serif;
  font-weight: 400;
  font-size: 18pt;
  line-height: 1.04;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.front .role {
  margin-top: 1.2mm;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 6.5pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--slate);
}
.front .hairline {
  margin-top: 2mm;
  width: 24mm;
  height: 0.35mm;
  background: linear-gradient(90deg, var(--accent-from), var(--accent-to));
  border-radius: 1mm;
}

.front .contact {
  margin-top: auto;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 7.5pt;
  line-height: 1.55;
  color: var(--ink);
}

.front .footer-micro {
  position: absolute;
  bottom: 0;
  right: 0;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 5.5pt;
  letter-spacing: 0.22em;
  color: var(--slate);
}

/* ─────────────────────────────────────────────────────────────
   BACK FACE
   ───────────────────────────────────────────────────────────── */
.back .card-inner {
  align-items: center;
  justify-content: center;
}
.back .qr {
  width: 28mm;
  height: 28mm;
  display: block;
}
.back .qr svg { width: 100%; height: 100%; display: block; }

.back .caption {
  margin-top: 3mm;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 6pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--slate);
  text-align: center;
}

.back .footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4mm;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2mm;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 6pt;
  letter-spacing: 0.18em;
  color: var(--slate);
}
.back .footer .glyph {
  width: 3.2mm;
  height: 3.2mm;
  border-radius: 0.8mm;
  background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
}
```

- [ ] **Step 2: Commit**

```bash
git add print/cards/cards.css
git commit -m "Add print stylesheet for 89x51mm founder business cards"
```

---

## Task 5: The HTML template — render all six faces

**Files:**
- Create: `print/cards/index.html`

The renderer builds DOM via `document.createElement` and `textContent` — no `innerHTML` on data-bearing paths. The crop-mark spans contain no data, so they are appended via a helper that creates inert `<span>` elements with class names only.

- [ ] **Step 1: Write the template**

`print/cards/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Xentovia — Founder Business Cards (Print)</title>
  <meta name="robots" content="noindex" />

  <!-- Fonts: match the website families -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap"
    rel="stylesheet"
  />

  <link rel="stylesheet" href="cards.css" />

  <!-- QR encoder (~12KB) -->
  <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
</head>
<body>
  <div id="pages"></div>

  <script src="data.js"></script>
  <script src="qr.js"></script>
  <script>
    (function () {
      // ─── Tiny DOM helper: el(tag, {class, text}, ...children) ───
      function el(tag, opts, ...children) {
        const node = document.createElement(tag);
        if (opts) {
          if (opts.class) node.className = opts.class;
          if (opts.text != null) node.textContent = opts.text;
          if (opts.id) node.id = opts.id;
          if (opts.dataset) {
            for (const k in opts.dataset) node.dataset[k] = opts.dataset[k];
          }
        }
        for (const c of children) {
          if (c == null || c === false) continue;
          node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
        }
        return node;
      }

      // Crop marks are eight inert <span>s — class names only, no data.
      function cropMarks() {
        const positions = [
          'crop-h tl-h', 'crop-v tl-v',
          'crop-h tr-h', 'crop-v tr-v',
          'crop-h bl-h', 'crop-v bl-v',
          'crop-h br-h', 'crop-v br-v',
        ];
        return positions.map((cls) => el('span', { class: 'crop ' + cls }));
      }

      function frontFace(f) {
        const wordmark = el('div', { class: 'wordmark' },
          el('span', { class: 'glyph' }),
          'Xentovia'
        );
        const name = el('h1', { class: 'name', text: f.full });
        const role = el('div', { class: 'role', text: f.role });
        const hairline = el('div', { class: 'hairline' });

        const contact = el('div', { class: 'contact' });
        contact.appendChild(el('div', { text: f.email }));
        if (f.phoneDisplay) contact.appendChild(el('div', { text: f.phoneDisplay }));
        contact.appendChild(el('div', { text: 'xentovia.ai' }));

        const footerMicro = el('div', { class: 'footer-micro', text: f.location });

        const inner = el('div', { class: 'card-inner' },
          wordmark, name, role, hairline, contact
        );

        const page = el('section', {
          class: 'card-page front',
          dataset: { founder: f.id },
        });
        for (const m of cropMarks()) page.appendChild(m);
        page.appendChild(inner);
        page.appendChild(footerMicro);
        return page;
      }

      function backFace(f) {
        const qrSlot = el('div', { class: 'qr', id: 'qr-' + f.id });
        const caption = el('div', { class: 'caption', text: 'SCAN TO SAVE CONTACT' });

        const inner = el('div', { class: 'card-inner' }, qrSlot, caption);

        const footer = el('div', { class: 'footer' },
          el('span', { class: 'glyph' }),
          'xentovia.ai'
        );

        const page = el('section', {
          class: 'card-page back',
          dataset: { founder: f.id },
        });
        for (const m of cropMarks()) page.appendChild(m);
        page.appendChild(inner);
        page.appendChild(footer);
        return page;
      }

      // ?only=ram | rajnee | santosh — narrows the print run to one founder
      const params = new URLSearchParams(window.location.search);
      const only = params.get('only');
      const list = only
        ? window.FOUNDERS.filter((f) => f.id === only)
        : window.FOUNDERS;

      const pages = document.getElementById('pages');
      for (const f of list) {
        pages.appendChild(frontFace(f));
        pages.appendChild(backFace(f));
      }

      // Render QR codes into their slots (renderQR uses createElementNS).
      for (const f of list) {
        const target = document.getElementById('qr-' + f.id);
        const payload = window.buildMECARD(f);
        window.renderQR(payload, target);
      }

      // Signal "ready for print" once fonts have loaded — headless renderers
      // poll `document.title` for this string.
      (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
        .then(() => new Promise((r) => setTimeout(r, 500)))
        .then(() => { document.title = 'READY'; });
    })();
  </script>
</body>
</html>
```

- [ ] **Step 2: Manually preview in a browser**

Open the file in Chrome:

```bash
xdg-open "$(pwd)/print/cards/index.html"   # Linux
# or: open "$(pwd)/print/cards/index.html"  # macOS
```

Expected:
- Six pages stacked vertically on a grey background
- Each page is a clean off-white rectangle with crop-mark ticks at the corners
- Front pages show wordmark, name, role, gradient hairline, contact stack, "BENGALURU · IN" bottom-right
- Back pages show a centred QR square (~28mm), "SCAN TO SAVE CONTACT" caption, and a footer wordmark
- Ram's front shows the phone line; Rajnee's and Santosh's do not (their contact stack is two lines instead of three)
- Window title becomes `READY` after ~600ms

- [ ] **Step 3: Scan one QR with a phone camera (any iPhone or Android)**

Expected: native "Add to Contacts" prompt appears with the correct name, organisation (Xentovia), title, email, and (for Ram) phone.

- [ ] **Step 4: Commit**

```bash
git add print/cards/index.html
git commit -m "Add HTML template for founder business cards (all 6 faces)"
```

---

## Task 6: Headless render script

**Files:**
- Create: `print/cards/render.sh`

The script drives a headless Chromium to produce one PDF per founder. It uses `--virtual-time-budget` so Chromium advances JS timers deterministically before printing — equivalent to a long, reliable wait for fonts and QR rendering.

- [ ] **Step 1: Write the script**

`print/cards/render.sh`:

```bash
#!/usr/bin/env bash
# Renders three founder PDFs into print/cards/out/ via headless Chromium.
# Run from anywhere: ./print/cards/render.sh
#
# Requires: chromium (or google-chrome). On Debian/Ubuntu:
#   sudo apt install chromium
# On macOS with Homebrew:
#   brew install --cask chromium

set -euo pipefail

# Resolve a chromium-compatible binary.
BROWSER=""
for cand in chromium chromium-browser google-chrome chrome; do
  if command -v "$cand" >/dev/null 2>&1; then
    BROWSER="$cand"
    break
  fi
done
if [ -z "$BROWSER" ]; then
  echo "error: no chromium/chrome binary found on PATH" >&2
  echo "install chromium and retry (sudo apt install chromium)" >&2
  exit 1
fi

# Always render relative to this script's directory so the relative
# stylesheet/JS paths in index.html resolve correctly.
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$HERE/out"
mkdir -p "$OUT"

render_one() {
  local id="$1" outname="$2"
  echo "rendering $id → $outname"
  "$BROWSER" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --hide-scrollbars \
    --virtual-time-budget=2000 \
    --no-pdf-header-footer \
    --print-to-pdf="$OUT/$outname" \
    "file://$HERE/index.html?only=$id"
}

render_one ram     "ramachandran-av.pdf"
render_one rajnee  "rajnee-dubey.pdf"
render_one santosh "santosh-kumar.pdf"

echo "done. PDFs in: $OUT"
```

- [ ] **Step 2: Make the script executable**

```bash
chmod +x print/cards/render.sh
```

- [ ] **Step 3: Try to run it**

```bash
./print/cards/render.sh
```

Expected outcomes:

- If a chromium binary is present: three PDFs land in `print/cards/out/`, each two pages, sized 95×57mm. Verify by opening one in your PDF viewer.
- If no chromium binary is present: the script exits with a clear install hint. That is OK — the manual Chrome flow documented in the README is the fallback. **Do not** add a sudo-install step to the plan; the founders will install chromium themselves if they want the one-shot script.

- [ ] **Step 4: Verify PDF page size (only if render succeeded)**

```bash
# pdfinfo is in poppler-utils; skip this step if not installed.
pdfinfo print/cards/out/ramachandran-av.pdf | grep -E "Pages|Page size"
```

Expected: `Pages: 2` and `Page size: 269.291 x 161.575 pts` (= 95mm × 57mm at 72pt/inch).

- [ ] **Step 5: Commit**

```bash
git add print/cards/render.sh
git commit -m "Add headless-chromium render script for founder card PDFs"
```

---

## Task 7: README — usage, editing, printing notes

**Files:**
- Create: `print/cards/README.md`

- [ ] **Step 1: Write the README**

`print/cards/README.md`:

````markdown
# Xentovia Founder Business Cards (Print)

Press-ready HTML + CSS template for the three co-founders' visiting cards.
Edit, re-render, send to print.

## What this produces

Three PDFs, one per founder, two pages each (front + back):

```
out/
  ramachandran-av.pdf
  rajnee-dubey.pdf
  santosh-kumar.pdf
```

- **Size:** 89 × 51 mm trim, 3 mm bleed on all sides (artboard 95 × 57 mm)
- **Sides:** two
- **QR (back):** MECARD payload — scans into native "Add to Contacts" on iOS / Android

## Preview in a browser

```
open index.html               # macOS
xdg-open index.html           # Linux
```

You'll see all six faces stacked vertically. Append `?only=ram`
(or `rajnee`, `santosh`) to preview just one founder.

## Render the PDFs

### Option A — one command, all three (requires Chromium)

```
./render.sh
```

PDFs land in `out/`. On Debian/Ubuntu install Chromium with
`sudo apt install chromium`; on macOS `brew install --cask chromium`.

### Option B — manual, via Chrome (no extra install)

1. Open `index.html?only=ram` in Chrome
2. Cmd/Ctrl + P
3. Destination: **Save as PDF**
4. Paper size: **Custom · 95 × 57 mm**
5. Margins: **None**
6. **Background graphics: ON** (otherwise the off-white paper colour drops out)
7. Save as `out/ramachandran-av.pdf`
8. Repeat for `?only=rajnee` and `?only=santosh`

## Editing

| Change | File |
|---|---|
| Phone, email, name, role | `data.js` |
| Colours, type sizes, spacing | `cards.css` |
| QR payload format (rare) | `qr.js` |
| Layout structure (rare) | `index.html` |

Edit, refresh the browser preview, re-render.

## Sending to a printer

Most Indian and international presses (Printo, Vistaprint, local) accept:
- PDF with bleed (we ship 3 mm)
- sRGB colour (most digital presses RIP-convert to CMYK automatically)
- 300 dpi minimum (we're vector — effectively infinite)

Recommended stock: **350 gsm matte uncoated**. The light-card design has low
ink coverage and reproduces cleanly on any press; the off-white paper colour
(`#FAFAF7`) is forgiving across paper batches.

If a press insists on true CMYK output, open the generated PDF in Acrobat
Pro → Print Production → Convert Colors → CMYK profile of the press's choice.
````

- [ ] **Step 2: Commit**

```bash
git add print/cards/README.md
git commit -m "Document founder business cards: preview, render, edit, print"
```

---

## Task 8: End-to-end verification

This task produces no new files — it confirms the deliverable works.

- [ ] **Step 1: Render the PDFs (or render manually if no chromium)**

```bash
./print/cards/render.sh
```

Or, if chromium isn't installed, use the manual Chrome flow from the README for at least Ram's card.

- [ ] **Step 2: Visual inspection of Ram's PDF**

Open `print/cards/out/ramachandran-av.pdf` in Preview / Acrobat / a browser PDF viewer.

Checklist:
- Two pages
- Page 1 (front): wordmark top-left, "Ramachandran AV" in serif, "CEO · CO-FOUNDER" in mono caps under it, gradient hairline, three contact lines (email, phone, website), "BENGALURU · IN" bottom-right
- Page 2 (back): centred QR (~28mm), "SCAN TO SAVE CONTACT" caption under it, centred logo + "xentovia.ai" near the bottom
- Crop-mark ticks at all eight positions on both pages
- No content closer than 5 mm to the trim edges

- [ ] **Step 3: Visual inspection of Rajnee's PDF**

Same checks. Differences to confirm:
- Name reads "Rajnee Dubey"
- Role reads "COO · CO-FOUNDER"
- Contact stack has **two** lines (email, website) — phone is absent and the website line sits directly under the email with no blank gap

- [ ] **Step 4: Visual inspection of Santosh's PDF**

Same checks. Differences to confirm:
- Name reads "Santosh Kumar"
- Role reads "CTO · CO-FOUNDER"
- Contact stack has two lines (email, website)

- [ ] **Step 5: QR scan test**

Scan each card's back-page QR with an iPhone Camera (or Google Lens on Android). For each:

| Founder | Expected prompt fields |
|---|---|
| Ram | Name: Ramachandran AV · Org: Xentovia · Email: ram@xentovia.ai · Phone: +91 63623 04979 · URL: https://xentovia.ai · Notes: CEO & Co-Founder |
| Rajnee | Name: Rajnee Dubey · Org: Xentovia · Email: rajnee@xentovia.ai · URL: https://xentovia.ai · Notes: COO & Co-Founder (no phone) |
| Santosh | Name: Santosh Kumar · Org: Xentovia · Email: santosh@xentovia.ai · URL: https://xentovia.ai · Notes: CTO & Co-Founder (no phone) |

Tap "Add to Contacts" — the contact app should pre-fill all fields.

- [ ] **Step 6: Page-size verification**

If `pdfinfo` is available:

```bash
for f in print/cards/out/*.pdf; do
  echo "=== $f"
  pdfinfo "$f" | grep -E "Pages|Page size"
done
```

Expected for every file:
```
Pages:           2
Page size:       269.291 x 161.575 pts (= 95mm x 57mm)
```

- [ ] **Step 7: If anything fails, fix it and re-verify**

Common issues:
- **Off-white background missing in PDF** → "Background graphics" was OFF in the Chrome print dialog. Re-render with it ON.
- **Fonts fell back to Times/Helvetica** → `--virtual-time-budget` was too short, or network blocked Google Fonts during the headless render. Bump the budget to `4000` or run from a network with fonts.googleapis.com reachable.
- **QR doesn't scan at 28mm** → unlikely with payload sizes we're using, but bump `.back .qr { width: 32mm; height: 32mm; }` in `cards.css` and re-render.

- [ ] **Step 8: No commit needed for verification, but tell the user**

End-of-turn message to the user:

> Cards ready. Three PDFs in `print/cards/out/`. Open `index.html` in a browser any time you want to tweak content (edit `data.js`) or design (edit `cards.css`), then re-run `./print/cards/render.sh`.

---

## Self-Review

- **Spec coverage:** all sections of `2026-05-23-business-cards-design.md` are covered: dimensions (Task 4), palette and typography (Task 4), front and back layout (Tasks 4 & 5), QR payload (Task 3 & 5), file layout (Tasks 1–7), per-founder selection via `?only=` (Task 5), render flow (Task 6), acceptance criteria (Task 8).
- **Placeholder scan:** no TBDs, "implement later", or vague handwave steps. All code shown literally; all commands shown literally.
- **Type consistency:** function names (`buildMECARD`, `renderQR`, `el`), data field names (`phoneDisplay`, `role`, `location`, `full`, `id`), and CSS class names (`.card-page`, `.card-inner`, `.front`, `.back`, `.crop`, `.glyph`, `.hairline`, `.wordmark`, `.name`, `.role`, `.contact`, `.footer-micro`, `.qr`, `.caption`, `.footer`) are consistent across `data.js`, `qr.js`, `cards.css`, and `index.html`.
- **innerHTML audit:** no `innerHTML` is set anywhere on data paths. The QR renderer uses `createElementNS`; the page renderer uses `createElement` + `textContent` via the `el` helper.
