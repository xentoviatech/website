# Xentovia.ai Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the xentovia.ai landing page to position the company as an Agentic AI Solutions provider targeting US/global enterprise B2B markets — replacing the current generic "AI workflow automation" messaging.

**Architecture:** Single HTML file rewrite (`index.html`). Same tech stack: Tailwind CSS via CDN, Lucide icons, Inter font, vanilla JS. Dark theme, glassmorphism, scroll animations retained. All content and sections replaced with new messaging per the approved design spec at `docs/superpowers/specs/2026-04-04-xentovia-site-redesign-design.md`.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Lucide Icons, Inter font (Google Fonts), vanilla JavaScript

**Design spec:** `docs/superpowers/specs/2026-04-04-xentovia-site-redesign-design.md`

---

## File Structure

This is a single-file rewrite:

- **Modify:** `index.html` — complete content rewrite, same CSS/JS infrastructure
- No new files created
- No files deleted
- `privacy/index.html` and `terms/index.html` are NOT touched

The current `index.html` is ~877 lines. The rewrite will be a similar size. Since every section changes, this is a full rewrite of the `<body>` content and `<head>` meta tags, while preserving the CSS animations, Tailwind config, and JS utilities (particles, scroll reveal, mobile menu, nav hide/show).

---

### Task 1: Backup current site and update `<head>` meta tags

**Files:**
- Modify: `index.html:1-49` (head section)

- [ ] **Step 1: Create a backup branch**

```bash
git checkout -b backup/old-site
git checkout main
```

This preserves the old site on a branch in case we need to reference it.

- [ ] **Step 2: Update the `<title>` and `<meta>` tags**

In `index.html`, replace lines 6-7:

```html
  <title>Xentovia Tech — Autonomous AI Workflows</title>
  <meta name="description" content="Next-gen AI workflow automation, LLM orchestration, and enterprise-grade intelligence by Xentovia Tech.">
```

With:

```html
  <title>Xentovia Tech — Agentic AI Solutions for Enterprise</title>
  <meta name="description" content="We build agentic AI solutions combining Vision AI and GenAI for document intelligence, visual inspection, and workflow automation. Human-in-the-loop verification for enterprise-grade accuracy.">

  <!-- Open Graph -->
  <meta property="og:title" content="Xentovia Tech — Agentic AI Solutions for Enterprise">
  <meta property="og:description" content="AI agents that see, understand, and act. Document intelligence, visual inspection, and intelligent automation with human oversight.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://xentovia.ai">
  <meta property="og:image" content="https://xentovia.ai/favicon.png">
```

- [ ] **Step 3: Verify the page still loads**

Open `index.html` in a browser and confirm it loads without errors. The content will still be old — we're just updating meta tags.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Update meta tags and add Open Graph for site redesign"
```

---

### Task 2: Rewrite Navigation

**Files:**
- Modify: `index.html` — the `<nav>` element (currently lines 278-311)

- [ ] **Step 1: Replace the entire `<nav>` element**

Find the existing nav (starts with `<!-- ── Navigation ── -->` and ends with `</nav>`). Replace it with:

```html
  <!-- ── Navigation ── -->
  <nav class="nav-blur fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#" class="flex items-center gap-2.5 group">
        <img src="favicon.png" alt="Xentovia Logo" class="w-8 h-8 rounded-lg">
        <span class="text-lg font-bold tracking-tight text-white">Xentovia</span>
      </a>

      <div class="hidden md:flex items-center gap-8">
        <a href="#capabilities" class="text-sm text-slate-400 hover:text-white transition-colors">Capabilities</a>
        <a href="#solutions" class="text-sm text-slate-400 hover:text-white transition-colors">Solutions</a>
        <a href="#how-it-works" class="text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
        <a href="#security" class="text-sm text-slate-400 hover:text-white transition-colors">Security</a>
        <a href="#company" class="text-sm text-slate-400 hover:text-white transition-colors">Company</a>
        <a href="#contact" class="cta-primary px-5 py-2 rounded-lg text-sm font-semibold text-white">
          <span class="flex items-center gap-1.5">
            Book a Demo
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </span>
        </a>
      </div>

      <button class="md:hidden text-slate-400 hover:text-white" id="mobileMenuBtn" aria-label="Toggle menu">
        <i data-lucide="menu" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden hidden px-6 pb-4 space-y-3" id="mobileMenu">
      <a href="#capabilities" class="block text-sm text-slate-400 hover:text-white py-2">Capabilities</a>
      <a href="#solutions" class="block text-sm text-slate-400 hover:text-white py-2">Solutions</a>
      <a href="#how-it-works" class="block text-sm text-slate-400 hover:text-white py-2">How It Works</a>
      <a href="#security" class="block text-sm text-slate-400 hover:text-white py-2">Security</a>
      <a href="#company" class="block text-sm text-slate-400 hover:text-white py-2">Company</a>
      <a href="#contact" class="block cta-primary px-5 py-2.5 rounded-lg text-sm font-semibold text-white text-center">
        <span>Book a Demo</span>
      </a>
    </div>
  </nav>
```

- [ ] **Step 2: Verify nav renders correctly**

Open in browser. Check:
- Desktop: 5 nav links + "Book a Demo" button visible
- Mobile: hamburger menu toggles correctly
- All anchor links (will point to sections we haven't built yet — that's ok)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rewrite navigation with new section links and Book a Demo CTA"
```

