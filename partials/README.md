# Shared page chrome

The site is static HTML with no build step, so the nav and footer used to be
hand-copied into every page — which is how they drifted. A partial find-and-replace
left `xentoscribe/` with a broken navbar and skipped `xentovox/` entirely; the footer
reached seven variants across 19 pages, two of which had no link to the Privacy
Policy, Terms or DPA at all.

Now there is one source of truth. Edit these files, never the `<nav>` or `<footer>`
inside a page:

| File | What it holds |
|---|---|
| `chrome.config.json` | Links, the Solutions dropdown, footer columns, the page list, per-page sub-navs |
| `nav.html` | Global navbar (desktop + JS-free `<details>` mobile menu) |
| `subnav.html` | Slim per-product bar rendered under the navbar |
| `footer.html` | Site footer |
| `chrome.css` | `.nav-blur`, `.cta-primary`, mobile-menu, sub-nav and footer rules |

## Regenerating

```sh
node tools/build-chrome.mjs          # write nav + footer into every page
node tools/build-chrome.mjs --check  # exit 1 if any page is stale (runs in CI)
```

The script only rewrites the regions between the `nav:start`/`nav:end`,
`footer:start`/`footer:end` and `chrome:start`/`chrome:end` markers (plus the
`has-subnav` class on `<body>`); everything else is untouched. Pages stay fully
self-contained, so GitHub Pages still deploys the repo as-is.

## Adding a page or a product

- **New page** — paste the three marker pairs where the nav, footer and CSS belong,
  add the path to `pages` in `chrome.config.json`, run the script.
- **New product** — add an entry to `solutions`. It appears in the nav dropdown *and*
  the footer's Solutions column on every page at once. `group` (`Products` /
  `By Industry`) prints a heading whenever it changes, so keep entries of the same
  group adjacent.
- **Per-product sub-nav** — add a `subnav` block to that page's entry. Only link to
  anchors that actually exist on the page; the old navbars accumulated dead ones
  (`#outcomes`, `#compliance`, `#demo`, and the footer's `/#about`).

Page-local section links belong in the sub-nav, not the footer — the footer is
identical everywhere by design.
