---
title: When Not to Use an LLM Agent
description: The failure mode of the current moment is using a language model for work that a regular expression, a lookup table, or a form field would do better. Here is how to tell the difference.
date: 2026-08-09
tags: [Agentic AI, Procurement, Evaluation]
highlight: Not to Use
ctaTitle: Want a straight answer about your workflow?
ctaText: Some of what we get asked about should not be an AI project at all. We will tell you which parts of yours are which.
ctaLabel: Talk to Us
ctaHref: /#contact
---

Most of what we publish is about building AI systems well. This one is about not building them.

The dominant failure mode in enterprise AI right now is not models underperforming. It is models being applied to problems that had a better solution already — usually a cheaper, faster, more reliable, more auditable one. Recognising those cases early saves a great deal of money and a certain amount of embarrassment.

## Signs the answer is not a language model

### The input is already structured

If the data arrives as a database row, an API response, an EDI message, a well-formed XML file or a machine-readable barcode, parse it. A model asked to read structured data will do it correctly most of the time, which is strictly worse than a parser that does it correctly all of the time, for a fraction of the cost and latency.

The variant of this worth naming: a model used to reformat JSON from one shape to another. That is a mapping function.

### The rule is deterministic

Checksum validation, date arithmetic, currency conversion, sorting, deduplication by exact key, threshold comparison, arithmetic of any kind. These have exact implementations. A model performs them approximately.

Instructing a model to "verify the totals add up" produces something that usually works and occasionally does not, with no way to tell which. A sum is a sum.

### The set of answers is small and known

Routing to one of six queues based on a field value is a lookup table. Mapping a product name to a SKU where the mapping is known is a dictionary. Models are for open-ended perception, not for enumerated choices with an existing key — and where the mapping is genuinely fuzzy, deterministic fuzzy matching against a known list is usually both more accurate and more explainable than asking a model.

### The real problem is upstream

This is the most important item on the list.

If a form is submitted as a photograph of a printout and you are building extraction to read it, ask whether the form could be submitted as a form. If a counterparty sends unstructured emails and you are building parsing for them, ask whether they would use a portal. If scans are illegible and you are compensating with model sophistication, ask what the scanner settings are.

Fixing intake is unglamorous, politically harder, and usually eliminates the problem rather than mitigating it. A submission portal with typed fields beats the best extraction pipeline that will ever exist, permanently and at lower cost.

The uncomfortable version: sometimes the honest recommendation to a prospective customer is that they do not need us for that part.

### The decision needs to be explainable in the strict sense

Some decisions must be traceable to a specific stated rule — adverse action notices, certain benefit determinations, regulated underwriting decisions. "The model considered the whole document" does not satisfy that standard.

A model can still assist by extracting the facts. The decision on those facts should be a documented rule, which is both compliant and easier to change when the policy changes.

### The error cost is high and the volume is low

If you process forty documents a month and an error is expensive, a person reading forty documents is the correct architecture. Automation economics need volume. Below a threshold, the build cost, the evaluation cost and the ongoing ownership cost exceed any saving, and the reliability is worse.

### There is no way to check the answer

If an output cannot be validated — no arithmetic to reconcile, no reference data to resolve against, no downstream signal, no practical review — you are deploying an unverifiable system. Sometimes that is acceptable because the stakes are low. When the stakes are not low, the absence of a check is a reason to reconsider the design, not something to note in the risk register and proceed past.

## Where language models genuinely are the right tool

To be clear about the other side of the line. They are the right tool when:

- **The input is unstructured and varied** — free text, images of documents, speech, layouts that differ across sources.
- **The task requires world knowledge** to interpret — knowing that a phrase in a medical note implies a condition, or that a clause is an indemnity.
- **The rules cannot be enumerated** — the long tail of variation is genuinely long, and a rule-based system would need thousands of cases and still miss.
- **Approximate is useful** — ranking, triage, summarisation for a human who will read the source, drafting for review.
- **There is a verification path** — validation rules, reference data, or human review sized to the residual uncertainty.

Document extraction from varied real-world paper sits squarely in this category, which is why it is a good application. The point is not that models are overused in general; it is that within any given workflow, the model should be doing the perception and almost nothing else.

## A quick test

Before committing to a model for a step, answer three questions:

1. **Could a well-specified rule do this?** If yes, write the rule. It will be faster, cheaper, deterministic and auditable.
2. **How will I know when it is wrong?** If there is no answer, redesign until there is.
3. **What would make this problem not exist?** Often an upstream change. Often much cheaper than anything downstream.

Systems that pass this filter tend to have a specific shape: a model doing the genuinely hard perceptual work, surrounded by a substantial amount of ordinary, boring, well-tested code doing everything else. That is not a compromise. It is what a reliable AI system looks like.
