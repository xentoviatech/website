# PGA Copilot Solutions Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the new `/solutions/pga-copilot/index.html` page and the home-page changes that lead with PGA Copilot, exactly per the design spec at `docs/superpowers/specs/2026-05-07-pga-copilot-solutions-page-design.md`.

**Architecture:** Static HTML page using the same Tailwind CDN + Inter + lucide setup as `/solutions/customs-trade/`. New page reuses the existing visual chrome (glow orbs, glass cards, bento-card hover, nav, footer, `animate-on-scroll` IntersectionObserver pattern), and adds three page-unique pieces: an approval-stamp SVG motif, a count-up animation helper, and an SVG draw-line animation for the broker-zone/agent-zone section. Home page edits are surgical: hero rewrite + solutions grid reorder. No build step. No new dependencies.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Inter (Google Fonts), lucide icons (CDN), vanilla JS (IntersectionObserver), Playwright (verification only).

**Disclosure rules** (load-bearing — see spec §3): no agent design, model names, pipeline tech, agent counts, or "five agents/orchestrator" phrasing on the public page. Words to avoid: "submit", "file", "customs business" (describing what the system does); "replaces your filer"; ROI claims without "pre-pilot estimate" caveat.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `solutions/pga-copilot/index.html` | **CREATE** | The full new page. ~900 lines of self-contained HTML (head, nav, hero, 6 content sections, CTA band, footer, inline `<style>`, inline `<script>`). |
| `index.html` | **MODIFY** | Hero rewrite (lines ~600–~700 in current file) + solutions grid reorder (lines ~709–~830). |
| `solutions/customs-trade/index.html` | **MODIFY** | Add a single banner callout near the top of the page body, after the hero. |

No new asset files — the approval-stamp graphic is inline SVG.

---

## Verification approach

This is a static page with no test framework. "Verification" per task means:

- **Browser visual check:** open the local page (`file://` or `python -m http.server`) and confirm the section renders.
- **Playwright snapshot:** for sections with animations, use the `mcp__plugin_playwright_playwright__browser_*` tools to navigate, scroll to the section, wait for animation, and take a screenshot.
- **Reduced-motion check:** set `prefers-reduced-motion: reduce` via DevTools / Playwright emulation and re-verify.
- **Console clean:** no errors in the browser console at any point.

The implementer should keep `python3 -m http.server 8765` running in the project root (`/home/santosh/projects/experiments/xentovia`) and reload `http://localhost:8765/solutions/pga-copilot/` between steps.

---

## Task 1: Page scaffold (head, nav, body shell, footer)

**Files:**
- Create: `solutions/pga-copilot/index.html`

Copy the customs-trade page as a starting point, swap the meta tags, nav (unchanged), footer (unchanged), and leave a single placeholder `<main>` we will fill in later tasks.

- [ ] **Step 1: Copy customs-trade as the starting point**

```bash
mkdir -p solutions/pga-copilot
cp solutions/customs-trade/index.html solutions/pga-copilot/index.html
```

- [ ] **Step 2: Replace the meta + title + Open Graph block**

Edit `solutions/pga-copilot/index.html` lines 6–14 to:

```html
  <title>PGA Copilot — AI for FDA, EPA, and Lacey filings | Xentovia</title>
  <meta name="description" content="PGA Copilot pre-fills FDA Prior Notice, EPA TSCA §13, and Lacey PPQ-505 forms with citations and confidence scores. Built for licensed customs brokers, below the CBP HQ H350722 line.">

  <!-- Open Graph -->
  <meta property="og:title" content="PGA Copilot — AI for FDA, EPA, and Lacey filings | Xentovia">
  <meta property="og:description" content="AI copilot for US customs brokers. Pre-fills PGA forms with citations and confidence; the broker reviews and approves every field. Below the CBP HQ H350722 line.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://xentovia.ai/solutions/pga-copilot/">
  <meta property="og:image" content="https://xentovia.ai/favicon.png">
```

- [ ] **Step 3: Empty the `<main>` content area**

In the copied file, delete every `<section>` inside `<main class="relative z-10">…</main>`, but keep the opening `<main class="relative z-10">` and closing `</main>` tags. Keep the `<!-- Background Effects -->` glow-orb divs and the `<nav>` and the `<footer>` exactly as they are. Body should now have nav + empty main + footer.

- [ ] **Step 4: Verify the scaffold loads**

```bash
# In the project root, in a separate terminal:
python3 -m http.server 8765
```

Open `http://localhost:8765/solutions/pga-copilot/` in a browser. Confirm:
- Page title is "PGA Copilot — AI for FDA, EPA, and Lacey filings | Xentovia"
- Nav renders (logo, links, "Book a Demo" CTA)
- Footer renders
- Browser console has zero errors
- Background glow orbs visible

