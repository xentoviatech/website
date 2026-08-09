---
title: The Real Total Cost of a Document AI Deployment
description: Per-page pricing is the smallest line in the budget. Here is the full cost model, including the four categories that consistently get left out of business cases.
date: 2026-08-09
tags: [Document Intelligence, Procurement, Evaluation]
highlight: Real Total Cost
ctaTitle: Building the business case?
ctaText: We will help you model it properly — including the costs that are not on our invoice.
ctaLabel: Talk to Us
ctaHref: /#contact
---

Document AI business cases usually compare two numbers: the current cost of manual processing, and the vendor's per-page price. The gap looks enormous and the project gets approved.

Then the actual cost lands somewhere in between, sometimes uncomfortably close to the top of the range, and the programme acquires a reputation it did not deserve. The technology usually worked. The model was incomplete.

Here is a fuller one.

## The five cost categories

### 1. Inference and platform

The visible line. Per page, per document, per field, or a platform subscription with volume tiers.

Two things to check. First, what counts as a page — a 40-page bundle where only 3 pages matter may bill as 40. Second, what happens on reprocessing: if a prompt change or a corrected split means running the document again, is that a second charge? At scale, reprocessing can be a substantial fraction of total volume.

### 2. Human review

Usually the largest operating cost, and the one most sensitive to design decisions rather than pricing.

```
review_cost = volume x (1 - stp_rate) x minutes_per_exception x loaded_rate / 60
```

The term that moves this most is `minutes_per_exception`, and it is a property of the review interface, not the model. A screen that shows the cropped field beside an input box, pre-focused, with keyboard navigation, produces exception times measured in seconds. A screen that shows the whole page and asks the reviewer to check everything produces exception times measured in minutes. Same accuracy, order-of-magnitude difference in operating cost.

This is why the review tooling deserves as much scrutiny in an evaluation as the extraction accuracy — and why "can I watch a reviewer work through fifty exceptions?" is the most informative request you can make of a vendor.

### 3. Integration and change

One-off but rarely small: connecting to intake channels, writing to systems of record, authentication, error handling, and the internal process redesign around the new flow.

The recurring version is more often forgotten. Document formats change. Counterparties change. Regulations add fields. Somebody handles that continuously, whether that is your team, the vendor, or both. Ask specifically: when a new variant appears, what is the path and the elapsed time?

### 4. Errors that escape

The category most often omitted entirely, and frequently the largest risk-adjusted cost.

```
error_cost = volume x stp_rate x escaped_error_rate x cost_per_error
```

`cost_per_error` is workflow-specific and worth estimating properly: rework, correction downstream, a mis-paid claim, a customer complaint, remediation of a regulatory finding. In a workflow where an error costs a few hundred dollars to unwind, an escaped error rate of even 1% on high volume can exceed the entire inference bill.

Note the interaction with STP. Pushing automation higher increases this term while decreasing review cost. The optimum is not the highest STP — it is where the two curves cross.

### 5. Governance and assurance

Ongoing, unavoidable in regulated sectors, and usually absorbed invisibly into other teams' time: vendor security review and annual re-review, model risk documentation, audit sampling, incident procedures, retention and deletion, access reviews.

Budget it explicitly. It does not disappear because nobody put it in the spreadsheet.

## The comparison that is usually wrong

Business cases typically compare against *current fully loaded manual cost*. That overstates the benefit, because manual processing does not go to zero — it goes to the exception tier, which is still staffed.

A more honest framing compares three states:

| | Today | Naive automation | Realistic automation |
|---|---|---|---|
| Documents touched by a person | 100% | 5% (claimed) | 25–35% |
| Minutes per touched document | 8 | 8 | 1.5 |
| Escaped errors | low | material | low |
| Platform cost | none | low | low |

The realistic column is still a very large improvement — a large majority of documents never touched, and the ones that are handled several times faster because the reviewer is correcting rather than keying. It is simply a different claim from "95% automation", and it survives contact with production.

## Costs that get missed

- **Reprocessing.** Corpus-wide reruns after a model or prompt change. Plan for a few full passes per year.
- **The evaluation corpus.** Building and maintaining labelled ground truth is real, recurring, human work — and it is the asset that makes everything else measurable. Fund it deliberately.
- **Storage and retention.** Page images, extraction records, audit trails, all retained for the compliance period. Small per document; not small at hundreds of millions of documents over seven years.
- **Peak capacity.** If volume is seasonal, the review tier must be staffed for peak or the queue becomes the bottleneck exactly when it matters.
- **Change management.** Training, procedure updates, and the productivity dip while a team learns a new workflow. Real, temporary, and consistently omitted.
- **Exit.** Data export, format conversion, parallel running during a migration. Negotiate the terms at signing.

## A sanity check

If a business case shows a payback period under three months and assumes near-total automation, it is almost certainly missing the review tier or the error term. Sound deployments in messy document domains typically show a strong but not fantastical return, driven mostly by the collapse in minutes-per-document rather than by eliminating people entirely.

The projects that succeed are the ones that budgeted for the exception tier from the start, instrumented their own error rate, and treated the labelled corpus as an owned asset. The ones that struggle are the ones that priced only the invoice.
