---
title: Build the Evaluation Harness Before the Pipeline
description: Without a scoring harness, every prompt change is a guess and every model upgrade is a gamble. Here is how to build one for document extraction, and what to put in it.
date: 2026-08-09
weight: 34
tags: [Evaluation, Agentic AI, Document Intelligence]
highlight: Before the Pipeline
ctaTitle: Want a scored baseline on your documents?
ctaText: We will build a labelled sample and report per-field accuracy — yours to keep, whether or not you work with us.
ctaLabel: Book a Demo
ctaHref: /#contact
---

The most common structural mistake in document AI projects is building the pipeline first and the measurement second. It feels faster. It is not, because from that point on every change is unfalsifiable: a prompt is edited, the outputs look better on the three documents someone checked, and nobody knows what happened to the other four hundred.

The evaluation harness is the thing that makes progress cumulative rather than anecdotal. Build it first.

## What the harness is

Four parts, none exotic:

1. **A labelled corpus** — documents with verified correct values for every field of interest.
2. **A runner** — takes the corpus, runs the current pipeline, records outputs and metadata.
3. **A scorer** — compares outputs to labels under explicit normalisation rules and emits per-field metrics.
4. **A report** — human-readable, diffable against the previous run, with the specific failures listed.

The fourth part matters more than it looks. A number tells you something changed; a list of which documents newly failed tells you what to do.

## Choosing the corpus

The corpus determines what "good" means, so its composition is a design decision, not a sampling convenience.

**Stratify deliberately.** Include the clean majority, but over-represent the hard tail: poor scans, unusual variants, edge-case values, documents your team already complains about. If 10% of production volume is difficult and 1% of your corpus is, you will optimise for the wrong thing and be surprised in production.

**Include documents that should fail.** Wrong form type, blank pages, duplicates, a page from a different bundle. A pipeline's behaviour on inputs it should reject is part of its quality and it will never be measured if such inputs are not in the corpus.

**Include the rare-but-critical.** A field appearing in 2% of documents but driving a payment decision needs enough instances to produce a meaningful accuracy figure. Oversample it and weight accordingly when reporting.

**Keep it fresh.** Documents change. Add new variants as they appear — the most valuable additions come straight from the review queue, where reviewers have already told you what is hard.

**Size it honestly.** Enough per field that the accuracy estimate is stable. A field with twelve examples cannot support a claim about accuracy to the nearest percent, and reporting it as though it can is how false confidence enters.

## Getting the labels right

Labels are the ground truth, so their errors become your ceiling.

Label independently of the system's output. Showing a labeller the model's answer and asking them to confirm produces anchoring, and the resulting corpus will agree with the model precisely where the model is confidently wrong.

Double-label a sample and measure agreement between labellers. If two careful people disagree on 3% of a field, that field's achievable accuracy is bounded by the ambiguity, and the sensible response is usually to sharpen the field definition rather than to chase the model.

Write the definition down for every field. What exactly goes in `date_of_loss` when the document contains both a reported date and an occurrence date? Most persistent "accuracy" disputes turn out to be definition disputes.

## Normalisation, decided in advance

Half of apparent accuracy differences between systems are normalisation choices. Fix them explicitly:

- Dates to a canonical format before comparison.
- Amounts as numbers, not strings — currency symbols, thousands separators and trailing zeros stripped.
- Names and addresses: case, punctuation and whitespace normalised; decide whether `St` matches `Street`.
- Identifiers: decide whether formatting characters are significant.
- Empty, null, "not present" and "illegible" treated as distinct values, because they mean different things.

Then report both strict and normalised accuracy. The gap between them is itself informative.

## What to score

- **Exact match** per field, the headline.
- **Presence errors** separately: hallucinated values where the field was absent, and missed values where it was present. These have different causes and very different consequences.
- **Near misses.** A date off by one day and a date off by a year are both wrong, and only one suggests a systematic parsing issue.
- **Calibration.** Accuracy within each confidence bucket. Without this you cannot set thresholds honestly.
- **Cost and latency** per document, tracked alongside accuracy. A change that gains half a point of accuracy at triple the cost is a decision, and it needs both numbers to be made.

## Running it as a regression test

Once the harness exists, wire it into the change process.

Every prompt edit, model version change, rule addition and threshold adjustment runs the corpus and produces a diff against the last accepted baseline. The diff should list newly failing documents by name, not just aggregate deltas — prompt changes have non-local effects, and a net-positive aggregate can hide a serious regression on one document type.

Set gates: no meaningful regression on any field above its tolerance without an explicit accepted decision. Keep the baseline in version control alongside the prompts, so the state of the system and the state of its measurement move together.

Run it on a schedule too, not only on change. Upstream models are updated, input distributions drift, and a scheduled run catches both without anyone having to suspect them first.

## The most common mistakes

- **Corpus assembled from the easy documents** because they were the ones already digitized.
- **Labels produced by reviewing model output**, guaranteeing agreement with the model's blind spots.
- **A single aggregate number**, hiding the one field that matters at 70%.
- **No normalisation policy**, so scores move when someone changes a date format.
- **The corpus frozen at project start**, slowly becoming unrepresentative while everyone trusts it.
- **Nobody owns it**, so it silently stops running and no one notices for a quarter.

## Why it is worth the effort

A labelled corpus is the longest-lived asset in a document AI programme. Models will change, vendors may change, prompts will be rewritten many times. The corpus survives all of it, and it is what lets you evaluate a replacement in an afternoon rather than a quarter.

It is also the thing that turns an argument into a measurement. "The new approach is better" is a claim. "The new approach is 4.2 points better on field-level accuracy, with a regression on two document types, at 1.8x the cost" is a decision anyone can make.
