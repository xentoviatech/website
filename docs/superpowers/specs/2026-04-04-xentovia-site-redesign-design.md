# Xentovia.ai Website Redesign — Design Spec

**Date:** 2026-04-04
**Author:** Santosh Kumar + Claude
**Status:** Approved

---

## Context

Xentovia Tech Private Limited (xentovia.ai) is an India-based AI company with two production products:

- **Akshara** — Agentic VLM pipeline for handwritten Indian land record digitization (Gemini 3.x, OpenCV, FastAPI, HITL dashboard)
- **EdunodeX** — Multi-tenant school management SaaS (FastAPI, React, PostgreSQL, Razorpay)

Both products are marketed separately under their own brands.

The current xentovia.ai website positions the company as a generic "AI workflow automation platform" with unverifiable claims (50+ LLM models, 200+ integrations, 99.99% uptime). This does not reflect the company's actual capabilities, products, or strategic direction.

## Strategic Direction

- Expand into US and international B2B markets using Vision AI and GenAI
- Target verticals: Insurance, Healthcare, Mortgage, Manufacturing, Government, Legal
- Position Xentovia as a company that **builds agentic AI solutions** — not a generic workflow tool
- Document intelligence is the proven first capability; Visual AI and GenAI automation are natural extensions
- Akshara and EdunodeX serve as proof of production capability, not the product being sold on this site

## Target Audience

- **Primary:** US mid-market enterprise buyers (insurance carriers, healthcare orgs, mortgage lenders, manufacturers) evaluating AI solutions for document-heavy and visual inspection workflows
- **Secondary:** Technical evaluators (CTOs, VPs of Engineering) assessing architecture and integration
- **Tertiary:** Investors and partners evaluating the company's portfolio and capability

## Positioning

**Old:** "Autonomous Workflows for the Intelligence Age" (generic AI workflow automation)

**New:** "AI Agents That See, Understand, and Act" (agentic Vision AI + GenAI for enterprise)

**Core message:** We build agentic AI solutions that combine Vision AI and Generative AI to solve complex enterprise problems — document intelligence, visual inspection, intelligent automation. With human oversight where it matters.

---

## Site Structure

8 sections, single-page layout (same as current), dark theme retained.

### Section 1: Navigation + Hero

**Nav bar:**
- Logo: Xentovia (existing favicon.png + wordmark)
- Links: Capabilities | Solutions | How It Works | Security | Company
- CTA button: "Book a Demo"
- Mobile: hamburger menu with same links

**Hero content:**

- Badge: `Vision AI + GenAI for Enterprise` (replaces "Now in Private Beta")
- Headline:
  ```
  AI Agents That
  See, Understand, and Act.
  ```
- Subheadline: "We build agentic AI solutions that combine Vision AI and Generative AI to solve complex enterprise problems — document intelligence, visual inspection, intelligent automation. With human oversight where it matters."
- Primary CTA: "Book a Demo" (links to Calendly or similar scheduling tool)
- Secondary CTA: "Tell Us Your Problem" (scrolls to Section 7 contact form)
- Trust signals row:
  - SOC 2 (In Progress)
  - End-to-End Encrypted
  - HIPAA-Ready Architecture
  - In Production Today

**Key changes:**
- Removes "Join Waitlist" — enterprise buyers book demos, not waitlists
- Removes all generic workflow automation language
- Trust signals are honest (SOC 2 "In Progress", not "Compliant")

---

### Section 2: Core Capabilities (Three Pillars)

**Section header:**
- Eyebrow: `Core Capabilities`
- Title: "Three pillars. One agentic platform."
- Subtitle: "Every solution we build combines Vision AI, Generative AI, and human oversight into agentic pipelines that deliver verified results."

**Three equal-width pillar cards:**

#### Pillar 1: Document Intelligence
- Tag: `PROVEN`
- Status badge: `In Production`
- Icon: FileText/Scan
- Title: "Agentic Document Intelligence"
- Description: "VLM agents that read handwritten, scanned, and digital documents — extracting structured data from forms, tables, contracts, and free-text. Multi-step validation catches what single-pass extraction misses."
- Capabilities:
  - Handwritten & printed text (multi-language)
  - Tables, forms, mixed layouts
  - Structured JSON output
  - Auto-correction & cross-validation