- [ ] **Step 5: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add scaffold for /solutions/pga-copilot/"
```

---

## Task 2: Page-unique CSS + JS helpers

**Files:**
- Modify: `solutions/pga-copilot/index.html`

Append three additions to the existing inline `<style>` and inline `<script>` blocks: approval-stamp visual + animation, count-up helper, draw-line helper, and `prefers-reduced-motion` guard.

- [ ] **Step 1: Add approval-stamp CSS**

Inside the existing `<style>` block, **after** the `.section-divider` rule (line ~197 of the source customs-trade page, now in the copied pga-copilot file), append:

```css
    /* Approval-stamp motif — page-unique to PGA Copilot */
    .stamp {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0.5rem 1rem;
      border: 2px solid rgba(220, 38, 38, 0.65);
      color: rgba(252, 165, 165, 0.95);
      font-family: 'Inter', system-ui, sans-serif;
      font-weight: 800; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
      border-radius: 4px;
      transform: rotate(-6deg);
      background: rgba(127, 29, 29, 0.08);
      box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.15);
      opacity: 0;
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      will-change: transform, opacity;
    }
    .stamp.visible {
      opacity: 0.92;
      animation: stampIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    @keyframes stampIn {
      0%   { opacity: 0; transform: rotate(0deg) scale(1.6); }
      60%  { opacity: 1; transform: rotate(-8deg) scale(0.94); }
      100% { opacity: 0.92; transform: rotate(-6deg) scale(1); }
    }

    /* Hover-revealed stamp inside the outcomes button-mockup */
    .stamp-hover {
      opacity: 0;
      transform: rotate(0deg) scale(1.5);
      transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .stamp-hover-trigger:hover .stamp-hover,
    .stamp-hover-trigger:focus-within .stamp-hover {
      opacity: 0.92;
      transform: rotate(-6deg) scale(1);
    }

    /* Compliance-line + zone chips */
    .compliance-line {
      stroke: rgba(129, 140, 248, 0.55);
      stroke-width: 2;
      stroke-dasharray: 1200;
      stroke-dashoffset: 1200;
      transition: stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .compliance-line.visible { stroke-dashoffset: 0; }
    .zone-chip {
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
    .zone-chip.visible { opacity: 1; transform: translateY(0); }

    /* Count-up reserves space so layout doesn't shift */
    .count-up { font-variant-numeric: tabular-nums; display: inline-block; }

    /* Reduced-motion: collapse all animations to instant fades */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }
      .compliance-line { stroke-dashoffset: 0 !important; }
      .stamp { opacity: 0.92 !important; transform: rotate(-6deg); }
      .glow-orb { animation: none !important; }
    }
```

- [ ] **Step 2: Add count-up + draw-line + stamp JS helpers**

The customs-trade page has an existing IntersectionObserver-based reveal at the bottom of the `<script>` block. Find it (look for `IntersectionObserver` or `animate-on-scroll`) and append, **before the closing `</script>` tag**:

```javascript
    // Count-up: reads data-target on a .count-up element and ticks to that value once visible.
    function runCountUp(el) {
      const target = parseFloat(el.dataset.target || '0');
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = parseInt(el.dataset.duration || '1400', 10);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = (target * eased).toFixed(decimals);
        el.textContent = value + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const oneShotObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('count-up') && !el.dataset.done) {
          el.dataset.done = '1';
          if (reduceMotion) {
            const t = parseFloat(el.dataset.target || '0');
            const d = parseInt(el.dataset.decimals || '0', 10);
            el.textContent = t.toFixed(d) + (el.dataset.suffix || '');
          } else {
            runCountUp(el);
          }
        }
        if (el.classList.contains('compliance-line')) {
          el.classList.add('visible');
        }
        if (el.classList.contains('stamp')) {
          el.classList.add('visible');
        }
        if (el.classList.contains('zone-chip')) {
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('visible'), reduceMotion ? 0 : delay);
        }
        oneShotObserver.unobserve(el);
      });
    }, { threshold: 0.35 });

    document.querySelectorAll('.count-up, .compliance-line, .stamp, .zone-chip')
      .forEach((el) => oneShotObserver.observe(el));
```

- [ ] **Step 3: Verify the helpers do not break the empty page**

Reload `http://localhost:8765/solutions/pga-copilot/`. Confirm:
- Page still renders (nav + empty main + footer)
- Browser console has zero errors
- No visible regressions

- [ ] **Step 4: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Wire approval-stamp, count-up, and compliance-line helpers"
```

---

## Task 3: Hero section

**Files:**
- Modify: `solutions/pga-copilot/index.html`

- [ ] **Step 1: Insert the hero section**

Inside `<main class="relative z-10">`, paste:

```html
    <!-- Hero -->
    <section class="grid-bg relative min-h-[80vh] flex items-center pt-16">
      <div class="max-w-7xl mx-auto px-6 py-24 lg:py-32 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div class="animate-on-scroll inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 mb-8">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              For NCBFAA-member broker firms
            </div>
            <h1 class="animate-on-scroll text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.06] mb-6">
              <span class="text-white">PGA Copilot pre-fills</span><br>
              <span class="text-white">your forms.</span>
              <span class="gradient-text">You decide.</span>
            </h1>
            <p class="animate-on-scroll text-lg sm:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed font-light">
              AI copilot for FDA Prior Notice, EPA TSCA §13, and Lacey PPQ-505 &mdash;
              built for licensed customs brokers, below the CBP HQ H350722 line.
            </p>
            <div class="animate-on-scroll flex flex-col sm:flex-row items-start gap-4">
              <a href="mailto:sales@xentovia.ai?subject=PGA%20Copilot%20demo%20request" class="cta-primary px-8 py-3.5 rounded-xl text-base font-semibold text-white w-full sm:w-auto">
                <span class="flex items-center justify-center gap-2">Book a 30-min demo <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
              </a>
              <a href="#below-the-line" class="group px-8 py-3.5 rounded-xl text-base font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
                See how it stays below H350722
              </a>
            </div>
          </div>

          <div class="relative animate-on-scroll">
            <!-- Illustrative form-field mockup (NOT a screenshot of the live product UI) -->
            <div class="bento-card glass rounded-2xl p-6 lg:p-7 relative">
              <div class="flex items-center justify-between mb-5">
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest">FDA Prior Notice &mdash; illustrative</p>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                  <i data-lucide="check-circle-2" class="w-3 h-3"></i> 97% confidence
                </span>
              </div>
              <div class="space-y-3 mb-6">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-slate-500 font-mono text-xs uppercase tracking-wider">Article code</span>
                  <span class="text-slate-100 font-mono">16FBE03</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-slate-500 font-mono text-xs uppercase tracking-wider">Mfr registration</span>
                  <span class="text-slate-100 font-mono">10412***42</span>
                </div>
                <div class="flex justify-between items-start text-sm">
                  <span class="text-slate-500 font-mono text-xs uppercase tracking-wider mt-0.5">Cited rule</span>
                  <span class="text-indigo-300 text-right">21 CFR 1.281<br><span class="text-[11px] text-slate-500">snapshot 2026-04-22</span></span>
                </div>
              </div>
              <div class="border-t border-white/5 pt-5 flex items-center justify-between">
                <span class="text-xs text-slate-500">Broker decides every field</span>
                <button type="button" class="cta-primary px-4 py-2 rounded-lg text-xs font-semibold text-white pointer-events-none">
                  <span class="flex items-center gap-1.5">Review &amp; approve for export <i data-lucide="arrow-right" class="w-3 h-3"></i></span>
                </button>
              </div>
              <div class="stamp absolute -top-3 -right-3" data-delay="600">
                Approved &times; broker
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify the hero**

