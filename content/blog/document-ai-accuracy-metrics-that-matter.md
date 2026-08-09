---
title: Character Accuracy Is a Vanity Metric. Measure These Four Instead.
description: A vendor quoting 99% accuracy is telling you almost nothing useful. Here are the four numbers that actually predict whether a document AI deployment will save money.
date: 2026-08-09
weight: 50
tags: [Document Intelligence, Evaluation, Procurement]
highlight: Vanity Metric
ctaTitle: Want these four numbers for your own documents?
ctaText: Send us a representative sample. We will report field accuracy, STP rate, escaped error rate and cost per corrected document — measured, not estimated.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Every document AI vendor quotes an accuracy figure, and almost every one of those figures is unfalsifiable. "99.2% accurate" invites an obvious question that rarely gets asked in the sales meeting: accurate at what, measured how, on which documents?

The number being quoted is usually character accuracy — the percentage of individual characters the system transcribes correctly. It is the easiest metric to make look good and the least connected to whether the deployment pays for itself. This post is about the four numbers that are connected, and how to make a vendor produce them.

## Why character accuracy misleads

Consider a policy number: `AX-4471-99B`. Eleven characters. A system that gets ten of them right scores 90.9% character accuracy, which sounds like a passing grade. But the field is wrong. The claim routes to the wrong policy, or fails validation and lands in an exception queue. From the business's point of view, that extraction was a total loss, not a 91% success.

Now scale that. A page with 2,000 characters and 30 fields might score 99% character accuracy while getting six fields wrong — because errors are not distributed evenly across a page. They cluster exactly where the document is hardest and the data matters most: handwritten margins, poorly scanned corners, low-contrast stamps, columns where the ruling has faded.

Character accuracy also rewards the wrong behaviour. A system that transcribes every character it sees will beat one that flags an illegible field as uncertain, even though the second system is far more useful in production, because it tells you where to look.

## The four numbers to ask for

### 1. Field-level accuracy, per field

The percentage of extracted fields that exactly match a human-verified ground truth. Not per character, not per document — per field, and broken out by field name.

This breakdown is where the truth lives. A summary field accuracy of 94% can hide a `date_of_loss` field at 71% and a `claim_number` field at 99.8%. Those two failures have completely different costs. Insist on the per-field table, and insist that it includes the fields you actually care about rather than the easy ones.

Define "exact match" carefully in advance. Is `01/02/2026` a match for `2026-02-01`? Is `Acme Corp.` a match for `ACME CORPORATION`? Normalisation rules can move a headline number by several points, so agree on them before the benchmark runs, not after.

### 2. Straight-through processing (STP) rate

The percentage of documents that pass end to end with no human touching them at all.

STP is the metric that converts most directly into money, because the cost of a document is dominated by whether a person had to open it. A pipeline at 60% STP means 40% of your volume still needs staffing. Going from 60% to 80% halves that load; going from 94% to 96% barely moves it.

The trap is that STP is trivially gameable. Lower the confidence thresholds and everything sails through untouched — with errors in it. STP is only meaningful when reported alongside the next number.

### 3. Escaped error rate

The percentage of documents that were auto-approved and were nonetheless wrong.

This is the number nobody volunteers, and it is the one that determines your risk exposure. In a regulated workflow, an escaped error is not an inconvenience; it is a mis-paid claim, an incorrect prior authorisation, a loan file that fails audit.

Measuring it takes deliberate effort, because by definition these documents were never reviewed. The standard approach is a blind sample: pull a random slice of auto-approved documents each week, have a reviewer verify them against the source, and track the error rate over time. Any vendor who has run a serious production deployment will already have this instrumentation. Ask to see it.

STP and escaped error rate move against each other. The pair of them, plotted together, is the real performance curve of a document AI system. A single point on that curve tells you nothing.

### 4. Cost per corrected document

The all-in cost of getting one document to a state you would be willing to defend: inference cost, plus the reviewer minutes spent on the documents that needed review, plus the rework cost of errors caught downstream.

This is the number that decides build-versus-buy and vendor-versus-vendor. A system with lower field accuracy but a well-designed review interface can easily beat a more accurate system with a bad one, because reviewer seconds per exception dominates the arithmetic at volume.

A rough model:

```
cost_per_doc = inference_cost
             + (1 - stp_rate) x review_minutes x loaded_hourly_rate / 60
             + escaped_error_rate x downstream_rework_cost
```

Put your own numbers in it. The third term is the one that surprises people — a 2% escaped error rate on a workflow where each error costs a few hundred dollars to unwind will dominate everything else.

## How to run the benchmark

The metrics only mean something if the test set does.

- **Use your own documents.** A vendor's demo corpus has been implicitly optimised against for months. Insist on a sample drawn from your real intake.
- **Sample the tail, not the average.** Take a stratified sample: clean scans, poor scans, the unusual formats, the vendor-specific variants, the ones your team complains about. If 15% of your volume is hard, make 15% of the test set hard.
- **Include documents that should be rejected.** Blank pages, duplicates, the wrong form type, a fax cover sheet. A system that confidently extracts fields from a page that is not the document it thinks it is will do real damage in production.
- **Hold out the ground truth.** Have your own team key the answers independently and keep them back. If the vendor is tuning against the answer key, you are measuring the wrong thing.
- **Size it properly.** A hundred documents is enough for a smell test and not enough for a decision on a field that appears in 5% of pages. If a field matters and it is rare, oversample it deliberately.

## The questions that separate real systems from demos

- Show me field-level accuracy per field, on our documents, with the normalisation rules written down.
- Plot STP against escaped error rate as I vary the confidence threshold. What does the curve look like?
- How do you measure escaped errors today in a live account?
- When a new document variant appears, what changes — a prompt, a config, or an engineering ticket? How long does that take?
- What does the reviewer see when a field is uncertain? Can I watch someone use it?

That last question is worth more than most of the technical ones. Exception handling is where document AI deployments live or die, and a review interface that forces a person to hunt across a page for the field in question will quietly destroy the business case no matter how good the model is.

## Where accuracy is genuinely the wrong frame

Some workflows do not care about per-field accuracy at all. If you are routing documents to the right queue, what matters is classification accuracy and the cost asymmetry between the two kinds of mistake. If you are searching an archive, recall at a given precision matters more than exact extraction. If you are summarising for a human who will read the source anyway, faithfulness matters and field accuracy does not apply.

Match the metric to the decision the system is actually making. The point of all four numbers above is not to be rigorous for its own sake — it is that they are the ones you can put into a spreadsheet and defend to a CFO.
