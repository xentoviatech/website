---
title: Claims Attachments: The Unstructured Half of Healthcare Payments
description: Healthcare claims are largely electronic. The documentation that supports them is not — and that mismatch is where a great deal of payer and provider effort disappears.
date: 2026-08-09
tags: [Healthcare, Document Intelligence, Agentic AI]
highlight: The Unstructured Half
ctaTitle: Want your attachment workflow measured?
ctaText: Send us a sample of the documentation you receive or submit. We will show classification, extraction and completeness checking on it.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Healthcare claims transactions themselves are highly standardised and largely electronic. The supporting documentation is neither.

Operative reports, itemised bills, medical records, coordination-of-benefits letters, appeal documentation, medical necessity evidence, corrected claim explanations — these arrive as faxes, PDFs, portal uploads and paper. Every one requires a person to open it, work out what it is, associate it with a claim, and act.

This is where a large share of the remaining manual effort in healthcare payment operations sits, on both sides.

## The pattern

The attachment problem has the same shape wherever it appears:

1. Something arrives with unclear identity.
2. It must be matched to a claim, which may or may not have been received yet.
3. Its contents must be located and evaluated against a specific question.
4. A decision follows, sometimes automatable and often not.
5. If information is missing, a request goes back, restarting a clock.

Steps 1 through 3 are document processing. Step 5 is where most of the cycle time is lost, and it is the step where automation returns the most.

## Association is the hard part

The single most consequential technical problem is matching an attachment to its claim.

Attachments arrive with varying identification: sometimes a claim number, often only a patient name and date of service, sometimes a provider reference number that means nothing to the receiving system, occasionally nothing useful at all. They may arrive before the claim, after adjudication, or during an appeal.

Robust association requires multi-signal matching: patient identifiers, date of service, provider identifiers, billed amounts, procedure codes, and any explicit reference. Each signal is individually unreliable; in combination they are usually sufficient.

Two design points matter. Association should return a **confidence and candidates**, not a single answer — a low-confidence match presented to a person as "we think this belongs to one of these two claims" is resolved in seconds, while a silent wrong match is a serious error that surfaces much later. And unmatched attachments need a managed queue with ageing, because they are the population where things get lost.

## Classification, then targeted extraction

Once associated, the document type determines what to do.

**Itemised bills** need line-item extraction with arithmetic validation — the lines must reconcile to the total, and they must reconcile to the claim. This is a strong self-checking workflow and a good early automation target.

**Operative and procedure reports** are usually needed to answer a specific question: was this procedure performed, bilaterally or unilaterally, with what findings. Evidence location with citation, not summarisation.

**Coordination-of-benefits documentation** yields other-coverage details and payment amounts — structured fields with clear validation against the claim.

**Appeal documentation** needs the argument identified, the evidence cited, and the deadline extracted. Deadline extraction is the highest-value field here, since appeal timeliness is procedurally decisive.

**Medical necessity documentation** is the criteria-matching problem discussed in our prior authorization post: locate and cite the evidence, let a qualified reviewer determine sufficiency.

Note that several of these need only *location and citation*, not full extraction. Recognising which is which keeps cost and risk proportionate.

## Completeness checking, again

The recurring theme across healthcare document workflows: knowing what is missing is worth more than perfectly extracting what is present.

Given a claim type, a procedure, and a payer requirement set, the expected documentation is largely knowable. A system that identifies gaps immediately — rather than after a reviewer opens the file days later — collapses the round trip that dominates cycle time.

On the provider side, the same check run before submission prevents the round trip entirely. That is the highest-return application of this technology in revenue cycle operations, and it requires no decision automation whatsoever.

## What stays human

**Medical necessity determination**, as discussed previously. The system locates and cites evidence; a qualified clinician decides, and adverse determinations require clinical review.

**Appeal outcomes.** Automating the identification of what an appeal argues and what evidence supports it is useful. Automating whether the appeal succeeds is not appropriate.

**Anything with a coverage denial consequence.** Route with evidence assembled; do not decide.

**Novel or ambiguous documentation.** Escalate rather than force-fit to the nearest known type.

## Practical measures

- **Association accuracy**, and specifically the wrong-claim rate, which is the serious failure.
- **Unmatched backlog and its age.** A leading indicator of downstream problems.
- **Time from receipt to actionable** — associated, classified, extracted, in the right queue.
- **Completeness-check precision.** A gap list that is wrong erodes trust with providers or payers quickly.
- **Round trips per claim**, before and after. The metric the cycle-time improvement actually comes from.
- **Reviewer time per attachment.**

## The direction of travel

Electronic attachment standards continue to develop, and structured exchange will gradually reduce the volume of documents that need to be interpreted rather than parsed. That transition has been underway for a long time and will take longer still, because it requires coordinated adoption across a very large number of participants.

The sensible architecture assumes both states coexist for years: process what arrives as documents today, but normalise the result into the same structured representation you would receive electronically. Systems built that way get progressively cheaper to run as more volume arrives structured, rather than needing to be replaced.
