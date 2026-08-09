---
title: Indexing a Loan File at Packet Speed
description: A mortgage file is 300 to 800 pages of forty document types in no reliable order. Getting the stacking order right is a prerequisite for everything downstream — and it is automatable.
date: 2026-08-09
tags: [Mortgage, Document Intelligence, Agentic AI]
highlight: Packet Speed
ctaTitle: Want your loan files indexed automatically?
ctaText: Send us a few complete files. We will return them split, classified, indexed and gap-checked.
ctaLabel: Book a Demo
ctaHref: /solutions/mortgage/
---

A residential mortgage file is one of the more demanding document sets in commercial practice. Several hundred pages, forty or more distinct document types, contributed by a dozen parties, arriving over weeks in no reliable order, with duplicates, superseded versions and scanned inserts throughout.

Before anything useful can be done — underwriting, quality control, audit, investor delivery, servicing transfer — someone has to work out what is in it. That indexing task is repeated at every handoff in the loan's life, by different organisations, on the same file.

It is also almost entirely mechanical, which makes it a good automation target.

## Why it is harder than it sounds

**Type boundaries are subtle.** Many mortgage documents share layouts, headers and legal language. Distinguishing a note from an allonge, an initial disclosure from a revised one, a preliminary title report from a final policy, or one of several similar affidavits requires attention to small details rather than gross visual difference.

**Versions matter enormously.** A file contains initial and revised disclosures, multiple appraisal versions, corrected closing statements. Identifying the operative version is not optional — quality control and investor review are specifically concerned with which document governs and whether the sequence was proper.

**Documents nest.** An appraisal contains addenda, photographs and comparable sales analyses. A title commitment contains schedules and exceptions. Whether these are separate documents or parts of one depends on the taxonomy the consumer uses, and different consumers use different taxonomies.

**Signature and execution state is a property, not a type.** The same form appears unsigned, partially signed and fully executed, and the distinction is frequently the point of the review.

**Quality varies within a single file.** Digitally generated documents, wet-signed and scanned documents, faxed inserts, and photographs of documents all appear in the same bundle.

## Building the index

**Split first, carefully.** Boundary detection in a homogeneous 600-page bundle is genuinely hard because pages look alike. Use everything available: page numbering and its resets, form identifiers printed in footers, visual signature changes, content discontinuity, and any separator sheets from the scanning operation. If you influence how files are scanned, separator sheets are the cheapest accuracy gain available.

**Classify hierarchically.** Category first — credit, income, assets, property, title, closing, compliance — then specific type. Errors then degrade sensibly, and much of the downstream routing depends only on the category.

**Extract identity fields per type.** Enough to establish which loan, which party, which version, which date. Borrower name, property address, loan number, document date, execution date.

**Order and version.** Assemble a stacking order and, within each type, determine the sequence and identify the operative document. This is where the index becomes genuinely valuable rather than merely tidy.

**Check completeness** against the expected document set for the loan type, programme and stage. The gap list is often the most immediately useful output.

**Detect duplicates and near-duplicates.** Exact duplicates are trivial. Near-duplicates — a re-signed page, a corrected figure — must be surfaced as related-with-differences rather than collapsed, since the difference is usually the point.

## Extraction that follows

Once indexed, targeted extraction becomes tractable because the schema is known per type. The fields that matter most across the file:

- **Borrower identity**, consistent across every document. Inconsistency is a real defect worth flagging.
- **Property address**, likewise, and resolvable against a reference.
- **Loan amount, rate, term and product**, which must agree between the note, the disclosures and the closing statement.
- **Dates**, which must be in a proper sequence. Date-order violations are among the most common findings in loan file review and are entirely detectable automatically.
- **Signatures and execution**, present or absent, dated appropriately.
- **Income and asset figures**, cross-checked against the calculations that relied on them.

Cross-document consistency checking is where this pays off. A loan amount that differs between the note and the closing disclosure is a finding that would otherwise require a person to compare two documents in a stack of six hundred pages.

## Applications of the same index

The indexing work is done once and serves several purposes, which is why it is a good place to start:

- **Underwriting** — the underwriter opens a file that is organised, complete or explicitly gap-listed, with key figures extracted.
- **Pre-close and post-close quality control** — automated checks for missing documents, date order, signature presence, and cross-document consistency, with exceptions listed rather than discovered by sampling.
- **Investor delivery** — required documents identified and assembled in the required order, with the operative versions selected.
- **Servicing transfer** — the receiving servicer inherits an index rather than rebuilding one.
- **Due diligence** — file review at portfolio scale, where reviewing every file was previously uneconomic and sampling was the only option.

That last case deserves emphasis. When indexing and checking is cheap enough to run on every file rather than a sample, the nature of the assurance changes. Sampling gives you an estimate of the defect rate; full review gives you the defects.

## What to measure

- **Split accuracy** — over-splits and under-splits, tracked separately.
- **Classification accuracy per type**, with the confusion matrix. Pay particular attention to confusions between documents that look alike but govern differently.
- **Version identification accuracy** — was the operative document correctly identified?
- **Completeness-check precision and recall.** A gap list with false alarms trains people to ignore it.
- **Pages per minute and cost per file**, since the economics depend on volume.
- **Time to indexed**, from receipt to a usable file.

## The honest scope

Indexing and consistency checking is a mechanical, high-volume, well-defined problem and it automates well. Underwriting judgement — whether the income is stable, whether the explanation for a credit event is satisfactory, whether the appraisal supports the value — is not the same kind of problem and should not be bundled into the same claim.

The value proposition is straightforward without overreaching: the underwriter or reviewer opens a file that is already organised, already checked for the mechanical defects, with the exceptions listed. That removes a large amount of low-value work from an expensive person's day, which is a good enough outcome to sell on its own merits.
