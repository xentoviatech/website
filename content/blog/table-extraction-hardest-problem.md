---
title: Why Tables Are Still the Hardest Part of Document AI
description: Models that read prose reliably still fall apart on merged cells, multi-page rows, and columns whose meaning is defined three pages earlier. Here is why, and what actually helps.
date: 2026-08-09
tags: [Document Intelligence, Vision AI, Evaluation]
highlight: Hardest Part
ctaTitle: Have a table format nothing handles well?
ctaText: Send us the ugliest one you have. Multi-page, merged cells, hand-ruled — those are the interesting cases.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Extraction quality on a document rarely degrades evenly. A system that reads the header block, the addresses and the narrative sections at near-perfect accuracy will often drop sharply the moment it reaches a table — and tables are usually where the numbers you actually need are sitting.

This is not a temporary gap waiting for the next model release. Tables are structurally harder than prose in ways worth understanding, because the understanding changes what you build around them.

## A table is two documents at once

Prose is a sequence. A table is a sequence *and* a grid, and the meaning of any cell depends on its position in both.

The value `1,240.00` in isolation is nothing. It becomes meaningful only through its column header, its row label, possibly a section heading several rows above, possibly a unit declared in a footnote, and possibly a currency stated in the document header two pages earlier. Getting the cell right requires reconstructing all of that context correctly. A single mistake in row or column association produces a value that is perfectly transcribed and completely wrong — the worst category of error, because it passes every character-level check.

## The failure modes, specifically

**Merged cells.** A cell spanning three rows means its value applies to all three. Models frequently attach it to the first row and leave the others empty, or repeat it in a way that changes a total. Vertical merges in the leftmost column are especially common and especially damaging, since that column usually carries the row's identity.

**Multi-page tables.** A table continuing across a page break may repeat its header, may not, and may split a single logical row across the boundary. Systems that process page by page — which is most of them, for context and cost reasons — have to stitch this back together. Subtotals repeated at the bottom of each page then get double-counted into the grand total.

**Implicit structure.** Financial statements and government registers routinely use indentation and blank rows to convey hierarchy that exists nowhere in the markup. A line indented under a section heading is a child of it. Flatten that and you get a list of numbers with no idea which roll up into which.

**No ruling lines.** Whitespace-delimited tables are common in older documents and in anything printed from a fixed-width system. Column boundaries have to be inferred from alignment, and a single long value that overflows its column will shift the inference for that row.

**Rotated and oversized tables.** Landscape tables in a portrait document, or a wide schedule folded across a spread. These need detection and reorientation before extraction is even attempted.

**Handwritten additions.** Corrections, marginal notes, struck-through rows, values written above the printed ones. A struck-through row that gets extracted as live data is a serious error, and detecting strikethrough reliably is genuinely hard.

**Footnote-modified values.** A superscript marker changing the meaning of a number — restated, estimated, provisional — is easy to miss and can invert the interpretation of the figure entirely.

## What actually helps

**Extract structure and values as separate steps.** Detect the grid first — rows, columns, spans, header regions — then read cells within the known structure. Asking a single call to do both at once means an error in structure silently corrupts every value. Splitting them also makes the failure diagnosable: you can see whether the grid was wrong or the reading was.

**Preserve geometry.** Keep the bounding box of every cell. It is what makes review possible (crop the exact cell and show it to a human), what makes multi-page stitching tractable, and what lets you verify that an extracted value came from where the model says it did.

**Validate arithmetic.** Tables are unusually well suited to self-checking. Rows sum to totals, columns sum to totals, subtotals roll up, quantity times unit price equals amount, balances carry forward. Every one of these is a free correctness check, and a failed check localises the error to a specific region. This is the highest-leverage thing you can build around table extraction and it needs no model at all.

**Reconcile against reference data.** If line items reference product codes, account numbers or HS codes, resolving them against a master list catches transposition errors that arithmetic will not.

**Detect continuation explicitly.** Treat "is this table a continuation of the previous page's table?" as its own classification decision with its own confidence, rather than an assumption. Repeated headers, page-break position, and column-signature matching are all usable signals.

**Set a per-cell confidence and review per cell.** Sending a 200-row table to human review because three cells were uncertain is how automation stops paying for itself. Reviewers should see three cropped cells, not a page.

## Evaluating table extraction properly

Standard field accuracy does not capture table quality. Measure these separately:

- **Grid accuracy** — were the row and column counts and the spans detected correctly? Everything else is conditional on this.
- **Cell content accuracy** — of correctly located cells, how many read correctly?
- **Association accuracy** — was each value attached to the right row label and column header? This is the metric that catches the dangerous errors, and it is the one most often omitted.
- **Row completeness** — no dropped rows, no phantom rows, no duplicated rows from page stitching.
- **Reconciliation pass rate** — what fraction of extracted tables satisfy their own internal arithmetic? A strong proxy for overall quality, computable without ground truth, which makes it usable as a production monitor rather than only a test-time metric.

That last one deserves emphasis: it is one of the few document AI quality signals you can compute continuously on live traffic with no labels. If reconciliation pass rate drops on Tuesday, something changed on Tuesday.

## When to stop trying to be clever

Some tables are not worth automating. A hand-drawn register with inconsistent column counts per page, heavy annotation and no arithmetic to validate against may be cheaper to key than to extract-and-verify — and there is no shame in scoping it out.

The useful decision rule: estimate reviewer time per table under automation versus manual entry time. If automation plus verification is not meaningfully faster, the honest answer is to route that format to manual handling and spend the effort on the formats where the margin is large. A pipeline that is explicit about what it does not handle is far more trustworthy than one that quietly produces plausible numbers for everything.
