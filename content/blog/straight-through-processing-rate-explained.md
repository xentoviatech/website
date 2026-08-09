---
title: What Straight-Through Processing Rate Really Tells You
description: STP is the single most quoted number in document automation and the easiest to inflate. Here is how to read it honestly, and why the STP-versus-error curve matters more than any single figure.
date: 2026-08-09
weight: 46
tags: [Document Intelligence, Evaluation, Human-in-the-Loop]
highlight: Really Tells You
ctaTitle: Curious where your STP curve sits today?
ctaText: We will run your documents through the pipeline and show you the full threshold curve, not a single flattering point on it.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Straight-through processing rate is the percentage of documents that go from intake to a finished record without a person touching them. It is the number executives ask for, the number that appears on business cases, and the number that determines headcount plans.

It is also, on its own, close to meaningless — because you can set it to any value you like by moving a threshold.

## The dial nobody mentions

Every confidence-gated pipeline has the same basic shape. The model extracts fields and attaches a confidence to each. A rule decides which documents are safe to auto-approve. Everything else goes to a reviewer.

That rule is a dial. Turn it one way and STP climbs while more errors slip through unreviewed. Turn it the other and STP falls while the review queue grows. Nothing about the model has changed. The number moved because someone chose a different operating point.

This is why "our system achieves 92% STP" is not a claim about capability. It is a claim about where a threshold was set, and it is incomplete without saying what the error rate was at that setting.

## The curve, not the point

The honest artefact is a curve: STP on one axis, escaped error rate on the other, traced by sweeping the confidence threshold across its range. Every real system has one. It is the document AI equivalent of a precision-recall curve, and it answers the question that actually matters — *at the error rate my compliance function will accept, how much automation do I get?*

Two systems can both report 85% STP and be nowhere near equivalent:

| | System A | System B |
|---|---|---|
| STP at 0.5% escaped error | 85% | 61% |
| STP at 2% escaped error | 91% | 85% |
| STP at 5% escaped error | 93% | 94% |

System B looks competitive if you only ever quote the loose setting. At the tolerance a regulated workflow would actually run at, it automates two thirds of what System A does. The difference is not the headline accuracy — it is calibration, which is to say how well the model's confidence corresponds to whether it was right.

## Calibration is the property that matters

A well-calibrated system is one where a field scored 0.9 is right about 90% of the time. That sounds obvious and it is surprisingly rare. Many models are confidently wrong in a systematic way — particularly on inputs unlike anything in training, which is exactly where you need the confidence signal to work.

You can measure calibration directly. Bucket every extraction by its confidence score, then compute the observed accuracy within each bucket:

| Confidence bucket | Fields | Observed accuracy |
|---|---|---|
| 0.95 – 1.00 | 41,200 | 99.4% |
| 0.90 – 0.95 | 6,800 | 96.1% |
| 0.80 – 0.90 | 3,100 | 88.7% |
| 0.60 – 0.80 | 1,900 | 71.2% |
| below 0.60 | 900 | 34.5% |

Read down the right-hand column. If observed accuracy tracks the bucket, thresholds mean something and you can choose an operating point deliberately. If the 0.95+ bucket is only 91% accurate, the confidence score is decorative and your STP number is built on sand.

Building this table for your own workflow takes one afternoon of reviewer time on a sample. It is the highest-value hour of analysis in a document AI evaluation.

## Field-level versus document-level gating

There is a design choice underneath STP that changes the economics substantially: does a single low-confidence field send the whole document to review, or only that field?

Document-level gating is simpler and much more wasteful. On a 30-field form where each field is independently 98% likely to be confident, the probability that *all thirty* clear the bar is about 55%. Your STP ceiling collapses not because the model is weak but because you multiplied thirty numbers together.

Field-level review — where the reviewer is shown only the three uncertain fields, cropped from the page, with the rest already accepted — is a different workflow. The same model produces far higher effective throughput because the unit of human work is a field, not a document. If a vendor's review screen shows you the whole page and asks you to check everything, that is a meaningful limitation, not a UI preference.

## What legitimately raises STP

Setting aside threshold games, these are the changes that move the curve rather than sliding along it:

- **Better inputs.** Scan quality, resolution, deskewing, and rejecting unreadable pages at capture time rather than discovering them downstream. This is unglamorous and frequently the largest single lever.
- **Cross-field validation.** Sums that must reconcile, dates that must be ordered, identifiers that must match a system of record. Validation both catches errors and *raises* confidence on fields that agree, converting would-be reviews into auto-approvals.
- **Lookups against known data.** If a policy number resolves to a real policy whose insured name matches the extracted name, two fields just corroborated each other. Reference data is the cheapest accuracy improvement available.
- **Feeding corrections back.** Reviewer edits are labelled data generated for free by work you are already paying for. A pipeline that does not capture and use them is discarding its best asset.
- **Handling document variants explicitly.** Most STP shortfalls trace to a handful of formats the system has never handled well. Segment your error rate by document type and the fix list usually becomes short and obvious.

## Reasons a good STP number can still be a bad sign

- **The denominator was trimmed.** If documents that fail classification, arrive as unreadable scans, or don't match a known type are excluded before the metric is computed, STP is measured on the easy remainder. Always ask what fraction of raw intake reaches the pipeline at all.
- **Rework is invisible.** A document auto-approved and then corrected two steps downstream by an adjuster still counts as straight-through in most dashboards. Instrument downstream corrections or your STP will drift from reality.
- **The queue absorbs the cost.** High STP with a review queue that grows without bound is a deferral, not an improvement. Watch queue depth and reviewer time per exception alongside the rate.

## A reasonable target

There is no universal right answer, and anyone quoting one has not looked at your documents. What is fair to say:

Clean, structured, single-format inputs with reference data to validate against can run very high, and 90%+ is a normal expectation. Mixed-quality intake with many variants — the typical enterprise reality — more often lands somewhere in the 60–80% band at a conservative error tolerance, with the remainder handled far faster than manual entry because the reviewer is correcting rather than keying.

The second case is still an enormous win. A pipeline that eliminates two thirds of manual handling and makes the remaining third three times faster changes the cost structure of an operation. Insisting on a 95% headline number, and choosing a vendor willing to promise it, is how organisations end up with an escaped error problem instead.