---

### Task 3: Rewrite Hero Section

**Files:**
- Modify: `index.html` — the hero section (currently starts with `<!-- ── Hero ── -->`)

- [ ] **Step 1: Replace the entire hero section**

Find the existing hero (from `<!-- ── Hero ── -->` to the closing `</section>` that includes the scroll indicator). Replace it with:

```html
    <!-- ── Hero ── -->
    <section class="grid-bg relative min-h-screen flex items-center pt-16">
      <div class="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div class="max-w-4xl mx-auto text-center">

          <!-- Badge -->
          <div class="animate-on-scroll inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Vision AI + GenAI for Enterprise
          </div>

          <!-- Headline -->
          <h1 class="animate-on-scroll text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.05] mb-6">
            <span class="text-white">AI Agents That</span><br>
            <span class="gradient-text">See, Understand,</span><br>
            <span class="gradient-text">and Act.</span>
          </h1>

          <!-- Subheadline -->
          <p class="animate-on-scroll text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We build agentic AI solutions that combine Vision AI and Generative AI to solve complex
            enterprise problems &mdash; document intelligence, visual inspection, intelligent automation.
            With human oversight where it matters.
          </p>

          <!-- CTAs -->
          <div class="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#contact" class="cta-primary px-8 py-3.5 rounded-xl text-base font-semibold text-white w-full sm:w-auto">
              <span class="flex items-center justify-center gap-2">
                Book a Demo
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </span>
            </a>
            <a href="#contact" class="group px-8 py-3.5 rounded-xl text-base font-medium text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <i data-lucide="message-circle" class="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
              Tell Us Your Problem
            </a>
          </div>

          <!-- Trust Signals -->
          <div class="animate-on-scroll flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500">
            <span class="flex items-center gap-1.5">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500"></i>
              SOC 2 (In Progress)
            </span>
            <span class="flex items-center gap-1.5">
              <i data-lucide="lock" class="w-3.5 h-3.5 text-indigo-400"></i>
              End-to-End Encrypted
            </span>
            <span class="flex items-center gap-1.5">
              <i data-lucide="heart-pulse" class="w-3.5 h-3.5 text-cyan-400"></i>
              HIPAA-Ready Architecture
            </span>
            <span class="flex items-center gap-1.5">
              <i data-lucide="activity" class="w-3.5 h-3.5 text-purple-400"></i>
              In Production Today
            </span>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i data-lucide="chevrons-down" class="w-5 h-5 text-slate-600"></i>
      </div>
    </section>
```

- [ ] **Step 2: Verify hero renders correctly**

Open in browser. Check:
- Badge says "Vision AI + GenAI for Enterprise"
- Headline reads "AI Agents That / See, Understand, / and Act."
- Two CTA buttons: "Book a Demo" and "Tell Us Your Problem"
- Trust signals: SOC 2 (In Progress), End-to-End Encrypted, HIPAA-Ready Architecture, In Production Today
- Scroll animations work
- Mobile responsive

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rewrite hero section with agentic AI positioning"
```

---

### Task 4: Rewrite Features Section → Three Capabilities Pillars

**Files:**
- Modify: `index.html` — the features section (currently `id="features"`)

- [ ] **Step 1: Replace the entire features section**

Find the existing section (from `<!-- ── Bento Grid Features ── -->` to its closing `</section>`). Replace it with:

```html
    <!-- ── Core Capabilities ── -->
    <section id="capabilities" class="relative py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6">

        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Core Capabilities</p>
          <h2 class="animate-on-scroll text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Three pillars. One <span class="gradient-text">agentic platform.</span>
          </h2>
          <p class="animate-on-scroll text-lg text-slate-400 max-w-2xl mx-auto">
            Every solution we build combines Vision AI, Generative AI, and human oversight into agentic pipelines that deliver verified results.
          </p>
        </div>

        <!-- Three Pillars -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <!-- Pillar 1: Document Intelligence -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-8 group">
            <div class="flex flex-col h-full">
              <div class="flex items-start justify-between mb-6">
                <div class="icon-box">
                  <i data-lucide="scan-text" class="w-5 h-5 text-indigo-400"></i>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">IN PRODUCTION</span>
                </div>
              </div>

              <h3 class="text-xl font-bold text-white mb-3">Agentic Document Intelligence</h3>
              <p class="text-slate-400 mb-6 leading-relaxed text-sm">
                VLM agents that read handwritten, scanned, and digital documents &mdash; extracting structured data from forms, tables, contracts, and free-text. Multi-step validation catches what single-pass extraction misses.
              </p>

              <div class="mt-auto space-y-2">
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
                  Handwritten &amp; printed text (multi-language)
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
                  Tables, forms, mixed layouts
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
                  Structured JSON output
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-indigo-400"></i>
                  Auto-correction &amp; cross-validation
                </div>
              </div>
            </div>
          </div>

          <!-- Pillar 2: Visual AI -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-8 group">
            <div class="flex flex-col h-full">
              <div class="flex items-start justify-between mb-6">
                <div class="icon-box">
                  <i data-lucide="eye" class="w-5 h-5 text-cyan-400"></i>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">AVAILABLE</span>
                </div>
              </div>

              <h3 class="text-xl font-bold text-white mb-3">Visual Inspection &amp; Analysis</h3>
              <p class="text-slate-400 mb-6 leading-relaxed text-sm">
                Vision AI agents that inspect, classify, and analyze images and video &mdash; from manufacturing quality control to property damage assessment to medical imaging analysis.
              </p>

              <div class="mt-auto space-y-2">
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                  Defect detection &amp; quality grading
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                  Damage assessment from photos
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                  Image classification &amp; comparison
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i>
                  Video frame analysis
                </div>
              </div>
            </div>
          </div>

          <!-- Pillar 3: GenAI Automation -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-8 group">
            <div class="flex flex-col h-full">
              <div class="flex items-start justify-between mb-6">
                <div class="icon-box">
                  <i data-lucide="brain" class="w-5 h-5 text-purple-400"></i>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">AVAILABLE</span>
                </div>
              </div>

              <h3 class="text-xl font-bold text-white mb-3">Intelligent Workflow Agents</h3>
              <p class="text-slate-400 mb-6 leading-relaxed text-sm">
                GenAI agents that reason, decide, and act across your business workflows &mdash; from claims triage to compliance checks to customer communication. Orchestrate LLMs with domain-specific guardrails.
              </p>

              <div class="mt-auto space-y-2">
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-purple-400"></i>
                  Multi-model orchestration
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-purple-400"></i>
                  Decision logic with guardrails
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-purple-400"></i>
                  Domain-specific reasoning chains
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-purple-400"></i>
                  API-driven workflow integration
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify capabilities section renders correctly**

