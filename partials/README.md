# Shared page chrome and the blog

The site is static HTML with no build step, so the nav and footer used to be
hand-copied into every page — which is how they drifted. A partial find-and-replace
left `xentoscribe/` with a broken navbar and skipped `xentovox/` entirely; the footer
reached seven variants across 19 pages, two of which had no link to the Privacy
Policy, Terms or DPA at all.

Now there is one source of truth for the chrome, and one for each blog post. Edit
these files, never the `<nav>`, `<footer>` or post body inside a page:

| File | What it holds |
|---|---|
| `chrome.config.json` | Site URL, links, the Solutions dropdown, footer columns, the page list, per-page sub-navs |
| `nav.html` | Global navbar (desktop + JS-free `<details>` mobile menu) |
| `subnav.html` | Slim per-product bar rendered under the navbar |
| `footer.html` | Site footer |
| `chrome.css` | `.nav-blur`, `.cta-primary`, mobile-menu, sub-nav and footer rules |
| `blog-post.html` | Blog post page template |
| `../content/blog/*.md` | One file per post: front matter + markdown body |

## Regenerating

```sh
node tools/build-chrome.mjs          # write nav + footer into every page
node tools/build-blog.mjs            # write post pages, /blog/ and sitemap.xml
node tools/build-chrome.mjs --check  # exit 1 if any page is stale (runs in CI)
node tools/build-blog.mjs --check    # exit 1 if any blog output is stale (runs in CI)
```

`build-blog.mjs` imports the rendering half of `build-chrome.mjs`, so a post it
creates already has the current nav and footer in it. Running either script alone
leaves the site consistent.

Both only rewrite the regions between their markers — `nav:start`/`nav:end`,
`footer:start`/`footer:end`, `chrome:start`/`chrome:end`, `posts:start`/`posts:end`
(plus the `has-subnav` class on `<body>`). Everything else is untouched, so pages
stay fully self-contained and GitHub Pages still deploys the repo as-is.

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

## Writing a blog post

Create `content/blog/<slug>.md`. The slug becomes the URL: `/blog/<slug>/`.

```markdown
---
title: The headline, used in the tab, the card and the JSON-LD
description: One or two sentences. Shown under the h1, on the card, and as the meta description.
date: 2026-08-09
tags: [Document Intelligence, Evaluation]
highlight: a phrase from the title to render in the gradient
ctaTitle: Optional — overrides the default closing CTA
ctaText: Optional
ctaLabel: Optional
ctaHref: Optional
---

Body in markdown.
```

`title`, `description` and `date` are required; everything else is optional.
`draft: true` keeps a post out of the build entirely — that is the switch for
staging a release rather than publishing everything at once.

Then run `node tools/build-blog.mjs`. It writes the post page, rebuilds the card
grid and tag filter on `/blog/`, regenerates `sitemap.xml`, and picks the three
related posts at the foot of each page by shared tags. Blog pages do not need an
entry in `chrome.config.json` — `build-chrome.mjs` discovers them on disk.

**Keep tags to the established vocabulary.** The filter chips on `/blog/` are
generated from them, so a one-off tag becomes a chip matching a single post.

**Markdown support** is deliberately small: `##`–`####` headings, paragraphs,
bullet and numbered lists, blockquotes, tables, `---` rules, fenced code, and
inline `**bold**`, `*italic*`, `` `code` `` and `[links](/url)`. Any block starting
with `<` passes through as raw HTML, which is how a post can carry a custom
component without leaving the pipeline.

**`custom: true`** marks a post as hand-built HTML. It is still indexed, related,
sitemapped and given the shared chrome, but `build-blog.mjs` will not overwrite its
page. `vision-agents-for-land-records` uses this: it carries ~190 lines of its own
CSS, a custom hero and scroll animations, and folding it into the template would
destroy the design. Set `readTime` by hand on these, since there is no body to
count.
