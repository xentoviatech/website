---
title: Why Pathology Dictation Is a Harder Speech Problem Than It Looks
description: General-purpose transcription fails on pathology for specific, fixable reasons — vocabulary, structure, and the fact that a single misheard word changes a diagnosis.
date: 2026-08-09
tags: [Healthcare, Voice AI, Evaluation]
highlight: Harder Than It Looks
ctaTitle: Want to hear XentoScribe on your own dictation?
ctaText: Record a few typical reports. We will show you the structured output, the terminology handling and the review flow.
ctaLabel: Book a Demo
ctaHref: /xentoscribe/
---

Speech recognition is widely regarded as solved. For general conversational speech in good conditions, that is close to true. For a pathologist dictating a surgical report, it is not — and the reasons are specific enough to be worth enumerating, because each one is addressable.

## What makes it hard

**The vocabulary is not in the general model.** Anatomical terms, tumour classifications, staging nomenclature, stain names, immunohistochemistry markers, organism names, eponymous entities. General models substitute a common word that sounds similar, producing text that is fluent, plausible, and clinically wrong.

**The consequences are asymmetric and severe.** In most transcription applications a word error is an inconvenience. In pathology, a misheard laterality, a wrong margin measurement, a substituted grade or an inverted negation changes the meaning of a diagnostic report. Word error rate is not the right metric because it treats every word equally, and these words are not equal.

**Reports are structured, speech is not.** A pathology report has a defined shape — specimen, gross description, microscopic description, diagnosis, comment, staging. Pathologists dictate in that structure but with verbal navigation: "next specimen", "under microscopic", "go to the diagnosis line". A transcript that ignores structure produces a wall of text someone must then reformat, which is much of the work the dictation was meant to save.

**Dictation is not linear.** Corrections mid-sentence, returning to an earlier section, "scratch that", "make that four point two centimetres". A transcription that faithfully records the correction *and* the corrected text produces a report containing both.

**Numbers and measurements carry weight.** Dimensions, distances to margins, counts, percentages, node ratios. These are frequently the most consequential values in the report and they are dictated in forms with real ambiguity — "four point two by three point one by two centimetres" has to become a structured measurement, not a string.

**Environment and speech patterns.** Grossing rooms are noisy. Dictation happens with a mask on, at the scope, at speed, often by a non-native English speaker, frequently interrupted.

## What actually helps

**Domain vocabulary, actively maintained.** Not just a word list — a lexicon with the pronunciations that occur in practice, including the abbreviated forms pathologists genuinely use. This is ongoing maintenance work and it is the single largest quality lever.

**Contextual biasing.** The expected vocabulary differs by specimen type and by section of the report. A system that knows it is in the microscopic description of a breast specimen can weight candidates accordingly, which resolves a large share of the ambiguous cases.

**Structured output as the target.** Transcribe into the report structure directly, using the pathologist's verbal navigation as section boundaries. The deliverable should be a populated report, not a paragraph of text to be reformatted.

**Explicit handling of correction speech.** Detect and apply self-corrections rather than transcribing them. This is a small feature that materially changes how the output feels to use.

**Measurements as typed values.** Parse dimensions, counts and percentages into structured fields with units. This enables validation — a margin distance greater than the specimen dimension is a detectable error — and it makes the data usable downstream in synoptic reporting.

**Confidence at the term level, surfaced in the editor.** Uncertain terms should be visibly marked, so a pathologist reviewing the draft looks at the right places. A flat block of text gives no indication of where to concentrate attention, and review attention is finite.

**Negation handled deliberately.** "No evidence of malignancy" and "evidence of malignancy" differ by one word. Negation and hedging need specific treatment and specific testing.

## Measuring it properly

Word error rate is the wrong headline metric. Use it as a diagnostic, not as the target.

The metrics that reflect clinical utility:

- **Critical term accuracy** — a defined list of terms whose misrecognition changes meaning: laterality, negation, grades, stages, margin status, malignancy terms. Measured separately, with a target near perfect.
- **Measurement accuracy** — exact match on parsed numeric values with units.
- **Structural accuracy** — did content land in the correct report section?
- **Edit distance to signed report** — how much the pathologist changed between draft and signature. The most honest end-to-end measure, because it captures everything the pathologist actually had to fix.
- **Time to signature** — the operational outcome the deployment is for.
- **Per-speaker breakdown.** Aggregate accuracy hides the pathologist for whom the system performs poorly, and that person's experience determines whether the department adopts it.

That last point is worth dwelling on. Adoption of dictation tools is decided individually. A system that works excellently for eight pathologists and badly for two will be described as unreliable, because the two will say so. Per-speaker measurement and per-speaker adaptation are not refinements; they are how deployments succeed.

## Design constraints

**The pathologist signs.** The system produces a draft. Review and signature are clinical acts and remain human, always.

**Never silently smooth.** A system that quietly corrects what it thinks was meant is more dangerous than one that flags uncertainty, because it removes the signal that review is needed.

**Fit the existing workflow.** Pathologists have established habits with existing systems. A tool requiring a substantially different dictation style will be abandoned regardless of accuracy.

**PHI throughout.** Audio, transcripts, drafts and logs all contain protected health information, with the handling requirements that implies — including for the audio, which is easy to overlook because it does not look like a document.

## The realistic value

The gain is not eliminating pathologist involvement. It is producing a draft in report structure with measurements parsed and uncertain terms flagged, so that the review is a focused verification rather than a transcription-and-formatting task.

Where that works, it removes a meaningful amount of time per report and, more importantly, removes it from the part of the day that pathologists find least valuable. That is a good outcome and it does not require claiming that a speech model can produce a signable diagnostic report on its own.
