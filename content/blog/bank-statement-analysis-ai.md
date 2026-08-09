---
title: Bank Statement Analysis Is a Classification Problem, Not an Extraction Problem
description: Pulling transactions off a statement is the easy part. Deciding what each one means — income, transfer, business, recurring obligation — is where the accuracy actually matters.
date: 2026-08-09
tags: [Mortgage, Document Intelligence, Evaluation]
highlight: Not an Extraction Problem
ctaTitle: Want transaction-level analysis you can audit?
ctaText: Send us a set of statements. We will return classified transactions, income streams and flagged anomalies, each traceable to its line on the page.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Bank statements are used across lending and financial services to verify income, confirm assets, assess affordability, identify obligations and detect risk. They arrive as PDFs from thousands of institutions, each with its own layout, and as scans of printed statements.

Extraction gets the attention. It should not. Getting transactions off the page is a solved-enough problem with well-understood techniques. The accuracy that determines whether the analysis is any good lies in what happens next: deciding what each transaction *is*.

## The extraction layer, briefly

Worth doing properly, and mostly mechanical.

Statements are tables, with the table-extraction challenges covered elsewhere on this blog: multi-page continuation, repeated headers, subtotals per page, merged cells, and inconsistent column conventions across institutions. Debits and credits may be in separate columns, in one column with signs, or distinguished only by position.

Three things make extraction reliable here:

**Balance reconciliation.** Opening balance plus the sum of transactions must equal closing balance, per page and per statement. This single check catches the overwhelming majority of extraction errors — dropped rows, duplicated rows from page stitching, sign errors, misread amounts — and it requires no ground truth. It should be a hard gate: a statement that does not reconcile does not proceed to analysis.

**Period continuity.** Across a multi-statement set, each statement's closing balance should equal the next one's opening balance. Gaps indicate a missing statement, which is a completeness finding rather than an extraction failure.

**Institution and account identification**, with the account number partially masked in storage.

If reconciliation passes, the transaction list is almost certainly correct. That is an unusually strong position for a document AI workflow and it should be exploited rather than supplemented with elaborate confidence machinery.

## The classification layer, where it gets hard

Every transaction needs a label, and the labels drive everything downstream.

**Income versus not.** A recurring credit of a similar amount at a regular interval from the same source is likely income. A one-off credit may be a gift, a loan, a transfer, a refund or a sale. Getting this wrong in either direction changes an affordability or qualification outcome.

**Internal transfers.** Money moving between the applicant's own accounts is not income and is not expenditure. If both accounts are in the statement set, matching debits to credits by amount and date identifies them. If only one side is visible, they are easily miscounted as income — a common and material error.

**Business versus personal.** For self-employed applicants, separating business activity from personal is essential and frequently impossible from the statement alone, because many applicants use one account for both. This is a genuine limitation to state plainly rather than model around.

**Recurring obligations.** Loan payments, subscriptions, insurance, utilities. Identifying recurrence requires looking across the period rather than at individual transactions, and the useful output is a list of commitments with amounts and frequencies.

**Risk indicators.** Returned payments, overdraft charges, gambling activity, payday lending, and unusual patterns. These need care: several carry regulatory and fairness implications when used in a decision, and the policy on which may be used belongs to compliance, not engineering.

## What makes classification accurate

**Narrative normalisation.** Transaction descriptions are compressed, abbreviated and institution-specific. Normalising them into a canonical merchant or counterparty is the largest single lever on classification accuracy, and it is mostly a data problem — a maintained mapping — rather than a modelling one.

**Cross-transaction context.** Recurrence, amount stability and interval regularity are properties of a sequence, not a transaction. A classifier that looks at one line at a time will underperform substantially compared to one that sees the series.

**Explicit uncertainty.** An unclassifiable transaction should be labelled unknown, not assigned to the nearest category. In an income calculation, silently classifying an ambiguous credit as income is the error with the largest downstream consequence.

**Materiality-weighted review.** Not every transaction needs to be right. A misclassified £4 transaction does not change any outcome; a misclassified £4,000 credit does. Route review by impact, and measure accuracy weighted by amount as well as by count.

That last point is worth generalising: a system reporting 96% transaction classification accuracy may be materially wrong on the analysis if the errors concentrate in large transactions. Always report accuracy weighted by value alongside the unweighted figure.

## Fraud and alteration

Statements are a common target for alteration. Detection signals include arithmetic that does not reconcile, formatting inconsistencies within a document, fonts or alignment differing between lines, metadata inconsistent with the claimed source, and balances that do not carry between statements.

The reconciliation check is doing double duty here: it is both a quality gate and the most effective alteration detector available, because altering a transaction without correcting every subsequent running balance is a mistake most forgers make.

As with income documents: surface observations, never conclude, and prefer direct data feeds from the institution where available. Open banking and equivalent data-sharing arrangements provide authoritative transaction data and remove the entire document problem where they can be used. Where a customer cannot or will not use them, document analysis remains necessary — and should be understood as the fallback it is.

## Evaluation

- **Reconciliation pass rate.** Gate and headline quality signal.
- **Transaction-level extraction accuracy** on a labelled sample, though reconciliation makes this largely a formality when it passes.
- **Classification accuracy per category**, unweighted and value-weighted, with the confusion matrix.
- **Transfer detection accuracy**, called out separately because its errors are systematically directional.
- **Income figure accuracy** against expert-determined ground truth — the end-to-end measure that actually matters.
- **Unknown rate.** Not a failure. A system with a small honest unknown rate and accurate labels elsewhere is more useful than one that labels everything with 8% error.

## The scope to claim

Bank statement analysis automates the mechanical work: extract, reconcile, classify, aggregate, identify recurrence, flag anomalies. It produces a worked analysis with every figure traceable to a transaction and every transaction traceable to a line on a page.

It does not decide whether an applicant qualifies, and it should not attempt to. In workflows where a decision affects access to credit, the combination of a fully automated analysis and an unexplainable classifier is a governance problem waiting to be found. Traceability from decision to transaction to page is what makes the whole thing defensible — and it is a natural byproduct of building it properly.
