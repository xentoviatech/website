---
title: From Handwritten Records to Structured Data: Lessons from Digitizing Government Archives
description: Millions of handwritten government records sit in paper archives worldwide. Here is what we learned building a VLM-powered pipeline to digitize them at scale — and what it means for any document-heavy enterprise.
date: 2026-03-07
tags: [Case Study, GovTech]
highlight: Government Archives
ctaTitle: Have documents that need to become data?
ctaText: Whether it is government archives, medical records, or insurance forms — let us show you what our pipeline can do.
ctaLabel: Book a Demo
ctaHref: /#contact
---
Across governments worldwide, there are millions of handwritten records sitting in physical archives. Land ownership registers, court proceedings, tax assessments, birth and death records, property mutation logs — decades of critical civic data recorded by hand in bound registers, stored in district offices, and accessed only by physically visiting the archive and flipping through pages.

The value of digitizing these records is obvious. Land records alone underpin property transactions, tax collection, dispute resolution, and infrastructure planning. When they exist only on paper, every transaction that depends on them is slow, opaque, and susceptible to fraud. But the scale of the problem is enormous, and the technical challenges of converting handwritten, multilingual, decades-old documents into structured digital data have defeated most attempts.

We built a pipeline to do this. Here is what we learned.

## Why Traditional Digitization Fails

The standard approach to large-scale document digitization is to scan everything, run OCR, and then fix errors manually. For government archives with handwritten records, every step of this process breaks down.

Scanning is the easy part, though even here there are complications — bound registers cannot be fed through automatic document feeders, aged paper tears easily, and varying page sizes require manual scanner adjustment. But the real failure point is extraction.

OCR was designed for printed text in Latin scripts. Handwritten Devanagari, Telugu, Tamil, or Bangla script — the languages in which most Indian government records are maintained — is not a problem OCR engines were built to solve. Character-level accuracy on handwritten regional scripts typically falls below 50%, which means more than half of all extracted characters are wrong. At that error rate, the OCR output is less useful than no output at all, because someone must now compare it character-by-character against the original image — a task slower than just reading the original and typing the data.

Manual data entry is the fallback, and it is what most digitization projects have relied on. But at scale — hundreds of thousands or millions of records — manual entry is prohibitively expensive and slow. A trained operator can digitize perhaps 40-60 records per day with acceptable accuracy. At that rate, a district archive with 500,000 records would take a team of 20 operators over a year to complete, at a cost that most government agencies cannot justify.

## Our Approach: VLM Extraction with Agentic Validation

We built a five-stage pipeline that combines vision language model extraction with agentic validation and human-in-the-loop review. Each stage addresses a specific failure mode of traditional digitization.

### Stage 1: Intelligent Page Classification

Government archives contain multiple types of registers — land ownership records, mutation registers, revenue collection logs — each with different column structures and field definitions. Before extraction can begin, the system must identify what type of document it is looking at.

Our classification model examines each scanned page and categorizes it by register type, identifying the column structure and expected fields. This happens before any text extraction, so the VLM receives context about what it should be looking for on each page. The classifier also detects blank pages, separator pages, and index pages that should be skipped rather than processed.

### Stage 2: VLM-Powered Extraction

The core extraction uses a vision language model that receives the page image along with a structured prompt describing the expected fields for that register type. The VLM reads the handwritten content and produces structured JSON output with field names, values, and confidence scores.

The key technical decisions here were around prompt engineering and image preprocessing. We found that OpenCV-based preprocessing — deskewing, contrast enhancement, noise reduction, and adaptive binarization — improved VLM accuracy by 8-12% on degraded documents. The preprocessing does not alter the content; it makes the content more legible to the model, the same way adjusting brightness on a photo helps a human read faded text.

### Stage 3: Agentic Validation and Cross-Referencing

Raw VLM output, even at 85%+ field-level accuracy, is not sufficient for government record systems where data integrity has legal implications. Our validation layer uses specialized agents that apply domain-specific rules:

- **Format validation:** Survey numbers follow specific patterns per district. Dates must fall within plausible ranges. Area measurements must use consistent units.
- **Cross-field validation:** The total area of a property must equal the sum of its subdivisions. Transaction dates must be chronologically consistent within a register. Buyer names in mutation records should match seller names in the corresponding previous entry.
- **Cross-page stitching:** Many register entries span multiple pages. The stitching agent identifies continuation markers and merges split entries into complete records, handling cases where a row starts on one page and ends on the next.