#### Pillar 2: Visual AI
- Tag: `EXPANDING`
- Status badge: `Available`
- Icon: Eye/Camera
- Title: "Visual Inspection & Analysis"
- Description: "Vision AI agents that inspect, classify, and analyze images and video — from manufacturing quality control to property damage assessment to medical imaging analysis."
- Capabilities:
  - Defect detection & quality grading
  - Damage assessment from photos
  - Image classification & comparison
  - Video frame analysis

#### Pillar 3: GenAI Automation
- Tag: `EXPANDING`
- Status badge: `Available`
- Icon: Brain/Zap
- Title: "Intelligent Workflow Agents"
- Description: "GenAI agents that reason, decide, and act across your business workflows — from claims triage to compliance checks to customer communication. Orchestrate LLMs with domain-specific guardrails."
- Capabilities:
  - Multi-model orchestration (GPT, Claude, Gemini, Llama)
  - Decision logic with guardrails
  - Domain-specific reasoning chains
  - API-driven workflow integration

**Key changes:**
- Replaces generic "Multi-Modal LLM Orchestration", "Low-Code Automation Studio", "Real-Time RAG Engine", "SOC 2-Ready Security" bento cards
- Each pillar maps to real, buildable capability
- Honest status badges: "In Production" vs "Available"

---

### Section 3: Solutions / Use Cases

**Section header:**
- Eyebrow: `Solutions`
- Title: "Real problems. Verified results."
- Subtitle: "We work across industries where complex documents, visual data, and manual processes are costing enterprises time and money."

**Six cards in 3x2 grid:**

#### Card 1: Insurance — Claims & Underwriting
- Icon: Shield
- Pillar tags: `Document Intelligence` `GenAI Automation`
- One-liner: "Extract and validate claims documents, automate submission triage, and accelerate underwriting decisions."
- Example docs: FNOL forms, medical records, policy applications, repair estimates

#### Card 2: Healthcare — Clinical Documentation & Prior Auth
- Icon: HeartPulse
- Pillar tags: `Document Intelligence` `GenAI Automation`
- One-liner: "Process clinical notes, assemble prior auth packages, and extract structured data from medical records."
- Example docs: Lab results, discharge summaries, EOBs, imaging reports

#### Card 3: Mortgage & Financial Services — Loan Processing & Compliance
- Icon: Landmark
- Pillar tags: `Document Intelligence` `GenAI Automation`
- One-liner: "Index loan files, verify income and assets, and automate compliance document checks."
- Example docs: W-2s, tax returns, bank statements, TRID disclosures

#### Card 4: Manufacturing & QC — Visual Inspection & Quality Control
- Icon: Factory
- Pillar tags: `Visual AI`
- One-liner: "Detect defects, grade quality, and monitor production lines with vision AI agents that learn your standards."
- Example inputs: Product photos, assembly line video, packaging inspection

#### Card 5: Government & Public Sector — Record Digitization & Processing
- Icon: Building
- Pillar tags: `Document Intelligence` `Visual AI`
- One-liner: "Digitize handwritten records, process benefits applications, and modernize paper-based archives at scale."
- Example docs: Land records, tax filings, identity documents, court papers
- Proof line (italic): "Currently processing handwritten government land records in production."

#### Card 6: Your Industry — Something Else?
- Icon: MessageCircle
- Pillar tags: All three
- One-liner: "If you have complex documents, visual data, or manual workflows draining your team — we should talk. We build custom agentic solutions for problems that off-the-shelf tools can't handle."
- CTA link: "Tell Us Your Problem ->"

**Key changes:**
- Replaces generic stats section (50+, <50ms, 99.99%, 200+)
- Each card ties to specific industry pain points from market research
- Card 6 is an open invitation for undiscovered verticals
- No fabricated metrics — only industry-sourced outcomes if cited

---

### Section 4: How It Works

**Section header:**
- Eyebrow: `How It Works`
- Title: "Agentic pipelines that deliver verified results"
- Subtitle: "Every solution follows the same architecture — specialized AI agents working in sequence, with human oversight built in."

**Left side — 6 pipeline steps:**

1. **Ingest** — "Send us anything — documents via API, images via S3, video feeds via webhook, or data via email. We handle the format chaos."
   - Supports: PDF, TIFF, JPEG, PNG, email, API, S3, webhook
2. **Understand** — "Vision AI and language models analyze your input — classifying type, detecting structure, reading content, identifying what matters."
   - Works on: Documents, images, video frames, mixed media
3. **Extract & Process** — "Specialized agents pull structured data, detect anomalies, grade quality, or execute reasoning chains — depending on what your problem needs."
   - Outputs: Structured JSON, classifications, decisions, flags
