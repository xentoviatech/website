---
title: Treat Prompts Like Code, Because They Are
description: A prompt edit is a production change with non-local effects and no compiler to catch mistakes. Here is the release discipline that makes changing them safe.
date: 2026-08-09
tags: [Agentic AI, Evaluation, Document Intelligence]
highlight: Because They Are
ctaTitle: Want to see how we ship prompt changes?
ctaText: Versioned, scored against a labelled corpus, and rolled out behind a gate. Ask us to walk through a real change.
ctaLabel: Talk to Us
ctaHref: /#contact
---

In most document AI systems, the prompt is the highest-leverage piece of production configuration in the entire stack. It determines what gets extracted, in what form, with what edge-case behaviour. Editing it changes the behaviour of the system for every document it will ever process.

It is also, in a large number of deployments, a string literal that someone changes in an afternoon with no test and no record of what it used to say. That gap between consequence and process is where a lot of unexplained quality drift comes from.

## Why prompts need more discipline than code, not less

Code has a compiler, a type system, and largely local effects. A prompt has none of these.

**Effects are non-local.** Adding a clarifying sentence about how to handle a missing date can change how the model reads unrelated fields. There is no module boundary. Every change is potentially a change to everything.

**Failures are silent.** A malformed prompt does not throw. It produces confident, well-formatted output that is subtly wrong, which is considerably worse than an exception.

**Small edits can have large effects.** Reordering instructions, changing an example, or adjusting emphasis can shift behaviour measurably. There is no reliable intuition for which edits are safe.

**The dependency moves underneath you.** The model version can change without you touching anything. A prompt that was tuned against one model version may behave differently on the next.

All of which argues for exactly the practices used for risky code: version control, tests, staged rollout, and the ability to roll back quickly.

## The minimum viable discipline

**Prompts in version control, as files.** Not in a database, not in a UI text box with no history, not inline in application code. Files in the repository, reviewed like any other change, with the diff visible.

**Every prompt carries a version identifier** recorded on every extraction it produces. When a quality question arises three weeks later, the first thing you need to know is which prompt version produced the record. Without this the investigation cannot even start.

**A change is not accepted until it is scored.** Run the labelled corpus, produce the diff against the current baseline, and look at newly failing documents individually. Aggregate deltas hide the case where a field improved 3 points while a document type broke entirely.

**Gates with explicit exceptions.** No regression beyond tolerance on any field without a recorded decision to accept it. Occasionally a trade is correct — a small loss on a low-stakes field for a large gain on a critical one — and that should be a decision someone made in writing, not a number nobody looked at.

**Pin the model version.** Automatic upgrades to the underlying model are a production change you did not review. Pin explicitly, and treat a version bump as its own change with its own corpus run.

## What belongs in a prompt and what does not

A meaningful amount of prompt volatility comes from prompts doing work that belongs elsewhere.

**Belongs in the prompt:** what to extract, how to describe each field, how to handle genuinely ambiguous document situations, the output schema, and a small number of examples covering hard cases.

**Does not belong in the prompt:** arithmetic, format validation, reference-data lookups, business rules, thresholds, routing logic. Every one of these is more reliable, cheaper, faster and more auditable as ordinary code. Instructions like "make sure the line items add up to the total" are a request, not a guarantee — and the deterministic check is three lines long.

Systems with thin prompts and thick validation layers are markedly more stable over time, because the volatile component is small and the rest is testable by conventional means.

## Structuring prompts for maintenance

**Compose from parts.** Shared preamble, per-document-type schema, per-field descriptions, examples. Reusing a common section across twenty document types means one edit instead of twenty, and prevents the slow divergence that otherwise sets in.

**Generate the schema from one definition.** The field list appears in the prompt, in the output parser, in the validation rules, in the database and in the review UI. Derive all of them from a single source, or they will drift and the drift will present as a mysterious accuracy problem.

**Keep examples few and hard.** Examples consume context and pull behaviour toward themselves. Two or three examples covering the genuinely confusing cases are worth more than fifteen ordinary ones.

**Comment the intent.** A prompt file should record why a strange-looking instruction exists. Six months later, someone will find the line about a specific date format, see no reason for it, and delete it — reintroducing the bug it was added to fix. Prompts need comments more than code does, because their logic is invisible.

## Rollout

Treat a prompt change as a deployment.

**Shadow first where you can.** Run the new version alongside the old on live traffic without acting on its output, and compare. This catches distribution differences the corpus missed — the corpus is a sample, production is not.

**Roll out gradually** by percentage or by document type, and watch the operational signals rather than only the offline metrics: exception rate, null rate per field, validation failure rate, reviewer correction rate. These move within hours and will tell you about a problem before anyone files a report.

**Keep rollback trivial.** Reverting should be a configuration change, not a redeploy. When something is wrong at three in the morning, the previous version needs to be one action away.

**Log enough to reconstruct.** Prompt version, model version, parameters, and the raw response. When an output is questioned months later — which happens in regulated workflows — you need to be able to say exactly what produced it.

## The failure this prevents

The pattern is familiar. Extraction quality is quietly worse than it was in the spring. Nobody can say when it changed or why. The prompt has been edited a dozen times by three people, none of the edits were tested, the model version updated at some point, and there is no record of any of it.

At that point the only honest option is to rebuild the baseline from scratch. The discipline above costs a few days to establish and makes that outcome impossible — which is a good trade in a system whose behaviour is determined by a string that anyone can change.