Reload `http://localhost:8765/solutions/pga-copilot/`. Confirm:

- Headline reads "PGA Copilot pre-fills your forms. You decide." with "You decide." in gradient color.
- Subhead names FDA Prior Notice, EPA TSCA §13, Lacey PPQ-505 and references CBP HQ H350722.
- "Book a 30-min demo" button is the gradient primary CTA, links to `mailto:sales@xentovia.ai?…`.
- "See how it stays below H350722" anchors to `#below-the-line`.
- The illustrative form-field card on the right shows: 97% confidence chip, article code, mfr registration, citation `21 CFR 1.281` (snapshot 2026-04-22), `Review & approve for export` button mockup.
- The red `Approved × broker` stamp appears in the top-right of the form card a moment after page load (one-shot animation).
- Console clean.

Use Playwright if available:

```
mcp__plugin_playwright_playwright__browser_navigate → http://localhost:8765/solutions/pga-copilot/
mcp__plugin_playwright_playwright__browser_take_screenshot → save /tmp/pga-hero.png, fullPage: false
```

- [ ] **Step 3: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add PGA Copilot hero with mockup card and approval stamp"
```

---

## Task 4: "Why now" — three regulatory triggers

**Files:**
- Modify: `solutions/pga-copilot/index.html`

- [ ] **Step 1: Insert the section**

Append inside `<main>`, after the hero:

```html
    <!-- Why now -->
    <section class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Why now</p>
          <h2 class="animate-on-scroll text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Three rules tightened. <span class="gradient-text">One quarter.</span>
          </h2>
          <p class="animate-on-scroll text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            None of them were about AI. All three changed how a formal entry has to look in 2026 &mdash; and the math on PGA filings.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <!-- Card 1: H350722 -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7">
            <div class="icon-box mb-5"><i data-lucide="gavel" class="w-5 h-5 text-indigo-400"></i></div>
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-2">CBP HQ H350722 &middot; Jan 2026</p>
            <h3 class="text-lg font-bold text-white mb-3">The line was drawn on AI in customs</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              Unlicensed AI may classify HS only to the 6-digit international level. An unlicensed entity cannot decide what data appears on an entry. Most tools predate the ruling.
            </p>
            <div class="text-3xl font-black text-white">
              <span class="count-up" data-target="6" data-suffix="-digit ceiling">0</span>
            </div>
          </div>
          <!-- Card 2: §321 de minimis -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7">
            <div class="icon-box mb-5"><i data-lucide="package" class="w-5 h-5 text-sky-400"></i></div>
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-2">End of §321 de minimis</p>
            <h3 class="text-lg font-bold text-white mb-3">Formal entry volume exploded</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              ~4.2B packages/year that came in duty-free now need formal entries. Many of them flag PGAs they didn't a year ago.
            </p>
            <div class="text-3xl font-black text-white">
              <span class="count-up" data-target="4.2" data-decimals="1" data-suffix="B packages/yr">0</span>
            </div>
          </div>
          <!-- Card 3: Lacey paper cutoff -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7">
            <div class="icon-box mb-5"><i data-lucide="leaf" class="w-5 h-5 text-emerald-400"></i></div>
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-2">Lacey PPQ-505 paper cutoff &middot; Jan 1, 2026</p>
            <h3 class="text-lg font-bold text-white mb-3">Paper PPQ-505 stopped being accepted</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              Filers must use ACE or APHIS LAWGS. Lacey Phase VII expanded scope at the same time &mdash; furniture, essential oils, sporting goods, housewares.
            </p>
            <div class="text-3xl font-black text-white">
              <span class="count-up" data-target="0" data-suffix=" paper accepted">0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify the section**

Reload, scroll to the section, confirm:

- Three cards laid out 3-col on desktop, stacked on mobile.
- Big numbers tick up once when each card enters viewport: 6-digit ceiling, 4.2B packages/yr, 0 paper accepted.
- Each card has its lucide icon (gavel · package · leaf).
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add 'Why now' section with three regulatory-trigger cards"
```

---

## Task 5: "What it does" — three input → output cards

**Files:**
- Modify: `solutions/pga-copilot/index.html`

- [ ] **Step 1: Insert the section**

Append inside `<main>`, after "Why now":

```html
    <!-- What it does -->
    <section class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">What it does</p>
          <h2 class="animate-on-scroll text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Three agencies in v1. <span class="gradient-text">The ones whose rules just changed.</span>
          </h2>
          <p class="animate-on-scroll text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Every field comes with a citation. Every field comes with a confidence score. Every field is yours to override.
          </p>
        </div>

        <div class="space-y-6 lg:space-y-8 max-w-5xl mx-auto">

          <!-- FDA Prior Notice -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 lg:p-9">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">FDA Prior Notice &middot; food</p>
            <h3 class="text-xl lg:text-2xl font-bold text-white mb-5">Filed via ABI/ACE/ITDS or FDA PNSI &mdash; pre-filled, you approve.</h3>
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
              <div>
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Input</p>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Commercial invoice</li>
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Packing list</li>
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Manufacturer registration</li>
                </ul>
              </div>
              <div class="flex md:flex-col items-center gap-2">
                <i data-lucide="arrow-right" class="w-5 h-5 text-indigo-400 hidden md:block"></i>
                <i data-lucide="arrow-down" class="w-5 h-5 text-indigo-400 md:hidden"></i>
              </div>
              <div>
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Output</p>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> Filled Prior Notice fields (JSON)</li>
                  <li class="flex items-center gap-2"><i data-lucide="link-2" class="w-4 h-4 text-indigo-400"></i> Citation per field (e.g., 21 CFR 1.281)</li>
                  <li class="flex items-center gap-2"><i data-lucide="gauge" class="w-4 h-4 text-sky-400"></i> Confidence chip per field</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- EPA TSCA §13 -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 lg:p-9">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">EPA TSCA §13 &middot; chemicals/polymers</p>
            <h3 class="text-xl lg:text-2xl font-bold text-white mb-5">Positive or negative TSCA §13 statement &mdash; with the docs to back it.</h3>
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
              <div>
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Input</p>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Commercial invoice</li>
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> SDS / MSDS</li>
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Certificate of analysis</li>
                </ul>
              </div>
              <div class="flex md:flex-col items-center gap-2">
                <i data-lucide="arrow-right" class="w-5 h-5 text-indigo-400 hidden md:block"></i>
                <i data-lucide="arrow-down" class="w-5 h-5 text-indigo-400 md:hidden"></i>
              </div>
              <div>
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Output</p>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> TSCA §13 import certification (positive/negative)</li>
                  <li class="flex items-center gap-2"><i data-lucide="link-2" class="w-4 h-4 text-indigo-400"></i> Citation to 15 USC §2612 + relevant TSCA §§5/6/7</li>
                  <li class="flex items-center gap-2"><i data-lucide="gauge" class="w-4 h-4 text-sky-400"></i> Confidence chip per field</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Lacey PPQ-505 -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 lg:p-9">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Lacey PPQ-505 &middot; wood / plant products</p>
            <h3 class="text-xl lg:text-2xl font-bold text-white mb-5">Species, genus, country of harvest &mdash; pre-filled, citation per claim.</h3>
            <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
              <div>
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Input</p>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Commercial invoice</li>
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Packing list</li>
                  <li class="flex items-center gap-2"><i data-lucide="file-text" class="w-4 h-4 text-sky-400"></i> Product spec sheet</li>
                </ul>
              </div>
              <div class="flex md:flex-col items-center gap-2">
                <i data-lucide="arrow-right" class="w-5 h-5 text-indigo-400 hidden md:block"></i>
                <i data-lucide="arrow-down" class="w-5 h-5 text-indigo-400 md:hidden"></i>
              </div>
              <div>
                <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Output</p>
                <ul class="space-y-2 text-sm text-slate-300">
                  <li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i> PPQ-505 declaration (ACE / LAWGS)</li>
                  <li class="flex items-center gap-2"><i data-lucide="link-2" class="w-4 h-4 text-indigo-400"></i> Citation to 16 USC §3372 + Phase VII scope</li>
                  <li class="flex items-center gap-2"><i data-lucide="gauge" class="w-4 h-4 text-sky-400"></i> Confidence chip per field</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

Reload, scroll to the section. Confirm:

- Three stacked cards labeled FDA Prior Notice, EPA TSCA §13, Lacey PPQ-505.
- Each card shows three input items, an arrow, three output items.
- All icons render (lucide).
- On smaller screens, the three columns stack vertically with a down-arrow.
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add 'What it does' section with three input/output cards"
```

---

## Task 6: "The line we don't cross" — broker zone / agent zone signature

**Files:**
- Modify: `solutions/pga-copilot/index.html`

- [ ] **Step 1: Insert the section**

Append inside `<main>`, after "What it does":

```html
    <!-- The line we don't cross — broker zone / agent zone -->
    <section id="below-the-line" class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">The line we don't cross</p>
          <h2 class="animate-on-scroll text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            <span class="text-white">Above the line, you decide.</span><br>
            <span class="gradient-text">Below the line, we suggest.</span>
          </h2>
        </div>

        <div class="animate-on-scroll bento-card glass rounded-2xl p-8 lg:p-12 max-w-5xl mx-auto relative">
          <!-- Above the line -->
          <div class="mb-10">
            <p class="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-4">Broker zone &middot; you</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="zone-chip glass rounded-xl px-4 py-3 text-sm text-slate-200" data-delay="600">
                <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400 inline mr-2"></i>
                Decide what data appears on the entry
              </div>
              <div class="zone-chip glass rounded-xl px-4 py-3 text-sm text-slate-200" data-delay="900">
                <i data-lucide="hash" class="w-4 h-4 text-emerald-400 inline mr-2"></i>
                Derive 8/10-digit HTSUS subheadings
              </div>
              <div class="zone-chip glass rounded-xl px-4 py-3 text-sm text-slate-200" data-delay="1200">
                <i data-lucide="badge-check" class="w-4 h-4 text-emerald-400 inline mr-2"></i>
                Sign and submit via ABI
              </div>
            </div>
          </div>

          <!-- The compliance line -->
          <div class="relative h-12 mb-10">
            <svg viewBox="0 0 1200 48" preserveAspectRatio="none" class="absolute inset-0 w-full h-full">
              <line class="compliance-line" x1="0" y1="24" x2="1200" y2="24" />
            </svg>
            <span class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-space-950 text-[11px] font-mono text-indigo-300 uppercase tracking-widest border border-indigo-500/30">
              CBP HQ H350722
            </span>
          </div>

          <!-- Below the line -->
          <div>
            <p class="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-4">Agent zone &middot; copilot</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="zone-chip glass rounded-xl px-4 py-3 text-sm text-slate-200" data-delay="1500">
                <i data-lucide="file-search" class="w-4 h-4 text-indigo-400 inline mr-2"></i>
                Parse documents and suggest fields
              </div>
              <div class="zone-chip glass rounded-xl px-4 py-3 text-sm text-slate-200" data-delay="1800">
                <i data-lucide="link-2" class="w-4 h-4 text-indigo-400 inline mr-2"></i>
                Cite regulations alongside every suggestion
              </div>
              <div class="zone-chip glass rounded-xl px-4 py-3 text-sm text-slate-200" data-delay="2100">
                <i data-lucide="hash" class="w-4 h-4 text-indigo-400 inline mr-2"></i>
                Classify HS to the 6-digit international ceiling
              </div>
            </div>
          </div>
        </div>

        <p class="animate-on-scroll text-center text-base lg:text-lg italic text-slate-400 max-w-3xl mx-auto mt-10 leading-relaxed">
          &ldquo;An unlicensed entity cannot decide what data appears on an entry.&rdquo;
          <br>
          <span class="not-italic text-sm text-slate-500">&mdash; CBP HQ H350722, January 2026</span>
        </p>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

Reload. Scroll to the broker-zone / agent-zone section. Confirm:

- The horizontal compliance line draws in left-to-right (~1.5s) when section enters viewport.
- "Broker zone · you" appears above the line, three chips fade in sequentially (decide / derive 8-10-digit HTSUS / sign and submit via ABI).
- "Agent zone · copilot" appears below the line, three chips fade in sequentially (parse / cite / classify HS to 6-digit).
- Pull-quote with H350722 attribution sits below the visualization.
- Hero secondary CTA ("See how it stays below H350722") successfully scrolls here on click.
- Console clean.

Use Playwright to verify the animation triggers properly:

```
mcp__plugin_playwright_playwright__browser_navigate → http://localhost:8765/solutions/pga-copilot/#below-the-line
mcp__plugin_playwright_playwright__browser_wait_for → time: 3
mcp__plugin_playwright_playwright__browser_take_screenshot → /tmp/pga-below-line.png
```