Open in browser. Check:
- Section header: "Three pillars. One agentic platform."
- Three equal-width cards visible on desktop, stacked on mobile
- Pillar 1 has green "IN PRODUCTION" badge
- Pillars 2-3 have cyan/purple "AVAILABLE" badges
- Hover effects and scroll animations work

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Replace bento features grid with three capability pillars"
```

---

### Task 5: Replace Stats Section → Solutions / Use Cases

**Files:**
- Modify: `index.html` — the stats section AND we insert the new solutions section

- [ ] **Step 1: Replace the stats section with the solutions section**

Find the existing stats section (from `<!-- ── Stats Section ── -->` to its closing `</section>` including the trailing `section-divider`). Replace it with:

```html
    <!-- ── Solutions ── -->
    <section id="solutions" class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">

        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Solutions</p>
          <h2 class="animate-on-scroll text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Real problems. <span class="gradient-text">Verified results.</span>
          </h2>
          <p class="animate-on-scroll text-lg text-slate-400 max-w-2xl mx-auto">
            We work across industries where complex documents, visual data, and manual processes are costing enterprises time and money.
          </p>
        </div>

        <!-- Use Case Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <!-- Card 1: Insurance -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 group">
            <div class="flex flex-col h-full">
              <div class="icon-box mb-5">
                <i data-lucide="shield" class="w-5 h-5 text-indigo-400"></i>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Claims &amp; Underwriting</h3>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span class="text-[10px] font-mono text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/10">Document Intelligence</span>
                <span class="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/10">GenAI Automation</span>
              </div>
              <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                Extract and validate claims documents, automate submission triage, and accelerate underwriting decisions.
              </p>
              <p class="mt-auto text-xs text-slate-500">
                FNOL forms &middot; Medical records &middot; Policy applications &middot; Repair estimates
              </p>
            </div>
          </div>

          <!-- Card 2: Healthcare -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 group">
            <div class="flex flex-col h-full">
              <div class="icon-box mb-5">
                <i data-lucide="heart-pulse" class="w-5 h-5 text-rose-400"></i>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Clinical Documentation &amp; Prior Auth</h3>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span class="text-[10px] font-mono text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/10">Document Intelligence</span>
                <span class="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/10">GenAI Automation</span>
              </div>
              <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                Process clinical notes, assemble prior auth packages, and extract structured data from medical records.
              </p>
              <p class="mt-auto text-xs text-slate-500">
                Lab results &middot; Discharge summaries &middot; EOBs &middot; Imaging reports
              </p>
            </div>
          </div>

          <!-- Card 3: Mortgage -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 group">
            <div class="flex flex-col h-full">
              <div class="icon-box mb-5">
                <i data-lucide="landmark" class="w-5 h-5 text-amber-400"></i>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Loan Processing &amp; Compliance</h3>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span class="text-[10px] font-mono text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/10">Document Intelligence</span>
                <span class="text-[10px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/10">GenAI Automation</span>
              </div>
              <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                Index loan files, verify income and assets, and automate compliance document checks.
              </p>
              <p class="mt-auto text-xs text-slate-500">
                W-2s &middot; Tax returns &middot; Bank statements &middot; TRID disclosures
              </p>
            </div>
          </div>

          <!-- Card 4: Manufacturing -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 group">
            <div class="flex flex-col h-full">
              <div class="icon-box mb-5">
                <i data-lucide="factory" class="w-5 h-5 text-emerald-400"></i>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Visual Inspection &amp; Quality Control</h3>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span class="text-[10px] font-mono text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-500/10">Visual AI</span>
              </div>
              <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                Detect defects, grade quality, and monitor production lines with vision AI agents that learn your standards.
              </p>
              <p class="mt-auto text-xs text-slate-500">
                Product photos &middot; Assembly line video &middot; Packaging inspection
              </p>
            </div>
          </div>

          <!-- Card 5: Government -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 group">
            <div class="flex flex-col h-full">
              <div class="icon-box mb-5">
                <i data-lucide="building" class="w-5 h-5 text-cyan-400"></i>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Record Digitization &amp; Processing</h3>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span class="text-[10px] font-mono text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/10">Document Intelligence</span>
                <span class="text-[10px] font-mono text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-500/10">Visual AI</span>
              </div>
              <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                Digitize handwritten records, process benefits applications, and modernize paper-based archives at scale.
              </p>
              <p class="mt-auto text-xs text-slate-500 italic">
                Currently processing handwritten government land records in production.
              </p>
            </div>
          </div>

          <!-- Card 6: Your Industry -->
          <div class="animate-on-scroll bento-card glass rounded-2xl p-7 group border border-dashed border-white/10 hover:border-indigo-500/30">
            <div class="flex flex-col h-full">
              <div class="icon-box mb-5">
                <i data-lucide="message-circle" class="w-5 h-5 text-slate-400"></i>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Something Else?</h3>
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span class="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/5">All Capabilities</span>
              </div>
              <p class="text-sm text-slate-400 mb-4 leading-relaxed">
                If you have complex documents, visual data, or manual workflows draining your team &mdash; we should talk.
                We build custom agentic solutions for problems that off-the-shelf tools can't handle.
              </p>
              <a href="#contact" class="mt-auto text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                Tell Us Your Problem
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
      <div class="section-divider mt-20"></div>
    </section>
