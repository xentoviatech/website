---
title: Closing Document QC Is a Consistency Problem
description: Most closing defects are not judgement calls. They are dates out of order, figures that disagree between documents, and signatures that are missing — all of which a machine can check on every file.
date: 2026-08-09
tags: [Mortgage, Compliance, Document Intelligence]
highlight: A Consistency Problem
ctaTitle: Want every file checked instead of a sample?
ctaText: We will run your closing packages through automated consistency and completeness checks and show you the exception report.
ctaLabel: Book a Demo
ctaHref: /solutions/mortgage/
---

Quality control on closing packages has traditionally been a sampling exercise. Reviewing every file was not economic, so a percentage got reviewed, a defect rate was estimated, and the rest went out.

That trade-off existed because review was expensive. A large share of what a QC reviewer does is mechanical: comparing figures between documents, checking date sequences, confirming signatures are present and properly dated, verifying that required documents exist. None of it requires judgement. All of it is automatable.

When the mechanical layer is automated, the economics invert — every file can be checked, and human review concentrates on the findings rather than the search.

## The categories of defect

**Missing documents.** The expected set depends on loan type, programme, occupancy, property type and jurisdiction. Purely a completeness check against a configurable requirement model.

**Missing or improper execution.** Signatures absent, undated, dated inconsistently with other documents, notarisation incomplete, initials missing where required. Detecting signature presence is a vision problem with reasonable reliability; detecting the *absence* of a required signature is the useful direction and needs the requirement model to know what was expected.

**Date sequence violations.** Documents dated out of the required order, disclosures delivered outside required windows, documents dated after closing, expired documents at closing. This category is entirely mechanical and is among the most common source of real findings.

**Figure inconsistencies.** Loan amount, interest rate, term, monthly payment, cash to close, fees. These appear across the note, the closing disclosure, the deed of trust and the settlement statement, and they must agree. Where they disagree, a defect exists — the machine finds it reliably and the human decides what it means.

**Name and property inconsistencies.** Borrower names must match across documents; the property address and legal description must be consistent. Small variations are common and some are benign, which is exactly why the system should flag rather than adjudicate.

**Data integrity against the system of record.** The documents must agree with the loan record. A discrepancy between the executed note and the servicing system is a serious finding and a straightforward comparison.

## The architecture

The pipeline is the indexing pipeline described in our loan file post, plus a rules layer.

**Index the package** — split, classify, version, order.
**Extract identity and terms** per document type, with source references.
**Build a comparison matrix** across documents for each field that appears in more than one.
**Run the rules** — completeness, execution, dates, consistency, system-of-record agreement.
**Produce an exception report** where every finding cites the specific documents, pages and values in disagreement.

That last point is what makes the output usable. A finding that says "loan amount inconsistency" is a starting point for an investigation. A finding that says *"note page 1 states $412,500; closing disclosure page 3 states $412,000"* with both regions linked is a decision someone makes in fifteen seconds.

## Rules belong to the business

The requirement model — which documents, which signatures, which windows, which tolerances — changes with programme rules, investor overlays and regulation. It must be configuration owned by the compliance and QC functions, not code owned by engineering.

Three properties matter: rules are individually named and testable; changes are versioned with an effective date, so a file can be evaluated against the rules in force when it closed; and each rule states its basis, so a finding can be explained.

That last property matters more than it appears. A QC exception that cannot be traced to a requirement generates an argument rather than a correction.

## Tolerances and false positives

The failure mode that kills these deployments is over-flagging. A system producing forty findings per file, of which three matter, will be switched off.

Tolerance design is therefore a first-class concern:

- **Numeric tolerances** where small differences are expected and permitted. These should reflect actual requirements rather than engineering intuition.
- **Name matching** that accepts genuine equivalence — middle initials, suffixes, punctuation — while flagging substantive differences.
- **Address normalisation** before comparison.
- **Severity levels**, so critical findings are not buried among cosmetic ones.
- **Suppression with a reason**, recorded, so a reviewer's decision that a finding is not a defect is captured and can inform tolerance tuning.

Measure the precision of each rule individually and retire or retune the ones that generate noise. A rule that is dismissed 95% of the time is costing more than it returns.

## Regulatory checks

Several closing requirements are time-bound and quantitative: disclosure delivery windows, waiting periods, fee tolerance thresholds, and the requirement to re-disclose when specified changes occur.

These are exactly the kind of check automation handles well — they depend on dates and figures, both extractable, compared against a rule with a documented basis. They are also the findings that carry the most consequence when missed, which makes full-file coverage more valuable than sampling.

Requirements vary by jurisdiction and change over time. The rules layer should be maintained by people who track that, with effective dating so historical files are judged correctly.

## What stays human

**Whether a finding is a genuine defect.** The system identifies discrepancies. Whether a discrepancy is a defect, a curable condition, or acceptable is a judgement.

**Anything requiring interpretation of intent.** Whether a document satisfies a requirement in substance, whether an unusual structure is acceptable.

**Remediation decisions.** What to do about a defect is a business decision with legal implications.

**Novel situations.** Unfamiliar document types or structures escalate rather than being force-fitted.

## Measuring it

- **Coverage** — the share of files fully checked. Moving from a sample to everything is the headline change.
- **Finding precision per rule.** The metric that determines whether the system stays in use.
- **Detection recall**, measured by running the automated checks against files that went through full manual QC and comparing.
- **Reviewer time per file** and per finding.
- **Post-close defect rate** and investor findings, which is the outcome the whole function exists to improve.

The last one is the real test. QC automation that reduces reviewer hours but does not reduce downstream defects has optimised the wrong thing.