- [ ] **Step 3: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add broker-zone/agent-zone signature visualization"
```

---

## Task 7: Outcomes strip

**Files:**
- Modify: `solutions/pga-copilot/index.html`

- [ ] **Step 1: Insert the section**

Append inside `<main>`, after the broker-zone section:

```html
    <!-- Outcomes -->
    <section class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Outcomes</p>
          <h2 class="animate-on-scroll text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            What it's worth to your firm.
          </h2>
          <p class="animate-on-scroll text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Pre-pilot estimates &mdash; replaced with your firm's numbers after a 50-case pilot.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div class="animate-on-scroll bento-card glass rounded-2xl p-6 text-center">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">FDA Prior Notice</p>
            <p class="text-4xl font-black text-white mb-2">
              <span class="count-up" data-target="38" data-suffix=" min">0</span>
            </p>
            <p class="text-xs text-slate-400 mb-3">manual today</p>
            <div class="border-t border-white/5 pt-3">
              <p class="text-2xl font-black gradient-text mb-1">
                <span class="count-up" data-target="4" data-suffix=" min">0</span>
              </p>
              <p class="text-xs text-slate-400">assisted *</p>
            </div>
          </div>
          <div class="animate-on-scroll bento-card glass rounded-2xl p-6 text-center">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Audit prep per case</p>
            <p class="text-4xl font-black text-white mb-2">hours</p>
            <p class="text-xs text-slate-400 mb-3">manual today</p>
            <div class="border-t border-white/5 pt-3">
              <p class="text-2xl font-black gradient-text mb-1">seconds</p>
              <p class="text-xs text-slate-400">assisted *</p>
            </div>
          </div>
          <div class="animate-on-scroll bento-card glass rounded-2xl p-6 text-center">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Fields cited</p>
            <p class="text-4xl font-black gradient-text mb-2">every one</p>
            <p class="text-xs text-slate-400">CFR / USC reference per field, with snapshot date</p>
          </div>
          <div class="animate-on-scroll bento-card glass rounded-2xl p-6 text-center">
            <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">Fields overridable</p>
            <p class="text-4xl font-black gradient-text mb-2">every one</p>
            <p class="text-xs text-slate-400">Suggestion + decision + exported value all recorded</p>
          </div>
        </div>

        <!-- Button-mockup with hover-revealed approval stamp -->
        <div class="animate-on-scroll max-w-3xl mx-auto stamp-hover-trigger relative">
          <div class="bento-card glass rounded-2xl p-7 lg:p-8">
            <div class="flex items-center justify-between mb-5">
              <p class="text-[11px] font-mono text-slate-500 uppercase tracking-widest">FDA Prior Notice &middot; field 12 of 14 &middot; illustrative</p>
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                <i data-lucide="check-circle-2" class="w-3 h-3"></i> 99% confidence
              </span>
            </div>
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-500 font-mono text-xs uppercase tracking-wider">Country of production</span>
                <span class="text-slate-100 font-mono">JP</span>
              </div>
              <div class="flex justify-between items-start text-sm">
                <span class="text-slate-500 font-mono text-xs uppercase tracking-wider mt-0.5">Cited rule</span>
                <span class="text-indigo-300 text-right">21 CFR 1.281(a)(5)<br><span class="text-[11px] text-slate-500">snapshot 2026-04-22</span></span>
              </div>
            </div>
            <div class="border-t border-white/5 pt-5 flex items-center justify-between">
              <span class="text-xs text-slate-500">Hover to approve</span>
              <button type="button" class="cta-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-white">
                <span class="flex items-center gap-1.5">Review &amp; approve for export <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
              </button>
            </div>
          </div>
          <span class="stamp stamp-hover absolute -top-3 -right-3">Approved &times; broker</span>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

Reload, scroll to outcomes. Confirm:

- Four stat cards: 38 min → 4 min FDA, hours → seconds audit, "every one" cited, "every one" overridable.
- Numbers count up once when each card enters viewport.
- "Pre-pilot estimate" caveat is present under each time card and as a closing line.
- Below the four stat cards: a single button-mockup card showing field 12, "Review & approve for export" button.
- On hover anywhere on that mockup card, a red `Approved × broker` stamp appears in the top-right corner with a small bounce. Removing the cursor reverts.
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add outcomes strip with pre-pilot caveat preserved"
```

---

## Task 8: "Who this is for" + CTA band + footer reuse

**Files:**
- Modify: `solutions/pga-copilot/index.html`

- [ ] **Step 1: Insert the two sections**

Append inside `<main>`, after outcomes:

```html
    <!-- Who this is for -->
    <section class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Who this is for</p>
          <h2 class="animate-on-scroll text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
            Built for licensed brokers. <span class="gradient-text">Run by you.</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7">
            <div class="icon-box mb-5"><i data-lucide="building-2" class="w-5 h-5 text-indigo-400"></i></div>
            <h3 class="text-lg font-bold text-white mb-3">Broker firms</h3>
            <p class="text-sm text-slate-400 leading-relaxed">NCBFAA-member, small / mid-tier firms feeling the post-de-minimis volume and the H350722 line.</p>
          </div>
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7">
            <div class="icon-box mb-5"><i data-lucide="user-check" class="w-5 h-5 text-sky-400"></i></div>
            <h3 class="text-lg font-bold text-white mb-3">Senior filers</h3>
            <p class="text-sm text-slate-400 leading-relaxed">The people who actually do the PGA work today &mdash; and want every suggestion to come with a citation they can defend.</p>
          </div>
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7">
            <div class="icon-box mb-5"><i data-lucide="scale" class="w-5 h-5 text-emerald-400"></i></div>
            <h3 class="text-lg font-bold text-white mb-3">Trade-compliance leads</h3>
            <p class="text-sm text-slate-400 leading-relaxed">At brokerages and importer firms &mdash; the people who own the audit trail and have to explain it.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="relative py-24 lg:py-32">
      <div class="max-w-5xl mx-auto px-6">
        <div class="animate-on-scroll bento-card glass rounded-3xl p-10 lg:p-14 relative overflow-hidden">
          <div class="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
            <div class="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
            <div class="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-violet-500/20 blur-3xl"></div>
          </div>
          <div class="stamp absolute top-6 right-6 hidden sm:inline-flex" data-delay="400">Approved &times; broker</div>

          <div class="relative">
            <p class="text-[11px] font-mono text-indigo-400 uppercase tracking-widest mb-4">The ask</p>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Bring your senior filer. <br class="hidden sm:block">
              <span class="gradient-text">We'll run two of your real shipments.</span>
            </h2>
            <p class="text-lg text-slate-300 mb-10 leading-relaxed max-w-3xl">
              30-minute deep demo. We pre-fill two of your real shipments through the copilot &mdash; you grade the suggestions. If it makes sense, a 50-case pilot is free.
            </p>
            <div class="flex flex-col sm:flex-row items-start gap-4">
              <a href="mailto:sales@xentovia.ai?subject=PGA%20Copilot%20demo%20request" class="cta-primary px-8 py-3.5 rounded-xl text-base font-semibold text-white w-full sm:w-auto">
                <span class="flex items-center justify-center gap-2"><i data-lucide="mail" class="w-4 h-4"></i> Email sales@xentovia.ai</span>
              </a>
              <a href="/#contact" class="group px-8 py-3.5 rounded-xl text-base font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                <i data-lucide="message-circle" class="w-4 h-4 text-indigo-400 group-hover:text-indigo-300"></i>
                Or use the contact form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