```

- [ ] **Step 2: Verify solutions section renders correctly**

Open in browser. Check:
- 6 cards in 3x2 grid on desktop, stacked on mobile
- Each card has icon, title, pillar tags, description, and document examples
- Card 5 (Government) has italic proof line
- Card 6 has dashed border and "Tell Us Your Problem" link
- Scroll animations work

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Replace stats section with industry solutions grid"
```

---

### Task 6: Rewrite Platform Section → How It Works Pipeline

**Files:**
- Modify: `index.html` — the platform section (currently `id="platform"`)

- [ ] **Step 1: Replace the entire platform section**

Find the existing section (from `<!-- ── Platform Section ── -->` to its closing `</section>`). Replace it with:

```html
    <!-- ── How It Works ── -->
    <section id="how-it-works" class="relative py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">How It Works</p>
            <h2 class="animate-on-scroll text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Agentic pipelines that deliver <span class="gradient-text">verified results</span>
            </h2>
            <p class="animate-on-scroll text-lg text-slate-400 leading-relaxed mb-10">
              Every solution follows the same architecture &mdash; specialized AI agents working in sequence, with human oversight built in.
            </p>

            <div class="space-y-5">
              <div class="animate-on-scroll flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="upload" class="w-4 h-4 text-indigo-400"></i>
                </div>
                <div>
                  <h4 class="text-base font-semibold text-white mb-1">Ingest</h4>
                  <p class="text-sm text-slate-400">Send us anything &mdash; documents via API, images via S3, video feeds via webhook, or data via email. We handle the format chaos.</p>
                </div>
              </div>
              <div class="animate-on-scroll flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="eye" class="w-4 h-4 text-purple-400"></i>
                </div>
                <div>
                  <h4 class="text-base font-semibold text-white mb-1">Understand</h4>
                  <p class="text-sm text-slate-400">Vision AI and language models analyze your input &mdash; classifying type, detecting structure, reading content, identifying what matters.</p>
                </div>
              </div>
              <div class="animate-on-scroll flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="cpu" class="w-4 h-4 text-cyan-400"></i>
                </div>
                <div>
                  <h4 class="text-base font-semibold text-white mb-1">Extract &amp; Process</h4>
                  <p class="text-sm text-slate-400">Specialized agents pull structured data, detect anomalies, grade quality, or execute reasoning chains &mdash; depending on what your problem needs.</p>
                </div>
              </div>
              <div class="animate-on-scroll flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>
                </div>
                <div>
                  <h4 class="text-base font-semibold text-white mb-1">Validate</h4>
                  <p class="text-sm text-slate-400">Agentic validation cross-checks every output &mdash; catching inconsistencies, applying business rules, scoring confidence, and auto-correcting known error patterns.</p>
                </div>
              </div>
              <div class="animate-on-scroll flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="users" class="w-4 h-4 text-amber-400"></i>
                </div>
                <div>
                  <h4 class="text-base font-semibold text-white mb-1">Human Review</h4>
                  <p class="text-sm text-slate-400">Low-confidence outputs route to your team in a built-in review dashboard. Side-by-side viewer, inline editing, one-click approve. <span class="text-white font-medium">You review 10-20%, not 100%.</span></p>
                </div>
              </div>
              <div class="animate-on-scroll flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="send" class="w-4 h-4 text-rose-400"></i>
                </div>
                <div>
                  <h4 class="text-base font-semibold text-white mb-1">Deliver</h4>
                  <p class="text-sm text-slate-400">Verified results pushed to your systems &mdash; structured JSON, Excel, database insert, or direct API call to your CRM, claims system, EHR, or ERP.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabbed API Examples -->
          <div class="animate-on-scroll lg:sticky lg:top-24">
            <div class="glass rounded-2xl overflow-hidden">
              <!-- Tab Bar -->
              <div class="flex border-b border-white/5">
                <button class="api-tab active flex-1 px-4 py-3 text-xs font-medium text-center transition-colors" data-tab="doc">
                  Document
                </button>
                <button class="api-tab flex-1 px-4 py-3 text-xs font-medium text-center transition-colors" data-tab="visual">
                  Visual
                </button>
                <button class="api-tab flex-1 px-4 py-3 text-xs font-medium text-center transition-colors" data-tab="auto">
                  Automation
                </button>
              </div>
              <!-- Tab Content: Document -->
              <div class="api-panel active p-5 font-mono text-sm leading-relaxed" data-panel="doc">
                <p><span class="text-slate-500">POST</span> <span class="text-emerald-400">/api/v1/pipeline/run</span></p>
                <p class="text-slate-600">{</p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"type"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"document"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"source"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"s3://inbox/claim-4821.pdf"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"pipeline"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"insurance-claims"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"review_mode"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"flag_low_confidence"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"callback"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"https://your-app.com/webhook"</span></p>
                <p class="text-slate-600">}</p>
              </div>
              <!-- Tab Content: Visual -->
              <div class="api-panel hidden p-5 font-mono text-sm leading-relaxed" data-panel="visual">
                <p><span class="text-slate-500">POST</span> <span class="text-emerald-400">/api/v1/pipeline/run</span></p>
                <p class="text-slate-600">{</p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"type"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"visual"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"source"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"s3://qc-feed/batch-0412/"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"pipeline"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"defect-detection"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"threshold"</span><span class="text-slate-500">:</span> <span class="text-cyan-400">0.95</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"callback"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"https://your-app.com/webhook"</span></p>
                <p class="text-slate-600">}</p>
              </div>
              <!-- Tab Content: Automation -->
              <div class="api-panel hidden p-5 font-mono text-sm leading-relaxed" data-panel="auto">
                <p><span class="text-slate-500">POST</span> <span class="text-emerald-400">/api/v1/pipeline/run</span></p>
                <p class="text-slate-600">{</p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"type"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"workflow"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"trigger"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"new_claim_submitted"</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"agents"</span><span class="text-slate-500">:</span> <span class="text-slate-500">[</span><span class="text-emerald-400">"classify"</span><span class="text-slate-600">,</span> <span class="text-emerald-400">"extract"</span><span class="text-slate-600">,</span> <span class="text-emerald-400">"decide"</span><span class="text-slate-600">,</span> <span class="text-emerald-400">"route"</span><span class="text-slate-500">]</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"guardrails"</span><span class="text-slate-500">:</span> <span class="text-cyan-400">true</span><span class="text-slate-600">,</span></p>
                <p>&nbsp;&nbsp;<span class="text-purple-400">"callback"</span><span class="text-slate-500">:</span> <span class="text-emerald-400">"https://your-app.com/webhook"</span></p>
                <p class="text-slate-600">}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Add CSS for the API tabs**

In the `<style>` block, before the closing `</style>` tag, add:

```css
    /* ── API Tabs ── */
    .api-tab {
      color: #64748b;
      border-bottom: 2px solid transparent;
    }
    .api-tab.active {
      color: #818cf8;
      border-bottom-color: #6366f1;
      background: rgba(99, 102, 241, 0.05);
    }
    .api-tab:hover:not(.active) {
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.02);
    }