4. **Validate** — "Agentic validation pipeline cross-checks every output — catching inconsistencies, applying business rules, scoring confidence, and auto-correcting known error patterns."
5. **Human Review** — "Low-confidence outputs get routed to your team in a built-in review dashboard. Side-by-side input viewer, inline editing, one-click approve. Your team only touches what the AI isn't sure about."
   - Key message: "You review 10-20%, not 100%"
6. **Deliver** — "Verified results pushed to your systems — structured JSON, Excel, database insert, or direct API call to your CRM, claims system, EHR, or ERP."
   - Integrations: REST API, Webhooks, S3, direct DB, custom connectors

**Right side — tabbed API examples:**

Tab 1: "Document Pipeline"
```json
POST /api/v1/pipeline/run
{
  "type": "document",
  "source": "s3://inbox/claim-4821.pdf",
  "pipeline": "insurance-claims",
  "review_mode": "flag_low_confidence",
  "callback": "https://your-app.com/webhook"
}
```

Tab 2: "Visual Pipeline"
```json
POST /api/v1/pipeline/run
{
  "type": "visual",
  "source": "s3://qc-feed/batch-0412/",
  "pipeline": "defect-detection",
  "threshold": 0.95,
  "callback": "https://your-app.com/webhook"
}
```

Tab 3: "Automation Pipeline"
```json
POST /api/v1/pipeline/run
{
  "type": "workflow",
  "trigger": "new_claim_submitted",
  "agents": ["classify", "extract", "decide", "route"],
  "guardrails": true,
  "callback": "https://your-app.com/webhook"
}
```

**Key changes:**
- Replaces `workflow.yaml` code block with tabbed API examples covering all 3 pillars
- Pipeline is generic enough for docs, visual inspection, and automation
- Dual audience: visual pipeline for business buyers, API for technical evaluators

---

### Section 5: Security & Compliance

**Section header:**
- Eyebrow: `Security & Compliance`
- Title: "Enterprise-grade by design, not by afterthought"
- Subtitle: "Your documents contain sensitive data. Our architecture assumes that from line one."

**Left column — narrative:**
"Every document processed through Xentovia is encrypted in transit (TLS 1.3) and at rest (AES-256). Our agentic pipelines run in isolated tenant environments with full audit trails — every extraction, every validation, every human review is logged and traceable. We're building toward the compliance certifications that US enterprises require — not claiming them before we have them."

**Right column — compliance grid (2x3):**

| Item | Status |
|------|--------|
| SOC 2 Type II | In Progress |
| HIPAA-Ready | Architecture designed for BAA |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Tenant Isolation | Schema-per-tenant, zero cross-access |
| Audit Trail | Every AI decision logged and traceable |
| Data Residency | US, EU, or India — your choice |

**Key changes:**
- Removes false "SOC 2 Compliant" claim
- Removes "99.99% Uptime SLA"
- Honest, verifiable security posture
- Tenant isolation and audit trails are proven (EdunodeX and Akshara)

---

### Section 6: Company / Proof

**Section header:**
- Eyebrow: `Why Xentovia`
- Title: "We don't just talk about AI agents. We ship them."
- Subtitle: "Xentovia Tech builds agentic AI systems that are in production — not pitch decks."

**Three proof blocks (horizontal cards):**

#### Block 1: Vision AI — Government Record Digitization
"Our agentic VLM pipeline processes handwritten Indian land records — Devanagari script across decades-old registers. Multi-step extraction with auto-correction and human review, delivered in government-mandated export formats."
- Tech tags: `Vision Language Models` `Agentic Pipeline` `Handwritten OCR` `HITL Dashboard`

#### Block 2: Full-Stack SaaS — School Management Platform
"We built and operate a multi-tenant SaaS platform serving schools across India — admissions, fees, academics, assessments, and parent engagement. Schema-per-tenant isolation, automated billing, and role-based access for 5 user types."
- Tech tags: `Multi-Tenant SaaS` `Schema Isolation` `API-First` `Production Scale`

#### Block 3: Our Stack
"Full-stack AI engineering team. We own the pipeline end to end — from image preprocessing to VLM extraction to HITL dashboards to API delivery."
- Tech pills: `FastAPI` `Next.js` `PostgreSQL` `Gemini VLM` `OpenCV` `Celery` `Docker` `AWS`