Reload, scroll through the bottom of the page. Confirm:

- "Who this is for" shows three persona cards.
- "The ask" CTA band shows headline, subhead, two buttons.
- Approval stamp animates in the top-right of the CTA band.
- `mailto:` link opens the user's mail client with prefilled subject.
- Page footer (already present from scaffold) renders.
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add solutions/pga-copilot/index.html
git commit -m "Add 'Who this is for' and CTA band with pilot offer"
```

---

## Task 9: Home page hero rewrite + solutions grid reorder

**Files:**
- Modify: `index.html`

The home page currently leads with a horizontal AI-for-regulated-industries hero, and the solutions grid has customs-trade as #1. Both change.

- [ ] **Step 1: Locate the existing hero**

Run:

```bash
grep -n 'class="grid-bg' index.html
```

Note the line range of the first hero `<section>` after the nav.

- [ ] **Step 2: Rewrite the hero copy**

Replace the existing hero `<h1>`, subhead `<p>`, and primary/secondary CTA block. The new hero block (only the inner copy changes — keep the `<section>` wrapper, classes, and any animation hooks):

```html
          <h1 class="animate-on-scroll text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.06] mb-6">
            <span class="text-white">PGA Copilot &mdash;</span><br>
            <span class="gradient-text">AI for FDA, EPA, and Lacey filings.</span><br>
            <span class="text-white">Built below the H350722 line.</span>
          </h1>
          <p class="animate-on-scroll text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We pre-fill the forms with citations and confidence. The licensed broker reviews and approves every field. Below the CBP HQ H350722 line, by design.
          </p>
          <div class="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:sales@xentovia.ai?subject=PGA%20Copilot%20demo%20request" class="cta-primary px-8 py-3.5 rounded-xl text-base font-semibold text-white w-full sm:w-auto">
              <span class="flex items-center justify-center gap-2">Book a 30-min demo <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
            </a>
            <a href="/solutions/pga-copilot/" class="group px-8 py-3.5 rounded-xl text-base font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <i data-lucide="arrow-right" class="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
              See PGA Copilot
            </a>
          </div>
          <p class="animate-on-scroll text-sm text-slate-500 mt-8 max-w-2xl mx-auto">
            We also build agentic AI for healthcare, insurance, mortgage, and manufacturing &mdash; <a href="#solutions" class="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline">see all solutions</a>.
          </p>
```

If the existing hero has a sub-eyebrow, "watch demo" link, or other copy you removed, leave them removed — keep only the H1, sub, two CTAs, and the broader-surface line above.

- [ ] **Step 3: Reorder the solutions bento grid**

Locate the bento grid (search for `/solutions/customs-trade/` and look for the grid above it). The current order is `customs-trade` (lines ~709), `insurance` (~734), `healthcare` (~759), `mortgage` (~784), `manufacturing` (~809). New order:

1. PGA Copilot (NEW card)
2. Customs & Trade
3. Insurance
4. Healthcare
5. Mortgage
6. Manufacturing

Add the PGA Copilot card immediately before the existing customs-trade card, using the same pattern as customs-trade (same outer classes, same internal structure). Card content:

```html
        <!-- PGA Copilot — flagship -->
        <a href="/solutions/pga-copilot/" class="animate-on-scroll bento-card glass rounded-2xl p-7 group block no-underline relative ring-1 ring-indigo-500/30 hover:ring-indigo-400/60 transition-all">
          <span class="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono uppercase tracking-widest">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Now shipping
          </span>
          <div class="icon-box mb-5"><i data-lucide="shield-check" class="w-5 h-5 text-indigo-400"></i></div>
          <h3 class="text-lg font-bold text-white mb-3">PGA Copilot</h3>
          <p class="text-sm text-slate-400 leading-relaxed mb-4">
            AI for FDA Prior Notice, EPA TSCA §13, and Lacey PPQ-505. Pre-filled, citation per field, confidence per field. Below the CBP HQ H350722 line.
          </p>
          <span class="text-indigo-400 group-hover:text-indigo-300 font-medium inline-flex items-center gap-1">
            See solution <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </span>
        </a>
```

Do **not** delete or modify the customs-trade card; it stays as #2.

- [ ] **Step 4: Verify the home page**

Reload `http://localhost:8765/`. Confirm:

