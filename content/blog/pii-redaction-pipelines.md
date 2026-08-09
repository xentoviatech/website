---
title: Automated Redaction Is Asymmetric, and That Changes the Design
description: Over-redacting is correctable. Under-redacting is not. Every design decision in a redaction pipeline should follow from that asymmetry.
date: 2026-08-09
tags: [Security, Compliance, Document Intelligence]
highlight: Asymmetric
ctaTitle: Building a redaction workflow?
ctaText: We will show you candidate detection, reviewer tooling and verified output — with the human confirmation step built in.
ctaLabel: Talk to Us
ctaHref: /#contact
---

Redaction appears in a lot of workflows: public records disclosure, litigation production, data sharing with third parties, building development datasets, publishing research, and complying with data subject requests.

It is often approached as a detection problem — find the personal information, cover it up. That framing understates the difficulty, because the two kinds of error have completely different costs and the correct design follows from that asymmetry rather than from any accuracy target.

## The asymmetry

**Over-redaction** hides something that did not need hiding. The requester complains, someone reviews it, the material is released. Annoying, correctable, occasionally embarrassing.

**Under-redaction** discloses something that should have been protected. Once a document has been released, it cannot be recalled. Depending on the content and jurisdiction this can be a notifiable breach, a legal exposure, or a serious harm to an individual.

These are not comparable. A pipeline tuned to balance precision and recall is optimising the wrong objective. The design should push hard toward recall and manage the resulting over-redaction through human review.

This is the reason a fully automated redaction pipeline is not an appropriate design for consequential disclosures, however good the detection is.

## What has to be found

**Direct identifiers.** Names, addresses, phone numbers, email addresses, national identifiers, account numbers, dates of birth. The tractable category, and where most detection tools focus.

**Indirect identifiers.** Job titles, employers, relationships, distinctive circumstances, dates and locations that in combination identify someone. Much harder, because whether something identifies a person depends on what else is in the document and on what the recipient already knows.

**Context-dependent sensitivity.** A medical condition, a financial circumstance, a criminal matter — sensitive because of what they are, not because of a recognisable format.

**Information about third parties.** A record about one person routinely contains information about others, and their information usually requires protection even when the primary subject has consented.

**Information in non-text form.** Names on signatures, identifiers in stamps, faces in photographs, information in charts and diagrams. A text-based detector will miss all of it.

**Information in metadata.** Author fields, revision history, embedded properties, tracked changes, comments. Frequently the actual leak path, and invisible in the rendered document.

## Redaction has to be applied, not drawn

The most common technical failure in redaction is drawing a black rectangle over content without removing the content.

The visual result looks correct. The underlying text remains in the file and can be extracted by anyone who selects and copies it. This has caused real disclosure incidents in high-profile settings, repeatedly.

Correct redaction removes the content from the file. The reliable approach for consequential disclosures is to produce a new document from the redacted rendering — rasterise the page, apply the redaction to the image, and generate a fresh file with no inherited content layer. Slower, larger, and unambiguous.

Then verify the output rather than trusting the process: extract text from the produced file and confirm the redacted content is absent. This check is cheap and it catches an entire class of implementation error.

Metadata must be stripped explicitly. It is not covered by anything applied to the page content.

## The design that follows

**Detect broadly, with candidates.** Tune for recall. Produce candidates with a type and a confidence rather than a binary decision.

**Present candidates to a reviewer, do not apply them.** The reviewer confirms, rejects and adds. Human judgement is required both for the indirect identifiers a detector will miss and for the context-dependent decisions it cannot make.

**Make the review efficient.** This determines whether the workflow is viable at volume. Candidates highlighted in place, keyboard navigation, bulk actions for repeated entities — confirming that a name appearing forty times is redacted everywhere should be one action, not forty.

**Support entity-level consistency.** If a person is redacted, every reference to them should be, including variants and partial mentions. Inconsistent redaction across a document set is a common way information leaks — the name appears once in a file where it was missed, and the whole redaction is undone.

**Verify the output automatically.** Extract from the produced file and confirm absence. Fail the job if anything is found.

**Log everything.** What was detected, what was confirmed, what was added, what was rejected, by whom. Redaction decisions are challenged, and reconstructing them later requires the record.

## The multi-document problem

Redaction consistency across a set is harder than within one document, and it is where sophisticated re-identification happens.

If a name is redacted in one document and appears in another in the same production, the redaction has failed. If a person is identifiable by combination — a role, a date, a location, none of which is individually identifying — no per-document detector will catch it.

This requires set-level analysis: build the entity set across the whole production, apply redaction decisions per entity rather than per occurrence, and review the residual combinations for re-identification risk. For large productions this is expert work and should be planned as such.

## Where automation is genuinely safe

**Development and test data.** Redacting to create a working dataset has a lower bar, because the output is internally controlled and a residual identifier is a contained problem rather than a disclosure. Automated redaction is reasonable here — though the data should still be treated as sensitive, since redaction is imperfect.

**Pre-processing before external processing.** Removing identifiers before sending content to a third-party service reduces exposure even if imperfect. Defence in depth rather than a guarantee.

**Log and telemetry scrubbing.** Automated removal of identifiers from logs is appropriate and worth doing by default.

**Candidate generation** for any workflow, as above.

## Measuring it

- **Detection recall by identifier type**, measured on a labelled set. The metric that matters, and it should be reported by type rather than in aggregate.
- **Reviewer addition rate** — how often reviewers add redactions the system missed. A direct measure of the recall gap in production.
- **Reviewer rejection rate** — the over-detection cost, which determines review time.
- **Output verification failures**, which should be zero and should be alerted on immediately.
- **Review time per document**, the operational constraint.
- **Post-release incidents**, the outcome that the whole design exists to make impossible.

## The position to hold

Automated redaction assistance is genuinely valuable — it removes most of the mechanical work from a slow, painstaking task, and it catches things a tired reviewer misses.

Automated redaction *without* human confirmation, for anything being disclosed outside your organisation, is a design that trades a bounded cost for an unbounded one. The asymmetry does not go away with a better detector, because the errors that matter are precisely the ones detectors are structurally unable to catch.
