---
title: Your Reviewers Are Generating Training Data. Are You Keeping It?
description: Every correction a human makes is a labelled example produced by work you already paid for. Most pipelines throw them away. Here is how to capture and use them.
date: 2026-08-09
tags: [Human-in-the-Loop, Evaluation, Agentic AI]
highlight: Are You Keeping It?
ctaTitle: Want corrections to make the system better?
ctaText: We will show you how the feedback loop works — what gets captured, and how it turns into fewer exceptions next month.
ctaLabel: Book a Demo
ctaHref: /#contact
---

A reviewer opens an exception, sees that the extracted date is wrong, types the right one, and moves on. In most deployments, that correction updates one record and is never used again.

It was a labelled training example. It was produced by a domain expert looking at the exact case the system found hardest. And you paid for it either way. Discarding it is the most common waste in document AI operations, and closing that loop is usually the cheapest quality improvement available.

## What to capture

The corrected value alone is not enough to be useful later. Capture the full context:

- The original extraction and its confidence.
- The corrected value.
- The source region — page and coordinates — so the example can be re-examined without reconstructing anything.
- Why the item was flagged: low confidence, failed rule, or sampled at random.
- Document type, source or sender, and processing timestamp.
- Which reviewer, and how long they took.
- Optionally, a reason code chosen from a short list.

That last one is worth the small friction it adds. "Model misread", "document ambiguous", "our rule was wrong", "upstream data was stale" are four completely different problems, and only a human can tell them apart at the moment of correction. Without it, months later, all four look identical in the data.

Keep the reason list short — five or six options — or reviewers will default to the first one.

## What to do with it

### 1. Grow the evaluation corpus

The most valuable use and the easiest to implement. Corrections are, by construction, cases the system got wrong — exactly what a test set needs and exactly what a corpus assembled at project start will lack.

Feed them in with a sampling policy, not wholesale: a corpus that becomes 90% hard cases stops representing production, and metrics computed on it will not predict live performance. A common approach is to keep the corpus stratified to match production while ensuring every distinct failure *mode* is represented at least a few times.

### 2. Find systematic errors

Aggregate corrections by field, document type and sender. Systematic patterns emerge quickly and each one is a fixable defect rather than a model limitation:

- One field consistently corrected in the same direction — usually a prompt or schema definition issue.
- One sender's documents generating disproportionate corrections — usually a format variant nobody registered.
- A field's correction rate rising over time — usually an upstream change.
- A validation rule firing constantly and always being overridden — the rule is wrong, and it is costing you exceptions every day.

That last case is worth hunting specifically. A bad rule manufactures work indefinitely and looks like model error in every dashboard.

### 3. Tune thresholds with evidence

Corrections tell you where confidence is trustworthy. If a field is corrected 40% of the time when confidence is between 0.8 and 0.9, that band should not auto-approve. If another field is essentially never corrected above 0.7, its threshold is too tight and you are paying for review you do not need.

Threshold tuning from correction data is the fastest route to STP improvement in a mature deployment, because it requires no model change at all — just evidence you already have.

### 4. Improve prompts and schemas

A cluster of corrections on the same field usually points at a definition problem, not a perception problem. If `date_of_loss` is regularly corrected to a different date that also appears on the page, the schema does not say clearly enough which date is wanted. Sharpen the definition, add an example, then verify against the harness.

### 5. Retire exception classes entirely

The best outcome: a correction pattern that has a deterministic fix. If a particular sender always formats amounts with a trailing credit indicator, a normalisation rule removes that entire class of exception permanently. One afternoon of work eliminates recurring cost forever.

This is the highest-value use of correction data and the one most often skipped, because it requires someone to look at the aggregate rather than the individual items.

## Guardrails

**Reviewers are not infallible.** Corrections contain errors. Double-review a sample to establish your review tier's own accuracy, and be careful about treating a single reviewer's correction as ground truth for a contested field.

**Watch for feedback loops.** If a reviewer sees the model's proposed value, their correction is anchored on it. For corpus-building purposes, some fraction of labels should be produced blind.

**Beware selection bias.** Corrections come overwhelmingly from flagged items, which are not a random sample of anything. Metrics computed on corrections alone will be pessimistic and misleading. This is why a separate random audit sample matters — it is the only way to measure the errors that were never flagged.

**Do not retrain reflexively.** For most document pipelines, prompt, schema, rule and threshold changes deliver more improvement per unit of effort than fine-tuning, and they are far easier to validate and roll back. Fine-tuning has its place, generally when a specific document type is high-volume, stable, and stubbornly hard. It is not the first response to a correction pattern.

**Handle the data properly.** Corrections contain the same sensitive content as the source documents. Retention, access control and deletion policies apply to the feedback store exactly as they do to the primary one — a fact that is easy to overlook when it is treated as an analytics side-channel.

## The measure of a closed loop

A deployment with a working feedback loop shows a specific signature over its first year: the exception rate falls, the mix of exception reasons shifts from "model uncertain" toward genuinely ambiguous documents, and the engineering backlog is populated by evidence rather than opinion.

A deployment without one shows a flat exception rate indefinitely. The model is fine. The system simply never learns anything from the most expensive information it produces.
