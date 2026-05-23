# Xentovia Founder Business Cards — Hero Variant

Third design (alongside `../cards/` light editorial and `../cards-dark/`
dark research-lab). Same trim, same MECARD QR, layout-led: the founder's
name takes the front face as a magazine-cover hero, surname italic on a
second indented line. QR moves to the back.

## What this produces

Three PDFs, one per founder, two pages each (front + back):

```
out/
  ramachandran-av.pdf
  rajnee-dubey.pdf
  santosh-kumar.pdf
```

- **Size:** 89 × 51 mm trim, 3 mm bleed (artboard 95 × 57 mm)
- **Front:** cream paper, two-line hero name (first regular / surname italic), gradient hairline, role, two-line contact stack, location bottom-right
- **Back:** centred 30 mm QR, "SCAN TO ADD CONTACT", brand line, legal fine print

## Preview in a browser

```
open index.html               # macOS
xdg-open index.html           # Linux
```

Append `?only=ram` (or `rajnee`, `santosh`) for a single founder.

## Render the PDFs

### Option A — one command, all three (requires Chromium)

```
./render.sh
```

### Option B — manual, via Chrome (no extra install)

1. Open `index.html?only=ram` in Chrome
2. Cmd/Ctrl + P
3. Destination: **Save as PDF**
4. Paper size: **Custom · 95 × 57 mm**
5. Margins: **None**
6. **Background graphics: ON**
7. Save as `out/ramachandran-av.pdf`
8. Repeat for `?only=rajnee` and `?only=santosh`

## Editing

| Change | File |
|---|---|
| Phone, email, name, role | `data.js` |
| Name size, hero layout, palette | `cards.css` |
| Layout structure | `index.html` |
| QR payload (rare) | `qr.js` |

The hero typography rule is: first name on line 1 (regular), surname on
line 2 (italic, indented 8 mm). To change the indent or font size, edit
`.front .name-first` and `.front .name-last` in `cards.css`.

## Relationship to the other variants

| Variant | Folder | Aesthetic |
|---|---|---|
| Light editorial | `../cards/` | Two-column, QR on front-right |
| Hero typography (this) | `../cards-hero/` | Single column, name dominant, QR on back |
| Dark research-lab | `../cards-dark/` | Dark navy paper, iconed contact rows |

`data.js` and `qr.js` are **copies** of `../cards/`'s versions, not
symlinks. If you change phone numbers or emails, update each variant's
`data.js` separately (or `cp` across them).

## Print-shop notes

Same as the light editorial variant: 350 gsm matte uncoated, sRGB OK,
3 mm bleed already included. The hero design has slightly more whitespace
than v1, so print quality differences (paper grain, ink density) are more
visible — request a proof print before the full run.
