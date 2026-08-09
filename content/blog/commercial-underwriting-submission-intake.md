---
title: Submission Intake Is the Real Bottleneck in Commercial Underwriting
description: Underwriters spend a large share of their time assembling submissions rather than underwriting them. Automating intake raises quote capacity without touching a single pricing decision.
date: 2026-08-09
tags: [Insurance, Document Intelligence, Agentic AI]
highlight: The Real Bottleneck
ctaTitle: Want more quote capacity without more underwriters?
ctaText: We will run your submission inbox and show what a clean, complete, pre-validated file looks like on arrival.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Commercial underwriting capacity is usually described as an underwriter problem. It is more often a submission problem.

A broker sends an email with seven attachments. Someone opens each one, works out what it is, checks whether the submission is complete, keys the details into the rating system, chases the missing loss runs, and only then does an underwriter look at the risk. By the time judgement is applied, most of the elapsed time and a large share of the labour has gone to assembly.

Automating that assembly increases quote capacity without automating a single underwriting decision — which makes it both the highest-return and the lowest-risk automation in commercial lines.

## What a submission actually contains

A typical commercial submission bundle includes some subset of:

- An application form, often the industry standard form for the line.
- Supplemental applications specific to the class of business.
- Loss runs from prior carriers, usually as PDFs in each carrier's own format.
- A statement of values or schedule of locations.
- Financial statements for larger risks.
- A broker cover email carrying material context that appears nowhere else.
- Photographs, inspection reports, and safety documentation.

The cover email deserves particular attention. It routinely contains the target premium, the incumbent carrier, the reason the account is marketing, the decision timeline, and what the broker needs. That is the most decision-relevant content in the bundle and it is unstructured prose in an email body, which is why it is so often lost.

## The pipeline

**Ingest from the channel underwriting actually uses** — a shared mailbox, most likely, plus a broker portal if one exists. Preserve the email body as a first-class document, not as metadata.

**Split and classify** the attachments. Loss runs, applications, statements of values and financials all need different handling.

**Extract per type.** Applications yield the structured risk data. Statements of values yield location schedules with construction, occupancy, protection and exposure details. Loss runs yield claim histories. Financials yield the figures used for exposure sizing.

**Normalise loss runs.** This is the hardest and most valuable piece, and it gets its own section below.

**Check completeness** against what this class of business and this premium size require. Produce the list of what is missing before anyone has looked at the file.

**Resolve and enrich.** Match the insured against existing records and any prior submissions. Resolve addresses. Look up classification codes. Flag whether this account has been seen before, from another broker, at a different time — a genuinely useful thing to know early.

**Pre-validate.** Cross-check the application against the statement of values, the loss runs against the stated loss history, the entity name across every document. Discrepancies here are the questions the underwriter would have asked anyway.

## Loss runs are the hard part

Every carrier formats loss runs differently. They are tables — often multi-page, often with merged cells, often with subtotals repeated per page, sometimes with a summary section whose numbers do not obviously reconcile to the detail.

Normalising them into a comparable claim history is genuinely difficult and genuinely valuable, because an underwriter cannot assess an account until the loss history is in one comparable shape.

Specific things that matter:

- **Detect the carrier and format** first; treat an unrecognised format as an explicit exception rather than guessing.
- **Distinguish paid, incurred, reserved and recovered.** These get conflated constantly and the difference is material.
- **Handle open versus closed claims** and the valuation date. A loss run valued six months ago tells a different story from one valued last week, and the valuation date is a field, not a footnote.
- **Reconcile detail to summary.** If the individual claims do not sum to the stated totals, something is wrong — a page missing, a continuation misread, a subtotal double-counted. This check catches most extraction errors in loss runs automatically.
- **Watch for claims spanning policy periods** and for the same claim appearing in more than one run.

Get this right and the underwriter receives a normalised loss history across every prior carrier in a single view. That alone is often the strongest argument for the whole project.

## Completeness is the highest-value output

Underwriters lose more time to incomplete submissions than to any other single cause. A file that cannot be quoted sits, gets chased, and returns days later still missing something.

A completeness check that runs within minutes of receipt — and produces a specific list back to the broker the same hour — compresses that cycle dramatically. It requires no judgement, carries essentially no risk, and is often the feature brokers appreciate most, because they would rather be told immediately than a week later.

Make the requirements configurable by line, class and premium band, and let underwriting own that configuration. The rules change and they should not require an engineering ticket.

## Explicitly not automated

The underwriting decision. Appetite screening can be automated as documented rules over extracted facts — class of business, geography, limits, loss history thresholds — and that is a genuine efficiency gain that routes out-of-appetite submissions quickly.

Pricing, terms, and the decision to decline for judgement-based reasons stay with the underwriter. The system's job is to deliver a complete, normalised, validated file with the questions already surfaced. That is where the capacity gain comes from, and it does not require touching anything a regulator or a reinsurer would want to examine closely.

## What to measure

- **Time from receipt to a complete, quotable file.**
- **Share of submissions where the missing-item list was correct** — both false alarms and missed gaps, since a wrong list erodes broker trust quickly.
- **Loss-run reconciliation rate**, the best available proxy for extraction quality on the hardest documents.
- **Underwriter time per submission**, before and after. The metric the business case rests on.
- **Quote turnaround and hit rate.** Speed to quote is a competitive variable in commercial lines, and the second-order effect on hit rate is usually the largest financial outcome of the whole programme.