- New hero reads "PGA Copilot — AI for FDA, EPA, and Lacey filings. Built below the H350722 line."
- Subhead names "broker reviews and approves every field" and references CBP HQ H350722.
- Primary CTA `mailto:`, secondary anchors to `/solutions/pga-copilot/`.
- Below the buttons: small line listing other industries with link to `#solutions`.
- Solutions grid order is PGA Copilot · Customs & Trade · Insurance · Healthcare · Mortgage · Manufacturing.
- The PGA Copilot card has the green "Now shipping" eyebrow chip and an indigo ring.
- All five other cards are unchanged in appearance and links.
- Console clean.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Lead home page with PGA Copilot in hero and #1 solution"
```

---

## Task 10: Customs-trade cross-link callout

**Files:**
- Modify: `solutions/customs-trade/index.html`

Add a single banner near the top of the customs-trade page body that routes brokers looking for FDA / EPA / Lacey help to the PGA Copilot page.

- [ ] **Step 1: Insert the callout**

In `solutions/customs-trade/index.html`, find the closing `</section>` of the hero (the one with `class="grid-bg relative min-h-[80vh]"`). Immediately **after** that closing `</section>` and **before** the next section, paste:

```html
    <!-- PGA Copilot cross-link -->
    <section class="relative pt-2">
      <div class="max-w-5xl mx-auto px-6">
        <a href="/solutions/pga-copilot/" class="block bento-card glass rounded-xl px-5 py-4 group">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-start sm:items-center gap-3">
              <i data-lucide="shield-check" class="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5 sm:mt-0"></i>
              <p class="text-sm text-slate-300">
                Looking for AI for <span class="text-white font-semibold">FDA Prior Notice, EPA TSCA §13, or Lacey PPQ-505</span>? See <span class="text-white font-semibold">PGA Copilot</span> &mdash; built for licensed brokers, below the H350722 line.
              </p>
            </div>
            <span class="text-indigo-400 group-hover:text-indigo-300 font-medium inline-flex items-center gap-1 flex-shrink-0 text-sm">
              See PGA Copilot <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </a>
      </div>
    </section>
```

- [ ] **Step 2: Verify**

Reload `http://localhost:8765/solutions/customs-trade/`. Confirm:

- Just below the hero, a horizontal callout card appears.
- Reads "Looking for AI for FDA Prior Notice, EPA TSCA §13, or Lacey PPQ-505? See PGA Copilot — …"
- Click navigates to `/solutions/pga-copilot/`.
- Customs-trade page is otherwise unchanged.
- Console clean.

- [ ] **Step 3: Commit**

```bash
git add solutions/customs-trade/index.html
git commit -m "Add PGA Copilot cross-link callout to customs-trade page"
```

---

## Task 11: Cross-section QA — responsive, reduced-motion, console, link audit

**Files:** none modified unless QA finds issues.

This task verifies the whole feature end-to-end before declaring done.

- [ ] **Step 1: Disclosure audit (manual)**

Open `solutions/pga-copilot/index.html` and search the file for any of the following terms. **None of them should appear** (they are internal-only per spec §3):

```bash
grep -nEi 'sonnet|opus|claude-[0-9]|five agents|orchestrator agent|specialist agent|doc reader agent|triage agent|validator agent|FastAPI|Postgres|Alembic|multi-agent' solutions/pga-copilot/index.html
```

Expected: zero matches. If any match, remove the offending phrase and recommit.

Also confirm forbidden verbs are not used to describe what the system does:

```bash
grep -nEi 'system (submits|files)|copilot (submits|files)|automatically (submit|file)|replaces your filer' solutions/pga-copilot/index.html
```

Expected: zero matches.

- [ ] **Step 2: Responsive check**

Open the new page in a browser and test three viewport widths via DevTools device emulation:

- 360 px (phone): hero stacks, mockup card stacks below headline, all sections single-column, CTA buttons full-width.
- 768 px (tablet): three-card grids may go to 2 or 1 columns; broker-zone chips stack readably.
- 1280 px (desktop): full intended layout.

No horizontal scroll at any width. No overlapping text. No clipped content.

- [ ] **Step 3: Reduced-motion check**

In Chromium DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → "reduce". Reload `solutions/pga-copilot/`. Confirm:

- No animations play. Everything renders in its final state immediately.
- Counters show their final values (e.g., "4.2B packages/yr") without ticking.
- The compliance line is fully drawn.
- The approval stamps are visible in their final rotated state.
- Glow orbs do not move (animation: none).

- [ ] **Step 4: Link audit**

Run a quick visual click-through:

- `/solutions/pga-copilot/` hero "Book a 30-min demo" → opens mailto.
- Hero "See how it stays below H350722" → scrolls to `#below-the-line`.
- CTA band "Email sales@xentovia.ai" → opens mailto.
- CTA band "Or use the contact form" → goes to `/#contact`.
- Nav `Book a Demo` → goes to `/#contact` (unchanged from existing site).
- Home page `See PGA Copilot` (hero secondary + grid card + customs-trade callout) all → land on the new page.

- [ ] **Step 5: Lighthouse spot-check**

In Chromium DevTools → Lighthouse → run on `solutions/pga-copilot/` (Mobile, Performance + Accessibility + Best Practices + SEO). Expectation: scores within 3 points of `solutions/customs-trade/` baseline. Investigate and fix any new accessibility violations (ARIA, color contrast). Performance regressions are acceptable only if attributable to count-up / SVG animation; otherwise fix.

- [ ] **Step 6: Commit any QA fixes**

If steps 1–5 surfaced fixes, commit them as a single follow-up:

```bash
git add -A
git commit -m "QA pass for PGA Copilot page: <one-line summary of fixes>"
```

If no fixes were needed, skip the commit.

- [ ] **Step 7: Final sanity check**

```bash
git log --oneline -15
```

Expected: 9–10 commits in the order Task 1 → Task 10, plus an optional QA commit. Each commit message starts with a verb and describes the change without mentioning Claude Code or the agent.

---

## Done

When all tasks are complete:

- `/solutions/pga-copilot/` is a polished, deck-aligned product page that does not leak architecture.
- The home page leads with PGA Copilot in the hero and at #1 in the solutions grid.
- The customs-trade page routes the right reader to the new page.
- All disclosure rules are honored (verified in Task 11 Step 1).
- All animations respect `prefers-reduced-motion`.
- No new dependencies, no build step, no backend changes.
