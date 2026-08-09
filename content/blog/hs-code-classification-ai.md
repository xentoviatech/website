---
title: Tariff Classification Is a Legal Determination, Not a Text-Matching Task
description: Automated HS code assignment is tempting and frequently wrong in ways that surface years later. Here is what to automate and where to keep a person.
date: 2026-08-09
tags: [Logistics, Compliance, Document Intelligence]
highlight: Not a Text-Matching Task
ctaTitle: Want classification assistance with an audit trail?
ctaText: We will show you candidate classifications with reasoning, prior-decision history and confidence — with the decision staying yours.
ctaLabel: Talk to Us
ctaHref: /simplimpex/
---

Tariff classification looks like a natural fit for automation: a product description on one side, a structured code hierarchy on the other, and a very large volume of repetitive decisions in between.

It is a fit for *assistance*. It is not a fit for autonomous decision, and the reason is worth understanding precisely, because the failure mode is unusually slow and unusually expensive.

## Why it is harder than it looks

**Classification depends on the goods, not the description.** The correct code depends on what the product actually is — its composition, function, state and sometimes its intended use — none of which is reliably determinable from a commercial description written by a supplier for commercial purposes.

**The rules are legal rules with an order of application.** The classification system has general interpretative rules that must be applied in sequence, plus section and chapter notes that exclude and include specific goods in ways that are not inferable from the code descriptions alone. A note in one chapter can determine that goods are classified in another entirely.

**Precedent matters.** Binding rulings, court decisions and administrative determinations shape how specific goods are classified, sometimes counter-intuitively. A model reasoning from the text of the code will not know that a particular class of product was determined to fall elsewhere.

**National extensions differ.** Beyond the internationally harmonised digits, national subdivisions vary. The same goods carry different full codes in different jurisdictions.

**Consequences arrive late.** A misclassification does not fail at filing. The entry clears, goods move, and the issue surfaces at audit — as duty owed, penalties, interest, and in serious cases a compliance finding affecting trusted-trader status. The feedback loop that would normally correct an automated system's errors is measured in years.

That last point is the crux. Most document automation is safe to iterate on because errors surface quickly. Here they do not, which means a system that is quietly wrong can be quietly wrong across a very large number of entries before anyone knows.

## What to automate

**Candidate generation with reasoning.** Propose a small number of plausible codes, each with the basis: which heading, which notes considered, which interpretative rule applied. A classifier reviewing three candidates with reasoning works far faster than one starting from a blank field.

**Prior-decision retrieval.** The highest-value component and the most underused. Surface how this importer classified this product previously, how similar descriptions from this supplier were classified, and any applicable rulings. Consistency with prior decisions is both more accurate and more defensible than fresh reasoning on each entry.

**Description sufficiency checking.** Determine whether the available description contains enough information to classify at all. "Plastic parts" cannot be classified. Flagging insufficiency and generating a specific question back to the supplier — what material, what function, what composition — resolves the problem at source and is often the single most useful output.

**Consistency monitoring.** Detect where the same or similar goods have been classified differently across entries. Inconsistency is itself a compliance risk and it is invisible without systematic checking.

**Change monitoring.** Tariff schedules are revised periodically. Identifying which of your active codes are affected by a revision is a mechanical task that is easy to miss.

**Duty and measure calculation.** Once the code is determined, applying rates, preferences, quotas and trade measures is deterministic.

## What to keep human

**The determination itself**, for anything not previously classified with the same facts.

**Novel or ambiguous goods.** Composite items, sets, goods with multiple functions, and anything where the interpretative rules require judgement.

**Anything where the description is thin.** Better to ask than to guess.

**High-value or high-risk goods**, where the consequence of error justifies the review cost, and goods subject to restrictions or preferential claims where the classification carries additional weight.

**Any change from a prior classification.** If the system proposes a different code from the one used previously for the same goods, that is a decision requiring explicit human sign-off. Silent drift is how inconsistency enters.

## Building the trail

Because the questions arrive years later, the evidence has to be retained deliberately.

For every classification decision, retain: the code assigned, the description and any supporting information available at the time, the candidates considered and their reasoning, the prior decisions surfaced, whether the system's proposal was accepted or changed, who made the decision, and when. Retain it for the audit period in the relevant jurisdictions, which is typically longer than most systems' default retention.

The practical value is straightforward. When an entry from four years ago is questioned, the difference between a documented decision with contemporaneous reasoning and a code with no explanation is the difference between a routine response and a difficult one.

## Measuring it

- **Top-candidate acceptance rate** — how often the classifier accepts the first proposal. The headline usefulness metric.
- **Accuracy against expert determination** on a held-out set, at the full national code level rather than at the heading level, since the last digits are where the duty consequences often sit.
- **Consistency rate** for repeated goods.
- **Description sufficiency detection accuracy** — does the system correctly identify what cannot be classified?
- **Post-entry amendment rate** and audit findings, the true outcome measures, acknowledging they lag by years.

## The honest positioning

A good classification assistant makes an experienced classifier substantially faster and makes their decisions more consistent, better documented and better informed by precedent. That is a real and defensible benefit.

A system marketed as automatic classification is making a claim about a legal determination on the basis of a commercial description, and the people who will discover whether it was right are auditors, some years from now. It is worth being clear about which product you are buying or building.