```

- [ ] **Step 3: Add JS for tab switching**

In the `<script>` block at the bottom, after the mobile menu toggle code and before the waitlist handler, add:

```javascript
    // ── API Tab Switching ──
    document.querySelectorAll('.api-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.api-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.api-panel').forEach(p => { p.classList.add('hidden'); p.classList.remove('active'); });
        tab.classList.add('active');
        const panel = document.querySelector(`.api-panel[data-panel="${tab.dataset.tab}"]`);
        panel.classList.remove('hidden');
        panel.classList.add('active');
      });
    });
```

- [ ] **Step 4: Verify How It Works section renders correctly**

Open in browser. Check:
- 6 pipeline steps on the left with colored icons
- "You review 10-20%, not 100%" is bold white text
- Tabbed API panel on right with 3 tabs (Document, Visual, Automation)
- Tab switching works — clicking each tab shows different API payload
- Right panel is sticky on desktop scroll
- Mobile: stacks vertically

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Replace platform section with agentic pipeline and tabbed API examples"
```

---

### Task 7: Add Security Section + Company/Proof Section

**Files:**
- Modify: `index.html` — replace the waitlist section position with Security + Company sections

- [ ] **Step 1: Insert Security and Company sections**

After the How It Works section closing `</section>`, and before the existing waitlist section (`<!-- ── Waitlist CTA ── -->`), insert these two new sections:

```html
    <!-- ── Security & Compliance ── -->
    <section id="security" class="relative py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Security &amp; Compliance</p>
            <h2 class="animate-on-scroll text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Enterprise-grade by <span class="gradient-text">design</span>, not by afterthought
            </h2>
            <p class="animate-on-scroll text-lg text-slate-400 leading-relaxed">
              Every document processed through Xentovia is encrypted in transit (TLS 1.3) and at rest (AES-256).
              Our agentic pipelines run in isolated tenant environments with full audit trails &mdash; every extraction,
              every validation, every human review is logged and traceable.
            </p>
            <p class="animate-on-scroll text-lg text-slate-400 leading-relaxed mt-4">
              We're building toward the compliance certifications that US enterprises require &mdash;
              not claiming them before we have them.
            </p>
          </div>

          <!-- Compliance Grid -->
          <div class="animate-on-scroll grid grid-cols-2 gap-3">
            <div class="glass rounded-xl p-5 flex flex-col items-center gap-2.5 text-center">
              <i data-lucide="shield-check" class="w-6 h-6 text-amber-400"></i>
              <span class="text-sm text-white font-medium">SOC 2 Type II</span>
              <span class="text-[11px] text-amber-400 font-medium">In Progress</span>
            </div>
            <div class="glass rounded-xl p-5 flex flex-col items-center gap-2.5 text-center">
              <i data-lucide="heart-pulse" class="w-6 h-6 text-rose-400"></i>
              <span class="text-sm text-white font-medium">HIPAA-Ready</span>
              <span class="text-[11px] text-slate-500">Architecture designed for BAA</span>
            </div>
            <div class="glass rounded-xl p-5 flex flex-col items-center gap-2.5 text-center">
              <i data-lucide="lock" class="w-6 h-6 text-emerald-400"></i>
              <span class="text-sm text-white font-medium">Encryption</span>
              <span class="text-[11px] text-slate-500">AES-256 + TLS 1.3</span>
            </div>
            <div class="glass rounded-xl p-5 flex flex-col items-center gap-2.5 text-center">
              <i data-lucide="layers" class="w-6 h-6 text-indigo-400"></i>
              <span class="text-sm text-white font-medium">Tenant Isolation</span>
              <span class="text-[11px] text-slate-500">Schema-per-tenant, zero cross-access</span>
            </div>
            <div class="glass rounded-xl p-5 flex flex-col items-center gap-2.5 text-center">
              <i data-lucide="scroll-text" class="w-6 h-6 text-cyan-400"></i>
              <span class="text-sm text-white font-medium">Audit Trail</span>
              <span class="text-[11px] text-slate-500">Every AI decision logged</span>
            </div>
            <div class="glass rounded-xl p-5 flex flex-col items-center gap-2.5 text-center">
              <i data-lucide="globe" class="w-6 h-6 text-purple-400"></i>
              <span class="text-sm text-white font-medium">Data Residency</span>
              <span class="text-[11px] text-slate-500">US, EU, or India</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Company / Proof ── -->
    <section id="company" class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-7xl mx-auto px-6">

        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-3">Why Xentovia</p>
          <h2 class="animate-on-scroll text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            We don't just talk about AI agents. <span class="gradient-text">We ship them.</span>
          </h2>
          <p class="animate-on-scroll text-lg text-slate-400 max-w-2xl mx-auto">
            Xentovia Tech builds agentic AI systems that are in production &mdash; not pitch decks.
          </p>
        </div>

        <!-- Proof Blocks -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">

          <!-- Block 1: Vision AI -->
          <div class="animate-on-scroll glass rounded-2xl p-7">
            <div class="icon-box mb-5">
              <i data-lucide="scan-text" class="w-5 h-5 text-indigo-400"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Vision AI &mdash; Government Record Digitization</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              Our agentic VLM pipeline processes handwritten Indian land records &mdash; Devanagari script across decades-old registers.
              Multi-step extraction with auto-correction and human review, delivered in government-mandated export formats.
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10">Vision Language Models</span>
              <span class="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/10">Agentic Pipeline</span>
              <span class="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10">Handwritten OCR</span>
              <span class="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10">HITL Dashboard</span>
            </div>
          </div>

          <!-- Block 2: SaaS -->
          <div class="animate-on-scroll glass rounded-2xl p-7">
            <div class="icon-box mb-5">
              <i data-lucide="school" class="w-5 h-5 text-cyan-400"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Full-Stack SaaS &mdash; School Management Platform</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              We built and operate a multi-tenant SaaS platform serving schools across India &mdash; admissions, fees, academics,
              assessments, and parent engagement. Schema-per-tenant isolation, automated billing, and role-based access for 5 user types.
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10">Multi-Tenant SaaS</span>
              <span class="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-500/10">Schema Isolation</span>
              <span class="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10">API-First</span>
              <span class="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10">Production Scale</span>
            </div>
          </div>

          <!-- Block 3: Stack -->
          <div class="animate-on-scroll glass rounded-2xl p-7">
            <div class="icon-box mb-5">
              <i data-lucide="code-2" class="w-5 h-5 text-purple-400"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-3">Our Stack</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-5">
              Full-stack AI engineering team. We own the pipeline end to end &mdash; from image preprocessing to VLM extraction
              to HITL dashboards to API delivery.
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">FastAPI</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">Next.js</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">PostgreSQL</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">Gemini VLM</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">OpenCV</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">Celery</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">Docker</span>
              <span class="text-[10px] font-mono text-slate-300 px-2 py-0.5 rounded bg-white/5">AWS</span>
            </div>
          </div>
        </div>

        <!-- Founder Note -->
        <div class="animate-on-scroll glass rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <p class="text-lg text-white font-semibold mb-3">Built by engineers, not a pitch deck.</p>
          <p class="text-sm text-slate-400 leading-relaxed mb-5">
            Xentovia Tech is founded by Santosh Kumar &mdash; a full-stack AI engineer who has built and shipped every product
            in our portfolio. We're a small, focused team that builds production systems, not prototypes.
          </p>
          <div class="flex items-center justify-center gap-6 text-sm text-slate-500">
            <a href="https://www.linkedin.com/company/xentovia-ai" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors flex items-center gap-1.5">
              <i data-lucide="linkedin" class="w-4 h-4"></i>
              LinkedIn
            </a>
            <a href="mailto:hello@xentovia.ai" class="hover:text-white transition-colors flex items-center gap-1.5">
              <i data-lucide="mail" class="w-4 h-4"></i>
              hello@xentovia.ai
            </a>
            <a href="tel:+917880170555" class="hover:text-white transition-colors flex items-center gap-1.5">
              <i data-lucide="phone" class="w-4 h-4"></i>
              +91 788 017 0555
            </a>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Verify both sections render correctly**

Open in browser. Check:
- Security section: 2-column layout, 2x3 compliance grid, SOC 2 shows "In Progress" in amber
- Company section: 3 proof blocks + centered founder note card
- Tech tags display correctly
- Scroll animations work
- Mobile: stacks vertically

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add security compliance section and company proof section"
```

