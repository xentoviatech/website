---
title: Scan Once, Extract Many Times: Capture Standards That Do Not Age
description: Capture settings chosen for today's extraction pipeline will constrain every future one. Here is how to scan so the images outlive the software that reads them.
date: 2026-08-09
tags: [GovTech, Document Intelligence, Vision AI]
highlight: Do Not Age
ctaTitle: Setting capture standards for a programme?
ctaText: We are happy to review your scanning specification before it goes to procurement — it is much cheaper than rescanning.
ctaLabel: Talk to Us
ctaHref: /#contact
---

Scanning is the only step in a digitization programme that is genuinely expensive to redo, because it requires the physical material again — material that may be fragile, may be in use, and may be geographically scattered.

Everything else can be rerun. Extraction improves every year, and a corpus scanned properly can be reprocessed with a better pipeline at trivial cost. A corpus scanned badly is permanently limited by decisions made once, usually by whoever wrote the procurement specification.

This post is about writing that specification so it does not become the ceiling.

## The governing principle

Capture for preservation, derive for processing.

The archival master is the authoritative digital surrogate of the physical item. It is captured once, at the highest practical fidelity, with no destructive processing, and it is retained indefinitely. Everything the extraction pipeline consumes is derived from it and is disposable.

Most capture mistakes come from collapsing these two roles — optimising the master for the current pipeline's convenience, and discovering later that the optimisation removed information.

## Resolution

Set it from the smallest meaningful detail in the material, not from a default.

Ordinary printed text tolerates modest resolution. Small handwriting, faint pencil annotations, marginal corrections, stamps and seals, and fine ruling on registers need substantially more. The rule of thumb that works: the smallest character stroke you need to distinguish should span several pixels, not one or two.

If the corpus is heterogeneous, set the standard from the hardest stratum. Scanning everything at the higher setting costs storage, which is cheap; rescanning a subset costs handling the physical material again, which is not.

## Colour

Capture in colour, even for material that appears black and white.

Colour carries information that greyscale and bitonal capture destroy: which entries were made in which ink and therefore in which era, which annotations are later additions, which corrections are official and which are not, the difference between a stamp and printed text, and the state of the paper itself.

Bitonal capture — thresholding to pure black and white — is the most damaging common setting. It is compact and it produces clean-looking images, and it irreversibly discards exactly the low-contrast detail that faint handwriting and degraded ink consist of. A bitonal archive of a difficult manuscript corpus is close to unrecoverable.

## Processing at capture: less than you think

Scanner software offers a range of enhancements. Almost all of them belong on derivatives, not on the master.

**Deskew and crop** should be conservative on the master. Aggressive cropping removes marginal annotations, and annotations in the margin are frequently the point.

**Noise reduction and despeckling** remove small marks. Some of those marks are diacritics, punctuation, or the faint remains of a stroke.

**Contrast enhancement and background removal** improve appearance and destroy tonal information the extraction stage can use. Apply to derivatives if useful.

**Sharpening** introduces artefacts that can be misread as strokes.

**Compression** should be lossless for the master. Lossy compression artefacts around text edges are exactly the kind of degradation that harms handwriting recognition, and the damage is not visible at a glance.

The general rule: any processing that cannot be undone should not be applied to the master.

## Capture geometry and lighting

Flatbed or planetary capture with the page as flat as safely possible. Curvature near the gutter of a bound volume distorts text and is a common cause of extraction failure on the inner columns of registers.

Even, diffuse lighting without hotspots or shadows. A shadow across the gutter is the single most common lighting defect in bound-volume capture.

Include a colour target and a scale reference in the capture where the programme's standards call for it, so colour can be interpreted and physical dimensions recovered later.

Capture both sides of every leaf, including apparently blank ones. Blank verso pages establish that nothing was missed, and "apparently blank" pages often carry faint annotations.

## Structure and metadata

The image files alone are not the deliverable. What makes an archive usable years later is the structure around them.

- **Unambiguous identification** of volume, page and side, from a scheme that reflects the physical arrangement.
- **Page order preserved and verifiable**, with any anomalies in the original — missing pages, inserted leaves, out-of-order binding — recorded as observations rather than silently normalised.
- **Capture metadata**: device, settings, operator, date. This is what lets you diagnose a quality problem confined to one operator or one week, which is a common finding.
- **Condition notes** for items that are damaged, illegible or incomplete. A page that is genuinely unreadable in the original should be recorded as such, so downstream extraction failure is not misdiagnosed.
- **Checksums** for integrity verification over time.

## Quality control during capture, not after

Sampling images during the scanning run and checking them properly is far cheaper than discovering a systematic defect after the volumes have been returned.

Check for: focus and legibility of the smallest text, complete page coverage without clipped edges, correct orientation, no missing pages against the physical count, no shadow or hotspot defects, and colour consistency.

Set an explicit rescan trigger and rescan while the material is still on site. The cost asymmetry here is extreme.

## Storage that survives

Archival masters need a preservation strategy, not merely a disk. Multiple copies, geographically separated, with periodic integrity verification and a documented migration plan for formats and media.

The failure mode is quiet: a single copy on ageing storage, with nobody verifying integrity, discovered to be partially corrupt when it is finally needed. Fixity checking on a schedule is inexpensive and it is the difference between an archive and a folder.

## Why this matters more now, not less

It would be reasonable to think that better extraction models reduce the importance of capture quality. The opposite is closer to true.

Current models can extract information from difficult material that was previously unusable — faint ink, degraded paper, complex layouts. That capability depends entirely on the information being present in the image. A corpus captured at low resolution, thresholded to bitonal and lossily compressed has had that information removed, and no future model will recover it.

The material scanned today will be reprocessed several times over the coming decades by pipelines nobody has built yet. Capture standards are the constraint that determines what those pipelines will be able to do.
