---
title: Build or Buy Document AI: An Honest Decision Framework
description: Foundation model APIs made the first 70% of a document pipeline easy to build, which is exactly why so many in-house projects stall. Here is where the real work is, and how to decide.
date: 2026-08-09
weight: 42
tags: [Document Intelligence, Procurement, Agentic AI]
highlight: An Honest Decision Framework
ctaTitle: Weighing build against buy?
ctaText: We are happy to be a data point in your evaluation — including telling you when building it yourself is the right call.
ctaLabel: Talk to Us
ctaHref: /#contact
---

A capable engineer can wire a vision model to a document, get structured JSON back, and demo it convincingly inside a week. This is genuinely new, and it has changed the build-versus-buy calculation — mostly by making the wrong answer easier to reach.

The demo is not the hard part. It never was. The hard part is everything between a working prototype and a system your operations team trusts at three in the morning when the intake queue is backed up.

## What the prototype does not include

Here is the work that separates a demo from a deployment, roughly in the order teams discover it.

**Ingestion reality.** Documents do not arrive as clean PDFs. They arrive as email attachments with the real document as the third page of a scanned bundle, as faxes, as photographs taken at an angle in poor light, as ZIP files, as password-protected PDFs, as TIFFs with sixteen pages of which four matter. Splitting a bundle into logical documents and classifying each one is a substantial subsystem in itself, and it sits *upstream* of the extraction everybody was excited about.

**The review interface.** Somebody has to correct what the model got wrong, and how fast they can do it determines your unit economics more than model accuracy does. A good review screen shows the cropped source region beside the field, pre-focuses the first uncertain field, supports keyboard-only operation, and never makes a reviewer scroll to find what they are verifying. Teams routinely budget a sprint for this and spend a quarter.

**Evaluation infrastructure.** You cannot improve what you cannot measure, and measuring document extraction means a labelled corpus, a scoring harness with agreed normalisation rules, per-field breakdowns, and regression tests that run on every prompt change. Without it, every model or prompt update is a coin flip — and prompt changes have non-local effects, so the coin gets flipped often.

**Handling change.** New document variants appear continuously: a carrier updates a form, a new counterparty uses a different layout, a regulator adds a field. The question is not whether your system handles today's documents but how long it takes to handle a new one, and whether that path requires an engineer.

**Operational scaffolding.** Retries, idempotency, rate limits, cost controls, dead-letter queues, audit logs of who changed which field and when, PII handling and redaction, retention policies, per-tenant isolation. None of it is interesting. All of it is required before a compliance function will sign off.

**Model churn.** The underlying models change every few months. Each change is an opportunity and a regression risk. Somebody has to own that treadmill indefinitely.

## When building is the right call

Building is a good decision more often than vendors admit. It makes sense when:

- **Documents are your product.** If document understanding is a differentiating capability rather than a cost centre, owning it is strategic and the learning compounds.
- **Volume is very high and the corpus is narrow.** Millions of pages of two or three formats justifies specialised work that no general vendor will do for you, and amortises the engineering across a huge denominator.
- **Data cannot leave your environment, at all.** Some constraints genuinely rule out third parties. Note that this is less absolute than it used to be — private and in-VPC deployment is now a normal vendor offering — but the constraint is real in some sectors.
- **You already have the adjacent muscle.** A team that runs ML systems in production, with evaluation infrastructure and on-call maturity, is starting from a very different place than one that does not.
- **The workflow is deeply idiosyncratic.** If the extraction is inseparable from proprietary business logic, integration cost may swamp any vendor's head start.

## When buying is the right call

- **Documents are a tax, not a moat.** Nobody wins a market on faster claims intake alone. If it is overhead, treat it as overhead.
- **The corpus is broad and messy.** Many formats, many counterparties, constant variation. This is where a vendor's accumulated handling of edge cases is worth the most, and where in-house projects most often stall at "works on the top ten formats".
- **You need it working this quarter.** A realistic in-house timeline to production quality is measured in quarters, not sprints.
- **Compliance artefacts are on the critical path.** SOC 2, a BAA, penetration test reports, subprocessor lists, DPAs. Producing these internally is a project of its own.
- **Nobody wants to own it in year three.** The person who builds it will move on. Long-run ownership of an internal ML system is a real cost that rarely appears in the business case.

## The honest cost comparison

Most build-versus-buy spreadsheets compare a vendor's annual fee against a few months of engineering time. That is not the comparison.

**Build, year one:** engineering to production quality; the review tooling; the evaluation corpus and harness; infrastructure and inference; security and compliance work; and the opportunity cost of what that team did not build instead.

**Build, ongoing:** at least a part-time owner indefinitely, model migration work, new-variant handling, on-call, and the eventual rewrite when the original author leaves.

**Buy, year one:** licence, integration engineering (real, and usually underestimated), vendor evaluation, security review.

**Buy, ongoing:** licence growth as volume grows, plus the risk that the vendor's roadmap diverges from your needs — mitigated by data portability terms and an exit plan you negotiate at signing rather than during a dispute.

The pattern worth noticing: build costs are mostly fixed and mostly hidden; buy costs are mostly variable and mostly visible. Organisations systematically underestimate the first kind.

## The hybrid that usually works

The most defensible architecture in practice is neither pure option. Own the parts specific to you; rent the parts that are not.

- **Own** the document model, the business rules, the validation logic, the systems of record, and the labelled evaluation corpus. That corpus is the asset with the longest half-life — it outlives any model or vendor and is what makes switching possible.
- **Rent** extraction, classification, and the review tooling.
- **Insist on portability.** Extracted data in an open format, exportable at any time; your evaluation set stays yours; no lock-in through proprietary storage of your source documents.

This keeps the strategic layer in-house while avoiding a permanent internal team maintaining a commodity.

## Two questions that settle it

If the decision is genuinely balanced, these tend to break the tie:

**Will this system still have an owner in three years?** If you cannot name the team, build is the wrong answer regardless of the spreadsheet.

**If a new document variant appeared tomorrow, who fixes it and how long does it take?** Answer it for both options honestly. That number, more than accuracy, is what your operations team will experience as the quality of the system.