---

### Task 8: Replace Waitlist → Contact CTA Section

**Files:**
- Modify: `index.html` — the waitlist section (currently `id="waitlist"`)

- [ ] **Step 1: Replace the waitlist section**

Find the existing section (from `<!-- ── Waitlist CTA ── -->` to its closing `</section>`). Replace it with:

```html
    <!-- ── Contact CTA ── -->
    <section id="contact" class="relative py-24 lg:py-32">
      <div class="section-divider mb-20"></div>
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-16">
          <p class="animate-on-scroll text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">Get Started</p>
          <h2 class="animate-on-scroll text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Have a problem that needs <span class="gradient-text">AI agents?</span>
          </h2>
          <p class="animate-on-scroll text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Whether it's messy documents, visual inspection, or manual workflows draining your team &mdash;
            tell us what you're dealing with. We'll tell you if we can help.
          </p>
        </div>

        <div class="animate-on-scroll grid md:grid-cols-2 gap-8">

          <!-- Book a Demo -->
          <div class="glass rounded-2xl p-8 text-center">
            <div class="icon-box mx-auto mb-5">
              <i data-lucide="calendar" class="w-5 h-5 text-indigo-400"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Book a Demo</h3>
            <p class="text-sm text-slate-400 mb-6 leading-relaxed">
              See our agentic pipelines in action with your document types.
            </p>
            <a href="mailto:hello@xentovia.ai?subject=Demo%20Request" class="cta-primary inline-flex px-8 py-3.5 rounded-xl text-sm font-semibold text-white">
              <span class="flex items-center gap-2">
                Schedule a Call
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </span>
            </a>
            <p class="text-xs text-slate-600 mt-4">30-minute call. No slides. Live demo with your documents.</p>
          </div>

          <!-- Tell Us Your Problem -->
          <div class="glass rounded-2xl p-8">
            <div class="icon-box mx-auto mb-5 md:mx-0">
              <i data-lucide="message-circle" class="w-5 h-5 text-cyan-400"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 text-center md:text-left">Tell Us Your Problem</h3>
            <form class="space-y-4" onsubmit="handleContact(event)">
              <input type="text" required placeholder="Name"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all">
              <input type="email" required placeholder="Work email"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all">
              <input type="text" placeholder="Company"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all">
              <textarea required rows="3" placeholder="Describe your problem"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all resize-none"></textarea>
              <button type="submit" class="cta-primary w-full px-6 py-3.5 rounded-xl text-sm font-semibold text-white">
                <span class="flex items-center justify-center gap-2">
                  Submit
                  <i data-lucide="send" class="w-4 h-4"></i>
                </span>
              </button>
            </form>
            <p class="text-xs text-slate-600 mt-3 text-center md:text-left">We respond within 24 hours.</p>
          </div>
        </div>

      </div>
    </section>
```

- [ ] **Step 2: Replace the old `handleWaitlist` JS function with `handleContact`**

In the `<script>` block, find and replace the `handleWaitlist` function with:

```javascript
    // ── Contact Form Handler ──
    function handleContact(e) {
      e.preventDefault();
      const form = e.target;
      const btn = form.querySelector('button');
      const inputs = form.querySelectorAll('input, textarea');
      btn.innerHTML = '<span class="flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>Message sent!</span>';
      btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
      inputs.forEach(i => { i.value = ''; i.disabled = true; });
      btn.disabled = true;
    }
```

- [ ] **Step 3: Verify contact section renders correctly**

