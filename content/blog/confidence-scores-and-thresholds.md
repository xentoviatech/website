---
title: Confidence Scores Are Not Probabilities (Until You Make Them One)
description: The number a model attaches to an extraction is rarely the probability that it is correct. Here is how to calibrate confidence so your review thresholds mean something.
date: 2026-08-09
tags: [Document Intelligence, Evaluation, Agentic AI]
highlight: Not Probabilities
ctaTitle: Want a calibration report on your own fields?
ctaText: We will bucket your extractions by confidence and show you observed accuracy per bucket — the fastest way to find out whether your thresholds are real.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Ask a document AI system how sure it is about a field and it will give you a number. Ask what that number means and the answers get vague. This matters more than it sounds, because every routing decision in an automated pipeline hangs off that number: auto-approve, send to review, reject outright.

If the score is not calibrated, the thresholds built on top of it are arbitrary, and the STP figure they produce is fiction.

## Where the number comes from

Different systems produce confidence in fundamentally different ways, and they are not interchangeable.

**Token probability.** For a generative model, the average or minimum probability across the tokens it emitted for a field. Cheap to obtain and weakly related to correctness. A model can be highly confident token-by-token while hallucinating a plausible value that is not on the page at all — fluent output is not evidence of grounded output.

**Self-reported confidence.** Asking the model to rate its own certainty. Convenient, and biased in ways that are hard to predict. Models tend to cluster their self-ratings and are systematically overconfident on inputs unlike their training distribution — precisely the cases you most need flagged.

**Ensemble agreement.** Running extraction more than once, or with more than one model or prompt, and measuring whether the answers agree. Considerably more informative and considerably more expensive. Disagreement is a strong signal; agreement is weaker evidence than it feels, since correlated models make correlated mistakes.

**Grounding checks.** Verifying that the extracted value actually appears in the source region the model points to. This converts a fuzzy question ("is the model sure?") into a concrete one ("is this text on the page?"), and it is the single most effective guard against fabricated values.

**Validation-derived confidence.** Confidence assigned after the fact by rules: the total reconciles, the date is in a plausible range, the identifier resolves against a system of record. This is often the strongest signal available, because it is grounded in your business logic rather than the model's internals.

Most production systems worth using combine several of these. A single raw model score, used alone, is the weakest option on the list.

## Calibration, measured

A score is calibrated when it matches observed frequency: fields scored 0.9 are correct roughly 90% of the time. Testing this requires nothing exotic.

1. Take a sample of extractions large enough to fill buckets — a few thousand fields is usually workable.
2. Establish ground truth by human review.
3. Bucket by confidence and compute accuracy per bucket.
4. Plot expected against observed.

The shape of the result tells you what to do:

- **Diagonal line.** Calibrated. Thresholds mean what they say. Choose an operating point and move on.
- **Bowed below the diagonal.** Overconfident — the usual case. High scores are not as trustworthy as they claim. Either recalibrate or set thresholds far higher than intuition suggests.
- **Flat.** The score carries no information. Whatever you are gating on, it is not correctness. This is the failure mode to catch early, because everything downstream is compromised.
- **Bimodal with nothing in between.** Common with self-reported confidence. The model says 0.95 or 0.4 and little else, which leaves you no room to tune. Add an independent signal.

Do this per field, not globally. Aggregate calibration can look reasonable while a specific high-stakes field is badly miscalibrated, and the aggregate is exactly where that gets hidden.

## Fixing miscalibration without retraining

You rarely need to touch the model.

**Post-hoc recalibration.** Fit a simple mapping from raw score to observed accuracy on held-out data — isotonic regression or Platt scaling both work and neither requires anything more than the calibration table you already built. Apply the mapping and your scores become probabilities you can reason about.

**Per-field thresholds.** There is no reason a policy number and a free-text remarks field should share a cutoff. Set thresholds from the calibration curve per field, weighted by what an error in that field costs. A field where mistakes are cheap and self-correcting downstream can run loose; a field that drives a payment cannot.

**Composite gating.** Combine signals with an explicit rule rather than trusting one. A field auto-approves when the model score clears the bar *and* the value is grounded in the page image *and* it passes validation. Each condition is weak; the conjunction is strong.

**Abstention as a first-class output.** Let the system say "not present" or "illegible" instead of forcing a guess. A model that must produce a value will produce one, and a fabricated value with a middling confidence is far more dangerous than an honest blank. Measure how often abstention is correct — it is a real capability and it belongs in the evaluation.

## Setting the threshold as a business decision

Once scores are calibrated, threshold-setting stops being a technical question. The optimal cutoff is where the expected cost of an escaped error equals the cost of a human review:

```
threshold: auto-approve when  (1 - p_correct) x cost_of_error  <  cost_of_review
```

With a $2 review and a $400 error cost, you need roughly 99.5% confidence before automating. With a $2 review and a $5 error caught immediately downstream, you can automate at 70%. Same model, same pipeline, thresholds an order of magnitude apart — because the economics are different, not the technology.

This framing is also how to have a productive conversation with a risk or compliance function. They are not really asking for higher accuracy; they are asking for a bounded, measured error rate on decisions that matter. Give them the calibration table and the cost model, and the threshold argument resolves itself.

## Signs the confidence signal is decorative

- Scores cluster tightly near 1.0 with almost nothing below 0.9.
- Accuracy in the top bucket is materially below the bucket's nominal value.
- A field the model cannot possibly know — because it is genuinely absent from the page — still returns a high score.
- Scores are identical across document types of obviously different difficulty.
- The vendor cannot explain how the score is produced.

Any one of these justifies building your own gating layer on top of validation rules rather than trusting the supplied number.

## The uncomfortable part

Good calibration usually *lowers* the headline STP figure, because it exposes uncertainty that was previously hidden. A system that discovers 12% of its documents are genuinely uncertain and routes them to a human is more trustworthy — and reports a worse number — than the same system with an uninformative score that waves everything through.

That trade is almost always worth making in a regulated workflow, and it is worth saying explicitly to whoever owns the automation target. The goal is not the highest number on the slide. It is the highest number you would be willing to defend in an audit.
