# Xentovia Founder Business Cards — Dark Variant

Second design for the founders' visiting cards. Same trim, same QR contract
as `../cards/`, different aesthetic: deep navy paper, cream serif name,
glowing brand mark, iconed contact rows. Print whichever variant you prefer
(or both, depending on the audience).

## What this produces

Three PDFs, one per founder, two pages each (front + back):

```
out/
  ramachandran-av.pdf
  rajnee-dubey.pdf
  santosh-kumar.pdf
```

- **Size:** 89 × 51 mm trim, 3 mm bleed (artboard 95 × 57 mm)
- **Background:** deep navy `#060B18`
- **QR (back):** dark modules on a cream stamp — scans into native
  "Add to Contacts" on iOS / Android, same MECARD payload as the light variant

## Preview in a browser

```
open index.html               # macOS
xdg-open index.html           # Linux
```

Append `?only=ram` (or `rajnee`, `santosh`) to preview just one founder.

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
6. **Background graphics: ON** (mandatory — otherwise the entire dark navy paper colour drops out)
7. Save as `out/ramachandran-av.pdf`
8. Repeat for `?only=rajnee` and `?only=santosh`

## Print-shop notes specific to the dark variant

- **Ink coverage is high.** Recommend 350 gsm matte uncoated stock, same as
  the light variant. Premium presses can use 400 gsm for extra rigidity —
  helps the card feel less flexy with the heavier ink load.
- **Ask the printer for a "rich black" build** (`C40 M30 Y30 K100`) rather
  than `K100` alone. Plain `K100` on matte stock prints slightly thin against
  the cream QR stamp; the rich-black build gives a deeper, more even field.
- **Avoid coated / glossy stock.** The editorial restraint relies on matte
  paper soaking up the ink. Gloss creates fingerprint visibility and fights
  the brand.
- **Optional: soft-touch lamination.** Dark cards show edge wear and finger
  marks more than light cards. A thin soft-touch matte laminate hides both
  without adding shine. Many Indian presses (Printo, Vinsak) offer this as a
  ₹3–6/card add-on.
- **Inspect the cream QR stamp.** It must print sharp-edged, with no halo
  bleed into the surrounding navy. If the proof shows a soft edge, the press
  is misregistered — ask them to tighten before the full run.

## Editing

| Change | File |
|---|---|
| Phone, email, name, role | `data.js` |
| Dark palette, type sizes, spacing | `cards.css` |
| Icon paths or layout | `index.html` (search for `ICONS = {`) |
| QR payload format (rare) | `qr.js` |

Edit, refresh the browser preview, re-render.

## Relationship to the light variant

`data.js` and `qr.js` are **copies** of the files at `../cards/`, not
symlinks. If you change phone numbers or emails, edit both files (or copy
the updated `data.js` across). The variants will likely drift in design
over time — keeping them independent prevents either from breaking the
other.