Open in browser. Check:
- Two-column layout: "Book a Demo" card (left) + form (right)
- Form has 4 fields: Name, Work email, Company, Describe your problem
- Submit button works (shows "Message sent!" with green gradient)
- "Schedule a Call" opens mailto:hello@xentovia.ai
- Mobile: stacks vertically

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Replace waitlist with dual CTA contact section"
```

---

### Task 9: Rewrite Footer

**Files:**
- Modify: `index.html` — the `<footer>` element

- [ ] **Step 1: Replace the entire footer**

Find the existing `<footer>` element. Replace it with:

```html
  <!-- ── Footer ── -->
  <footer class="relative z-10 border-t border-white/5 bg-space-950/80">
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">

        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <a href="#" class="flex items-center gap-2.5 mb-4">
            <img src="favicon.png" alt="Xentovia Logo" class="w-8 h-8 rounded-lg">
            <span class="text-lg font-bold tracking-tight text-white">Xentovia</span>
          </a>
          <p class="text-sm text-slate-500 leading-relaxed mb-4">
            Agentic AI solutions for the enterprise.
          </p>
          <div class="space-y-2">
            <a href="tel:+917880170555" class="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              +91 788 017 0555
            </a>
            <a href="mailto:hello@xentovia.ai" class="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
              <i data-lucide="mail" class="w-3.5 h-3.5"></i>
              hello@xentovia.ai
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Product</h4>
          <ul class="space-y-2.5">
            <li><a href="#capabilities" class="text-sm text-slate-500 hover:text-white transition-colors">Capabilities</a></li>
            <li><a href="#solutions" class="text-sm text-slate-500 hover:text-white transition-colors">Solutions</a></li>
            <li><a href="#how-it-works" class="text-sm text-slate-500 hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#security" class="text-sm text-slate-500 hover:text-white transition-colors">Security</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Company</h4>
          <ul class="space-y-2.5">
            <li><a href="#company" class="text-sm text-slate-500 hover:text-white transition-colors">About</a></li>
            <li><a href="#" class="text-sm text-slate-500 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" class="text-sm text-slate-500 hover:text-white transition-colors">Careers</a></li>
            <li><a href="mailto:hello@xentovia.ai" class="text-sm text-slate-500 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Legal</h4>
          <ul class="space-y-2.5">
            <li><a href="/privacy/" class="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms/" class="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#security" class="text-sm text-slate-500 hover:text-white transition-colors">Security</a></li>
            <li><a href="#" class="text-sm text-slate-500 hover:text-white transition-colors">DPA</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="section-divider mb-8"></div>
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-slate-600">
          &copy; 2026 Xentovia Tech Private Limited. All rights reserved.
        </p>
        <div class="flex items-center gap-5">
          <a href="https://www.linkedin.com/company/xentovia-ai" target="_blank" rel="noopener noreferrer" class="text-slate-600 hover:text-white transition-colors" aria-label="LinkedIn">
            <i data-lucide="linkedin" class="w-4 h-4"></i>
          </a>
          <a href="mailto:hello@xentovia.ai" class="text-slate-600 hover:text-white transition-colors" aria-label="Email">
            <i data-lucide="mail" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
```

- [ ] **Step 2: Verify footer renders correctly**

Open in browser. Check:
- Tagline says "Agentic AI solutions for the enterprise."
- Product links point to new section IDs (capabilities, solutions, how-it-works, security)
- Social links: only LinkedIn and email (removed dead GitHub, Twitter, Discord icons)
- Legal links still point to /privacy/ and /terms/
- Mobile responsive

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rewrite footer with updated links and tagline"
```

---

### Task 10: Clean up JS and remove dead code

**Files:**
- Modify: `index.html` — the `<script>` block

- [ ] **Step 1: Remove the old `handleWaitlist` function**

If `handleWaitlist` still exists in the script block (it should have been replaced in Task 8), remove it now.

- [ ] **Step 2: Verify all JS still works**

Open in browser and check:
- Lucide icons render correctly everywhere
- Particles animate in the background
- Scroll reveal animations fire on all new sections
- Mobile menu toggle works
- Nav hide/show on scroll works
- API tab switching works (How It Works section)
- Contact form submit shows success state

- [ ] **Step 3: Verify no broken anchor links**

Click every nav link and verify it scrolls to the correct section:
- "Capabilities" → `#capabilities`
- "Solutions" → `#solutions`
- "How It Works" → `#how-it-works`
- "Security" → `#security`
- "Company" → `#company`
- "Book a Demo" (nav) → `#contact`
- "Tell Us Your Problem" (hero) → `#contact`

- [ ] **Step 4: Test mobile responsiveness**

Resize browser to mobile width and verify:
- All sections stack vertically
- Text is readable, no overflow
- Hamburger menu works
- Cards don't overlap
- API tabs are usable on small screens

- [ ] **Step 5: Final commit**

```bash
git add index.html
git commit -m "Complete xentovia.ai site redesign: agentic AI positioning for US/global enterprise market"
```

---

## Summary

| Task | What it does | Sections affected |
|------|-------------|-------------------|
| 1 | Update meta tags + OG tags | `<head>` |
| 2 | Rewrite navigation | Nav bar |
| 3 | Rewrite hero | Section 1 |
| 4 | Three capabilities pillars | Section 2 |
| 5 | Solutions / use cases grid | Section 3 |
| 6 | Pipeline + tabbed API examples | Section 4 |
| 7 | Security + Company/Proof | Sections 5-6 |
| 8 | Contact CTA (demo + form) | Section 7 |
| 9 | Footer rewrite | Section 8 |
| 10 | JS cleanup + full verification | Scripts + all sections |

Total: 10 tasks, ~30 steps, all in one file (`index.html`).