### Stage 4: Auto-Correction

When the validation agents identify inconsistencies, an auto-correction agent attempts to resolve them using contextual clues. If a survey number is extracted as "142/3A" but the format for that district requires a slash followed by exactly two digits, and the surrounding entries suggest this should be "142/3A" in a district where the format includes alphanumeric suffixes, the agent can confirm the extraction is actually correct despite the initial format flag. Conversely, if a date is extracted as "32/07/1998" — an impossible day — the agent checks whether the handwriting could plausibly be "22/07/1998" by re-examining the original image region.

Auto-correction resolves approximately 30-40% of validation flags without human intervention. The remaining flags are routed to human review.

### Stage 5: Human-in-the-Loop Review

The HITL interface is purpose-built for this workflow. Reviewers see the original scanned page with the relevant region highlighted on the left, and the extracted field data on the right. Confidence indicators use color coding: green for high-confidence accepted fields, yellow for auto-corrected fields, and red for fields requiring human judgment.

Reviewers can confirm, edit, or reject individual fields. They can also flag entire records for re-extraction if the scan quality is too poor, or mark records as illegible if the original handwriting cannot be read by either the model or a human. Every action is logged with a timestamp and reviewer ID for audit purposes.

In production, approximately 15-20% of extracted fields require human review. The review interface is designed so that a trained operator can review and finalize a complete record in 60-90 seconds, compared to 8-15 minutes for full manual data entry. This represents a 5-8x throughput improvement while maintaining accuracy above 99%.

## Technical Challenges We Solved

Several challenges specific to government archive digitization required purpose-built solutions:

- **Ink and paper degradation:** Records from the 1960s and 1970s are often written in iron gall ink that has faded to near-invisibility, on paper that has yellowed, stained, or partially deteriorated. Our preprocessing pipeline uses multiple enhancement strategies and selects the best result per-region rather than per-page, because degradation is often uneven across a single page.
- **Multi-language content:** A single register page might contain field headers in English, data entries in Devanagari, and annotations in a third language. The VLM handles this natively — it does not need separate models or modes for different scripts — but our validation rules needed to be language-aware to correctly parse dates, numbers, and names in each script.
- **Stamps and annotations overlapping data:** Government records frequently have official stamps, signatures, and margin annotations that overlap with data fields. The VLM is generally capable of reading text beneath or around stamps, but in severe cases the validation layer flags these for human review rather than guessing.
- **Government-format export:** The final output must conform to specific database schemas defined by government IT systems. These schemas vary by state and department. Our export layer transforms the extracted data into the required format, including generating checksums and validation reports that the receiving system expects.

## Lessons That Apply to Any Document-Heavy Enterprise

While this project was specific to government archives, the lessons we learned apply broadly to any enterprise dealing with complex document processing — insurance carriers processing handwritten claim forms, healthcare organizations digitizing patient records, financial institutions handling legacy documents.

- **Start with the hardest documents.** If your pipeline can handle degraded handwritten records in non-Latin scripts, it can handle everything else. Starting with easy documents and hoping to tackle hard ones later is how digitization projects stall — the hard documents are where the volume lives and where the value is.
- **Build validation into the pipeline, not after it.** Catching errors during extraction is orders of magnitude cheaper than catching them after the data has entered downstream systems. Every validation rule you add during pipeline development saves exponentially more manual effort in production.
- **Do not skip human review.** Even the best VLM makes mistakes. Even the best validation rules miss edge cases. Human review is not a sign that your AI is not good enough — it is the mechanism that makes the overall system good enough for production use in environments where data accuracy has legal or financial consequences.
- **Export in the customer's format, not yours.** The most technically elegant JSON schema is worthless if the receiving system expects a flat CSV with specific column names and date formats. Understanding the customer's data format requirements — and building export adapters for them — is as important as getting the extraction right.
- **Measure field-level accuracy, not character-level.** A character-level accuracy of 95% can mean a field-level accuracy of 70% or lower, because a single wrong character in a name or number makes the entire field wrong. Field-level accuracy is what determines whether the extracted data is actually usable.

Government archive digitization is one of the most challenging document processing problems in existence. The combination of handwritten content, non-Latin scripts, decades-old paper quality, and the legal stakes of getting it wrong means that any solution must be technically sophisticated, rigorously validated, and honest about its limitations. The pipeline we built — and continue to refine — proves that it is possible to do this at scale, with accuracy that meets government requirements, at a cost that makes large-scale digitization economically viable.