**Founder note:**
> Built by engineers, not a pitch deck.
> Xentovia Tech is founded by Santosh Kumar — a full-stack AI engineer who has built and shipped every product in our portfolio. We're a small, focused team that builds production systems, not prototypes.
>
> [LinkedIn](https://linkedin.com/company/xentovia-ai) | hello@xentovia.ai | +91 788 017 0555

---

### Section 7: CTA / Contact

**Section header:**
- Eyebrow: `Get Started`
- Title: "Have a problem that needs AI agents?"
- Subtitle: "Whether it's messy documents, visual inspection, or manual workflows draining your team — tell us what you're dealing with. We'll tell you if we can help."

**Two-column layout:**

#### Left: Book a Demo
- "See our agentic pipelines in action with your document types."
- Button: "Schedule a Call ->" (links to Calendly)
- Below: "30-minute call. No slides. Live demo with your documents."

#### Right: Tell Us Your Problem
- Form fields:
  - Name (text)
  - Work email (email)
  - Company (text)
  - "Describe your problem" (textarea)
- Button: "Submit ->"
- Below: "We respond within 24 hours."

**Key changes:**
- Replaces email-only waitlist with no backend
- Two CTAs serve different buyer intents: known need vs exploratory
- "Tell Us Your Problem" form is the open door for undiscovered verticals

---

### Section 8: Footer

**Brand tagline:** "Agentic AI solutions for the enterprise" (replaces "Next-gen AI workflow automation for the modern enterprise")

**Link groups:**

- **Product:** Capabilities, Solutions, How It Works, Security
- **Company:** About, Blog, Careers, Contact (mailto:hello@xentovia.ai)
- **Legal:** Privacy Policy, Terms of Service, Security, DPA

**Contact info:**
- Phone: +91 788 017 0555
- Email: hello@xentovia.ai

**Social links:**
- LinkedIn (existing: linkedin.com/company/xentovia-ai)
- GitHub (keep only if linking to real repos, otherwise remove dead icon)
- Twitter/X (keep only if active, otherwise remove dead icon)
- Discord (remove — not relevant for enterprise B2B)

**Copyright:** 2026 Xentovia Tech Private Limited. All rights reserved.

---

## Design & Technical Notes

### What stays from the current site
- Dark theme (space colors: #03050a, #060b18)
- Glassmorphism cards (glass effect with backdrop blur)
- Inter font
- Tailwind CSS via CDN
- Lucide icons
- Scroll-reveal animations
- Glow orb background effects
- Particle field
- Mobile-responsive layout
- Single HTML file architecture

### What changes
- All content and messaging
- Navigation links and CTA
- Bento grid → three-pillar layout
- Stats section → use case cards
- Platform section → pipeline visualization with tabbed API examples
- Security card → full compliance section
- Waitlist → dual CTA (demo + contact form)
- Footer links and tagline

### What gets removed
- "Now in Private Beta" badge
- "Join Waitlist" / email-only form
- All unverifiable claims (50+ models, 200+ integrations, 99.99% uptime, <50ms RAG)
- workflow.yaml code preview
- "Low-Code Automation Studio" feature
- "Real-Time RAG Engine" feature
- Discord social link (unless active)

### Form handling
- "Book a Demo" button links to external scheduling tool (Calendly recommended — free tier works for now)
- "Tell Us Your Problem" form needs a backend. Recommended: **Formspree** (free tier, no backend code needed, sends to hello@xentovia.ai). Alternative: Netlify Forms if hosting migrates, or HubSpot free tier for CRM tracking later.

### SEO considerations
- Update `<title>` to: "Xentovia Tech — Agentic AI Solutions for Enterprise"
- Update `<meta name="description">` to: "We build agentic AI solutions combining Vision AI and GenAI for document intelligence, visual inspection, and workflow automation. Human-in-the-loop verification for enterprise-grade accuracy."
- Add Open Graph tags for social sharing (og:title, og:description, og:image)
- CNAME stays as xentovia.ai

### Scope boundary
- This redesign covers the **main landing page (index.html) only**
- Privacy policy and Terms of Service pages are NOT changed (content is still accurate)
- No new pages are created (no /insurance, /healthcare routes yet)
- No backend changes (static site on GitHub Pages)
- No new dependencies beyond what's already used (Tailwind CDN, Lucide, Inter font)

### Future additions (not in this redesign)
- `/insurance` vertical landing page (when first US insurance customer is signed)
- `/healthcare` vertical landing page
- Blog with thought leadership content
- Customer case studies with real metrics
- Interactive pipeline demo / sandbox
- Pricing page (when pricing model is validated)
- US phone number (when US entity is established)
