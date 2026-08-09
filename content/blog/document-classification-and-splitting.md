---
title: Classification and Splitting: The Step Everyone Skips
description: Most document AI failures happen before extraction, when a 40-page bundle is treated as one document or routed to the wrong parser. Here is how to build the step that decides everything downstream.
date: 2026-08-09
tags: [Document Intelligence, Agentic AI, Evaluation]
highlight: The Step Everyone Skips
ctaTitle: Drowning in mixed document bundles?
ctaText: Send us a week of raw intake, exactly as it arrives. Splitting and classification is usually where the fastest wins are.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Almost every document AI pilot begins with a clean folder of one document type. Almost every production system begins with an inbox.

What arrives in the inbox is a 40-page PDF containing a cover email, a signed form, twelve pages of supporting statements, a duplicate of the form someone re-scanned, and three blank pages from the feeder. Before anything can be extracted, something has to decide where each document starts, what type it is, and whether it is worth processing at all.

This step gets skipped in pilots and it is where a large share of production failures originate.

## Two problems that are usually conflated

**Splitting** — finding the boundaries between logically separate documents inside one file. **Classification** — deciding what each resulting document is.

They interact, which is why they are often merged into one model call, and why that tends to go wrong. Boundaries are frequently only obvious once you know the type ("this is page 2 of a two-page form"), and type is frequently only determinable once the boundary is right. Treating them as a single opaque step means you cannot tell which one failed.

The more robust structure is a loop: propose boundaries, classify each candidate, use the classifications to revise the boundaries, then settle. This is a natural fit for an agentic pipeline, where a small number of specialised steps each do one thing and a controller reconciles them.

## Signals that actually determine boundaries

- **Visual page signatures.** Form layouts, letterheads, footers, logos. A page that looks nothing like the previous one is usually a new document, and this signal survives poor scan quality better than text-based ones.
- **Page numbering.** "Page 1 of 4" is the strongest boundary signal available when present. Detecting a reset from 4 back to 1 is worth a dedicated check.
- **Explicit separators.** Barcode or QR separator sheets inserted at scan time are near-perfectly reliable. If you control the scanning operation and are not using them, that is the cheapest accuracy improvement on this list.
- **Content discontinuity.** A sentence that ends mid-clause at the bottom of a page and does not continue at the top of the next is evidence of a boundary.
- **Metadata.** Email attachment boundaries, file names, per-file scan timestamps. Frequently discarded during ingestion and frequently the most reliable signal in the pile.
- **Expected structure.** If a submission type is known to contain specific documents, the expected set constrains the interpretation considerably.

Blank-page detection deserves its own mention: it must be tolerant of scanner noise, and it should distinguish a genuinely blank separator page from a page whose content failed to capture. Those two look similar and mean opposite things.

## Classification in practice

A few design choices matter more than model selection.

**Include a reject class.** The taxonomy must contain "unknown" and "not a document we handle". A classifier forced to choose among known types will assign every stray fax cover sheet to the nearest match, and downstream extraction will then confidently produce fields from a page that is not that form. This is one of the most damaging failure patterns in production and it is entirely preventable.

**Classify hierarchically.** Coarse category first — correspondence, financial statement, identity document, form — then the specific type within it. Errors then degrade sensibly: misclassifying between two form variants is recoverable; misclassifying a bank statement as a passport is not.

**Handle multi-label reality.** Some documents legitimately belong to more than one type, and some are a form with an attachment. Forcing single-label output produces arbitrary tie-breaks.

**Use confidence for routing, not just reporting.** Low-confidence classifications should go to a human *before* extraction, not after. A person spending five seconds picking a type from a list is enormously cheaper than an extraction run against the wrong schema and the cleanup that follows.

**Track drift.** The distribution of incoming types changes — a new counterparty, a form revision, a seasonal pattern. Monitoring the type mix over time surfaces these long before anyone reports a problem.

## What to measure

Splitting and classification need their own metrics; folding them into a single end-to-end accuracy number hides the failure that caused everything else.

- **Boundary precision and recall.** Under-splitting (two documents merged) and over-splitting (one document torn in half) fail differently. Under-splitting usually produces extraction against a mixed page set; over-splitting produces truncated documents missing required fields. Track them separately.
- **Classification accuracy per type**, with the confusion matrix. The aggregate is not actionable; "we route 8% of type A to type B" is.
- **Reject-class recall.** Of the documents that should have been flagged as unhandled, how many were? This is the guard against silent nonsense downstream and is routinely unmeasured.
- **Cascade rate.** Of all extraction failures, what fraction trace back to a splitting or classification error? In systems where this has been measured properly it is often a large fraction — and it redirects engineering effort to where the leverage actually is.

## Where the leverage is

If your extraction accuracy is disappointing and you have not instrumented this step, instrument it first. Repeatedly, teams tuning prompts to squeeze out another point of field accuracy are working on documents that were split or typed incorrectly to begin with — the extraction was fine, it was reading the wrong page.

The other high-leverage move is upstream of software entirely. If you influence how documents arrive — separator sheets, a submission portal with per-document upload slots, a required cover form, a minimum scan resolution — that intervention will beat any model improvement, permanently and for free.
