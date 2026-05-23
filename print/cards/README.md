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
