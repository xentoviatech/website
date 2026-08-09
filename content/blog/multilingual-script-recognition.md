---
title: Multilingual and Multi-Script Documents in One Pipeline
description: Real archives and real enterprises produce documents with two scripts on one page, transliterated names, and language that switches mid-sentence. Here is how to build for that rather than around it.
date: 2026-08-09
tags: [Vision AI, Document Intelligence, GovTech]
highlight: One Pipeline
ctaTitle: Have documents no single-language pipeline handles?
ctaText: Mixed-script registers, transliterated names, code-switched correspondence — send us the awkward ones.
ctaLabel: Book a Demo
ctaHref: /#contact
---

A great deal of document AI is built with an implicit assumption that a document is in one language and one script. Large parts of the world do not produce documents that way.

A land register with printed headers in one script and handwritten entries in another. A form with English field labels completed in a regional language. A commercial document with a company name in Latin script and an address in Arabic. Correspondence that switches language mid-sentence. Names transliterated inconsistently across the same file.

These are not edge cases in the markets where they occur. They are the normal case, and pipelines built around a single-language assumption fail on them in ways that are hard to diagnose.

## The distinct problems

**Script and language are different things.** One script serves many languages; one language may be written in several scripts. Detecting which script a region uses is a visual problem; determining the language is a linguistic one. Systems that conflate them mishandle exactly the cases where they differ.

**Mixing happens at several levels.** Different scripts in different regions of a page — headers versus entries, labels versus values. Different scripts within one line. Different languages within one sentence. Each level needs different handling, and a system that only supports page-level language selection cannot address any of them.

**Numerals are their own problem.** Many scripts have their own digit forms, and documents frequently mix them — a date in one numeral system and an amount in another on the same line. Normalising numerals correctly, while retaining what was written, matters for anything computed downstream.

**Transliteration is not deterministic.** A name written in one script may be transliterated into another in several defensible ways, and the same person's name may appear differently across documents in one file. Matching across transliterations is a distinct capability and it is usually the hardest part of entity resolution in multilingual corpora.

**Reading order varies.** Right-to-left scripts, mixed-direction text within a line, and documents with columns ordered differently by convention. Layout analysis that assumes one direction will scramble the rest.

**Model quality varies enormously by script.** Performance tracks the volume of available training data. Widely-digitized scripts perform well; others do not, and handwritten forms of less-represented scripts are the hardest case there is.

## Building for it

**Detect script per region, not per document.** Segment the page, classify script for each region, and route accordingly. This single change handles the most common mixing pattern — printed labels in one script, handwritten values in another — which defeats page-level approaches entirely.

**Keep the original alongside any normalisation.** Store what was written, in its own script, as the authoritative value. Store transliterations, translations and normalised numerals as derived fields, clearly marked as derived. Programmes that store only the transliteration lose information permanently and create a record that cannot be reconciled with the source.

**Use script-aware reference data.** Gazetteers and name lists in the original script are far more effective than transliterated ones, because they avoid a lossy conversion before matching. Where you must match across scripts, do it with a purpose-built transliteration-aware matcher rather than by string comparison after conversion.

**Handle numerals explicitly.** Detect the numeral system per field, convert for computation, retain the original for display and audit.

**Test mixed cases specifically.** An evaluation corpus assembled by language will have single-language documents in it. Mixed-script pages need to be a deliberate stratum, or the failure mode will never appear in your metrics.

**Report accuracy by script.** Aggregate accuracy on a multilingual corpus is close to meaningless — it averages a strong script with a weak one and hides both. Per-script, per-field breakdowns are what tell you where the work is.

## Entity resolution across scripts

This is where multilingual corpora are genuinely hard, and it deserves separate treatment.

The same person, place or organisation appears across documents under different spellings, different transliterations, sometimes in different scripts entirely, and with different name-ordering conventions. Resolving these to one entity is essential for any application that aggregates across documents — which is most of them.

What helps:

- **Match in the original script where both sides have it.** Every conversion loses information.
- **Use phonetic matching adapted to the languages involved**, not a generic algorithm designed for one language family.
- **Use contextual corroboration.** Two records with similar names, the same address and the same identifier are the same entity regardless of transliteration differences. Names alone are the weakest signal available.
- **Keep the alternates.** An entity record should retain every observed form, so a future document matching any of them resolves correctly.
- **Route ambiguity to a human who reads the languages involved.** This is not a task for a reviewer working through transliterations.

## Where to set expectations

Be explicit, per script and per material type, about what the pipeline handles well.

Printed text in widely-supported scripts: strong. Printed text in less-supported scripts: usually workable, with more review. Handwritten text in widely-supported scripts: good, with review, as covered in our handwriting post. Handwritten text in less-supported scripts: variable, and dependent on reference data more than on the model.

Stating this plainly at the outset is what allows a programme to be planned properly. The alternative — a uniform accuracy claim across a multilingual corpus — is not achievable and produces a plan that fails on the weakest stratum while nobody understands why.
