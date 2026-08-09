---
title: Medical Record Review: Find and Cite, Do Not Summarise
description: Hundreds of pages of records, one clinical question, and a reviewer with twenty minutes. The right architecture retrieves and cites evidence rather than generating a narrative.
date: 2026-08-09
tags: [Healthcare, Document Intelligence, Human-in-the-Loop]
highlight: Do Not Summarise
ctaTitle: Have record review as a bottleneck?
ctaText: We will index a sample record set and show you evidence-first retrieval — every answer linked to the page it came from.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Medical record review appears in many workflows: disability and life underwriting, claims adjudication, independent medical review, litigation support, care management, clinical research screening. The shape is always the same. A large volume of records, a specific set of questions, and a reviewer whose time is expensive.

The obvious application of a language model is to summarise. That is usually the wrong design, and understanding why leads to a much better one.

## Why summarisation is the wrong primitive

A summary is a lossy transformation with three problems in this context.

**It cannot be verified efficiently.** To trust a summary, a reviewer must read the source — which defeats the purpose. A summary that is trusted without verification is a system where errors propagate silently into consequential decisions.

**Omission is invisible.** A summary that leaves out the one relevant note looks exactly like a summary where there was nothing to leave out. There is no signal distinguishing them, and in record review the omitted fact is frequently the decisive one.

**It smooths over contradiction.** Records disagree. Two notes give different onset dates; a discharge summary conflicts with a progress note. A fluent summary resolves the tension by picking one or by blending them, discarding exactly the information a reviewer needs.

## Retrieval and citation instead

The better design treats the record set as a searchable corpus and the review as a set of specific questions.

For each question — *when was this condition first documented*, *what treatments were attempted*, *is there evidence of a pre-existing condition before this date* — the system returns **passages**, with document, page and location, ranked by relevance, with the extracted answer stated and linked to its source.

The reviewer's job becomes verification rather than reading. They see the claimed answer and the exact passage supporting it, and can confirm in seconds. When passages conflict, they see both and exercise judgement, which is what they are there for.

This inverts the trust relationship correctly. The system is not asking to be believed; it is showing its work.

## Building it

**Index at page and passage level with structure preserved.** Records are heterogeneous — dictated notes, structured lab reports, imaging reports, medication lists, scanned handwritten forms. Each needs its own handling, and the handwritten portions need the same grounding discipline discussed elsewhere on this blog.

**Extract a temporal spine.** Almost every question in record review is time-anchored. Building a reliable timeline of encounters, diagnoses, procedures, medications and results is the highest-value structural investment, and it makes questions like "what was documented before this date" answerable directly rather than through search.

**Handle the clinical language properly.** Negation, uncertainty, historical versus current, family versus patient. A retrieval system that surfaces "no evidence of coronary artery disease" in response to a question about coronary artery disease is technically responsive and practically harmful. Test these cases explicitly and separately.

**Deduplicate intelligently.** Record sets are extremely repetitive — the same history copied forward across dozens of notes, the same report included in three different bundles. Collapsing duplicates while preserving the fact that a statement appeared repeatedly, and flagging where a repeated passage *changed*, is both a usability improvement and an analytical one.

**Preserve provenance absolutely.** Every returned fact links to its exact source. In workflows with legal or regulatory weight, this is the difference between a usable tool and an inadmissible one.

## Where generation is appropriate

Not never — just constrained.

**Chronologies from extracted structure.** Once the temporal spine exists, rendering it as a readable timeline is a formatting task over verified data, with every entry linked to its source. Useful and safe.

**Draft narratives with inline citations**, where every clause points at a passage and the reviewer can check each one. The generation is a presentation layer over retrieved evidence, not a substitute for it.

**Question-specific answers with mandatory citation**, where the system is required to abstain if it cannot ground the answer. Abstention must be a real, measured behaviour rather than an instruction in a prompt.

The pattern in all three: generation over verified structure, never generation as the source of truth.

## Evaluating it

Retrieval quality needs retrieval metrics, and this is where these systems are most often under-evaluated.

- **Recall at a workable rank.** Of the passages a domain expert considers relevant to a question, what share appear in the top results? Recall is the metric that matters most, because a missed passage is a missed fact.
- **Precision**, so reviewers are not wading through noise — but tuned as secondary to recall in most review workflows.
- **Citation accuracy.** When the system says a fact came from page 47, is it on page 47? Errors here destroy trust faster than anything else, because they are immediately visible.
- **Abstention correctness.** When the system says the record does not address a question, is that right? This is the hardest metric to build and one of the most important, because a confident "not documented" can drive a decision.
- **Contradiction detection.** Where records genuinely conflict, does the system surface both?
- **Reviewer time per case**, which is the operational justification for the whole thing.

## The realistic outcome

A well-built record review system does not eliminate the reviewer. It changes what they spend time on: from locating information to judging it.

That is a large improvement — record review is dominated by search, not by analysis — and it is achievable without asking anyone to trust a generated narrative about a patient's history. In a domain where the cost of a confident, fluent, wrong statement is high, evidence-first design is not a conservative choice. It is the one that actually works.
