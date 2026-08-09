---
title: Prior Authorization: Automating the Packet, Not the Decision
description: Prior auth is slow because assembling and reviewing clinical evidence is manual. Automating that assembly cuts days out of the cycle without touching medical necessity determination.
date: 2026-08-09
tags: [Healthcare, Document Intelligence, Human-in-the-Loop]
highlight: Not the Decision
ctaTitle: Want prior auth packets assembled automatically?
ctaText: We will run your intake — faxes, portal submissions, clinical attachments — and show you what a complete, indexed request looks like on arrival.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Prior authorization consumes an enormous amount of administrative effort on both sides of the transaction, and almost none of it is the clinical judgement the process exists to apply.

On the provider side, staff assemble clinical documentation, complete payer-specific forms, submit through payer-specific channels, and follow up. On the payer side, someone opens the submission, works out what was requested, finds the relevant clinical evidence inside a stack of records, checks it against criteria, and either approves or escalates to clinical review.

The judgement is a small fraction of that. The rest is document handling, and it is where the delay lives.

## Two different automation problems

**Provider side: assembly and submission.** Given a planned service, gather the required documentation from the record, complete the payer's form, and submit through the right channel. The hard part is knowing what each payer requires for each service — a moving target maintained across hundreds of payer policies.

**Payer side: intake and evidence location.** Given a submission, determine what is being requested, find the clinical facts that bear on the criteria, check what is present against what is required, and route. The hard part is that clinical evidence arrives as unstructured records where the relevant sentence may be anywhere in eighty pages.

Both are document problems. Neither requires automating medical necessity.

## Payer-side intake

**Normalise the channel.** Prior auth arrives by fax, portal, EDI, and increasingly by API. Fax remains substantial in many markets and is often the worst-quality input in healthcare — low resolution, poor contrast, sometimes rotated. Treat fax quality as an engineering problem in its own right; upstream image handling improves downstream accuracy more than any prompt change.

**Identify the request.** Member, provider, requested service and codes, diagnosis codes, service dates, place of service, urgency. These are the fields that determine everything downstream and they warrant tight thresholds.

**Resolve against systems of record.** Does the member exist and is coverage active on the service date; is the provider in network; is the requested service one that requires authorisation under this plan. Resolution catches a large share of submissions that would otherwise consume clinical review time before being rejected on administrative grounds.

**Locate clinical evidence.** Given the criteria applicable to the requested service, find the supporting facts in the attached records: relevant diagnoses, prior treatments attempted and their outcomes, duration of symptoms, imaging or laboratory results, contraindications documented.

This last step is where document AI provides the most value and where the design must be most careful. The system should **locate and cite**, not conclude. The output is a set of evidence excerpts with page and location references, mapped to the criteria elements they appear to address — presented to a reviewer who determines whether the criteria are met.

**Check completeness.** Which criteria elements have no supporting evidence in the submission? This produces an immediate, specific request for additional information rather than a generic pend, and it is one of the highest-value outputs of the whole pipeline for both sides.

**Route.** Administratively complete and clearly within criteria goes to a fast path with clinical confirmation. Incomplete goes back with a specific list. Everything else goes to clinical review with the evidence pre-assembled and cited.

## The line that should not be crossed

Medical necessity determination is a clinical decision. In most jurisdictions an adverse determination must be made by an appropriately qualified clinician, and there has been sustained regulatory and legal attention to automated denial practices.

The safe and, in our view, correct architecture:

- The system may identify that criteria **appear to be met** and route for confirmation.
- The system must **never** issue an adverse determination.
- A denial must be made by a qualified reviewer who has seen the evidence.
- Every automated step must be reconstructible: what was extracted, from where, what was shown to the reviewer.

Approval automation and denial automation are not symmetric. Treating them as though they are is the design error that has attracted the most scrutiny in this space.

## Provider-side assembly

The mirror problem, and often the more tractable one.

**Maintain a requirements model** per payer, per service — which form, which channel, which clinical elements. This is a data-maintenance problem more than an AI problem and it is where most of the ongoing effort goes.

**Extract from the record** the elements the requirement calls for, with citations back to the source note so a clinician can verify quickly.

**Assemble and pre-populate** the payer form, flagging what is missing before submission rather than discovering it through a pend.

**Track status** and manage follow-up.

The measurable outcome is fewer submissions pended for missing information, which is the largest single driver of prior auth cycle time. A submission that is complete on first attempt avoids an entire round trip.

## Regulatory direction

Prior authorization is subject to active rulemaking in several markets, with a clear direction of travel: shorter decision timeframes, more transparency about criteria and denial reasons, and electronic interoperability standards to replace fax and portal workflows.

Two implications for anyone building here. First, compressed timeframes make intake automation more valuable, not less — the administrative days that used to absorb slack are the days being removed. Second, systems should be built with the assumption that structured electronic exchange will grow. Document extraction remains necessary for as long as fax and PDF persist, which will be some time, but an architecture that treats the extracted result as a normalised structure rather than as an end product will transition gracefully.

Verify current requirements and timelines with your compliance function; the specifics move.

## What to measure

- **Turnaround time**, from receipt to determination, and separately the administrative portion of it.
- **Pend rate for missing information**, and the share of pends the completeness check would have prevented.
- **First-pass completeness** on provider-side submissions.
- **Evidence location precision** — when the system cites a passage as relevant to a criterion, how often does the reviewer agree? This is the quality metric for the hardest component.
- **Reviewer time per case**, which is where the payer-side saving is realised.
- **Determination outcomes by path**, monitored for any divergence between automated fast-track and standard review. A fast path that produces systematically different outcomes is a finding you want to make yourself.
