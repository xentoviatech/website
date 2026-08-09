---
title: Validation Patterns That Catch What the Model Missed
description: The cheapest accuracy improvements in document AI are not model upgrades. They are rules — arithmetic, cross-references, and reference-data lookups that turn a guess into a verified value.
date: 2026-08-09
tags: [Agentic AI, Document Intelligence, Evaluation]
highlight: What the Model Missed
ctaTitle: Want your business rules inside the pipeline?
ctaText: Bring your validation logic. Rules that run at extraction time catch errors that rules running downstream only report.
ctaLabel: Book a Demo
ctaHref: /#contact
---

When extraction accuracy is not good enough, the instinct is to reach for a better model or a better prompt. Usually there is a cheaper, more reliable improvement available first: check the answer against something you already know.

Validation is unglamorous, deterministic, auditable and nearly free compared to inference. It also catches a class of error that no amount of model improvement will — because it uses information that is not on the page.

## Why validation beats more model

A model reads one document in isolation. Your business knows a great deal that the document does not state: which policy numbers exist, what a plausible amount range is, which vendors you trade with, what was on last month's statement, which fields must agree with each other.

Every one of those is a constraint the model cannot apply and you can. Applying them converts an unverified extraction into either a corroborated value or a specific, localised flag — and both outcomes are more useful than a confidence score.

There is a second benefit that gets overlooked: validation *raises* confidence as well as lowering it. A field that passes three independent checks can be auto-approved at a model confidence that would otherwise have gone to review. Good validation increases straight-through processing, it does not just police it.

## The patterns

### Internal arithmetic

Documents that contain numbers usually contain relationships between them: line items sum to a subtotal, subtotals to a total, quantity times unit price equals amount, debits equal credits, opening balance plus movements equals closing balance.

Each relationship is a free check, and — crucially — a failed check localises the error. If the line items sum to $4,180 and the stated total is $4,810, you know to re-read a small region rather than the whole document. That is exactly the input a targeted correction step needs.

### Cross-field consistency

Relationships that are logical rather than arithmetic: a policy effective date before its expiry date, a loss date within the policy period, a date of birth consistent with a stated age, a postcode consistent with a city, a total that cannot be negative for this document type.

These encode domain knowledge and they are where subject-matter experts add the most value to a pipeline. Get an experienced processor to describe the checks they run mentally when reviewing a document — that conversation typically produces twenty high-value rules in an hour.

### Reference-data resolution

The strongest pattern available. Resolve extracted identifiers against systems of record: does this policy number exist, does the insured name on it match, is this a vendor we trade with, does this product code exist in the catalogue, does this address geocode.

A resolution that succeeds is powerful evidence. A resolution that fails is a precise flag. And fuzzy matching against a known list turns open-ended recognition into constrained matching — the single most effective technique for proper nouns, which is exactly where models are weakest.

### Cross-document consistency

Within a bundle, the same entity often appears in several places. The name on the application should match the name on the identity document; the loan amount on the note should match the closing statement; the invoice total should match the payment advice.

Agreement across independently extracted documents is strong corroboration. Disagreement is a genuine business exception that would otherwise have been discovered much later, by someone with less context.

### Completeness

A submission is not just a set of documents, it is an expected set. Checking for what is *missing* is a different question from checking what is present, and it is frequently the more valuable one operationally, because a missing document usually means going back to the sender — and the sooner that happens, the better.

### Format and range

The basic tier, still worth stating: checksums where identifiers have them, dates within plausible ranges, amounts within expected bounds for the document type, enumerated fields drawn from their allowed set.

Range checks should be derived from your own data distribution rather than guessed. A value in the 99.9th percentile of anything you have ever seen is worth a look even if it is technically valid.

### Statistical monitoring

Not a per-document rule, but the pattern that catches problems the per-document rules cannot: watch the distribution of extracted values over time. A field whose null rate jumps from 2% to 30% on Tuesday indicates something changed on Tuesday — a form revision, a scanner setting, an upstream model update. No individual document looks wrong; the aggregate does.

This is one of the few quality signals computable continuously on live traffic without labels, which makes it the backbone of production monitoring.

## Making failures useful

A validation failure should carry enough information to act on:

- **Which rule failed**, in language a business user understands.
- **Which fields are implicated**, with their source regions.
- **What the system thinks the discrepancy is** — the expected value versus the found value where that is computable.
- **A suggested action**: re-read this region, ask the sender, route to a specialist.

Compare that to a generic "validation error" and the difference in reviewer seconds is substantial.

## Where rules should live

Rules belong in configuration, owned by the people who understand the domain, not embedded in prompts or application code. Three practical reasons: business users can add them without an engineering cycle; they are individually testable; and they are auditable, which matters when a regulator asks how a decision was made.

Keep them versioned alongside the evaluation corpus, and test rule changes the same way you test prompt changes. A rule that is too strict manufactures exceptions and quietly destroys your STP rate — that regression should be caught by the harness, not by the operations team.

## The honest limitation

Validation only catches errors that violate a known constraint. A wrong value that is arithmetically consistent, correctly formatted, and resolves against reference data will pass every check. Rules narrow the space of undetected errors; they do not eliminate it.

This is why validation complements confidence gating and human review rather than replacing them, and why the escaped error rate still has to be measured by sampling. But the space of errors validation catches is large, the cost is low, and it is nearly always the highest-return work available in a document pipeline.
