# Shared navigation

The site is static HTML with no build step, so the navigation used to be hand-copied
into every page — which is how it drifted (a partial find-and-replace left
`xentoscribe/` with a broken navbar and skipped `xentovox/` entirely).

Now there is one source of truth. Edit these files, never the `<nav>` inside a page:

| File | What it holds |
|---|---|
| `nav.config.json` | Links, the Solutions dropdown, the page list, per-page sub-navs |
| `nav.html` | Global navbar markup (desktop + JS-free `<details>` mobile menu) |
| `subnav.html` | Slim per-product bar rendered under the navbar |
| `nav.css` | `.nav-blur`, `.cta-primary`, mobile-menu and sub-nav rules |

## Regenerating

```sh
node tools/build-nav.mjs          # write the nav into every page
node tools/build-nav.mjs --check  # exit 1 if any page is stale (runs in CI)
```

The script only rewrites the region between the `nav:start` / `nav:end` markers in
each page (plus the `has-subnav` class on `<body>`); everything else is untouched.
Pages remain fully self-contained, so GitHub Pages still deploys the repo as-is.

## Adding a page or a product

- **New page** — paste the marker pair where the nav belongs, add another pair inside
  the page's `<style>` for the CSS, add the path to `pages` in `nav.config.json`, run
  the script.
- **New product** — add an entry to `solutions` in `nav.config.json`. It appears in
  the dropdown on all pages at once.
- **Per-product sub-nav** — add a `subnav` block to that page's entry. Only link to
  anchors that actually exist on the page; the old navbars accumulated dead ones
  (`#outcomes`, `#compliance`, `#demo`).
