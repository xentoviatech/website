---
title: Finding Subrogation Opportunities Nobody Has Time to Look For
description: Recovery potential is usually visible somewhere in the claim file. The problem is that reading every file is not economic — which is exactly the kind of problem document AI is suited to.
date: 2026-08-09
tags: [Insurance, Document Intelligence, Human-in-the-Loop]
highlight: Nobody Has Time
ctaTitle: Curious how much recovery you are leaving behind?
ctaText: We will screen a sample of closed files and show you what a systematic review surfaces.
ctaLabel: Book a Demo
ctaHref: /#contact
---

Subrogation is one of the few functions in claims where the return is measured directly in recovered money. It is also one of the most consistently under-resourced, for a structural reason: identifying recovery potential requires reading the file, and reading every file is not economic.

So carriers screen. Referral rules based on loss type, severity thresholds, and adjuster judgement catch the obvious cases. The rest close without anyone having asked the question — not because the potential was not there, but because nobody had time to look.

That is a screening problem over unstructured documents, which is a good fit for automation in a way that many claims applications are not.

## What the indicators look like

Recovery potential rarely appears as a field. It appears as facts distributed across documents:

- A police report identifying another party at fault, or noting a citation.
- A repair estimate describing damage patterns consistent with a third-party impact.
- A product involved in the loss, suggesting manufacturer or installer liability.
- A contractor or service provider whose work preceded the loss.
- A premises loss where the insured was not the owner.
- A commercial relationship with contractual indemnity or a certificate of insurance naming another party.
- Adjuster notes mentioning a third party in passing without a referral being made.
- Another carrier already in correspondence on the same event.

Each is a signal a person would recognise immediately on reading. None is reliably captured in structured claim data, which is why rules-based screening over the claims system misses them.

## The screening pipeline

**Index the full file.** Every document, classified, with text and structure extracted and retained. This is a prerequisite and it is where most of the work is.

**Extract entities.** People, companies, vehicles, addresses, products, roles. The critical part is *role*: identifying a party as a third-party driver, a contractor, a property owner or a product manufacturer is what turns a name into a signal.

**Detect indicators as explicit rules over those entities.** A third party is named and a liability-suggesting document type is present. A product is identified and the loss cause relates to it. A contractor performed work within a relevant window. Keep these as named, auditable rules rather than an opaque score — the referral team needs to know why a file surfaced.

**Score and rank.** Combine indicators with recoverable amount and any applicable time limits into a priority order. The output is a queue, ordered by expected value.

**Present with evidence.** This is where the design succeeds or fails. A referral suggestion that says "possible subrogation" is close to useless. One that says *"police report page 2 identifies a third-party driver cited for failure to yield; estimate totals $18,400; statute of limitations in this jurisdiction runs 14 months from the loss date"* — with links to the exact pages — can be actioned in a minute.

## Time limits are the highest-value output

Recovery rights expire. Limitation periods vary by jurisdiction, by cause of action, and by the parties involved, and they run from dates that are themselves in the documents.

A system that tracks applicable deadlines per file and surfaces them before they lapse produces value independently of everything else. Files that were correctly referred but then sat, files that were identified late, files where the deadline was calculated from the wrong date — these are recoverable losses caused by administration rather than judgement.

Two cautions. Limitation analysis is a legal determination and the rules are genuinely intricate; the system should surface *candidate* deadlines with the basis for the calculation and route them to someone qualified, not present them as legal conclusions. And the calculation depends on extracted dates being right, so date fields in this workflow warrant tight thresholds and validation.

## Retrospective screening

The most immediately compelling application is running the screen over recently closed files.

The cost is inference over documents you already hold. The output is a ranked list of files where recovery may still be available and the limitation period has not run. Some proportion will be genuine, and unlike most AI business cases the benefit is measurable in recovered money rather than in saved minutes.

It also produces something more useful than the recoveries themselves: a calibration of how much your current screening misses, and in which categories. That tells you whether to change the referral rules, the adjuster training, or both.

## Design constraints worth respecting

**Recommend, never decide.** The system identifies candidates and assembles evidence. Whether to pursue recovery is a judgement involving legal merit, relationship considerations and commercial factors that are not in the documents.

**Precision matters more than recall here.** A referral queue full of weak candidates trains the team to ignore it, and a discredited queue is worse than no queue. Better to surface fewer files with strong evidence and expand the criteria as the team's confidence grows.

**Make feedback trivial to give.** Every referral the team rejects, with a reason, is exactly the signal needed to tune the rules. A one-click reason code on the referral screen will produce more improvement in three months than any amount of upfront modelling.

**Handle sensitive content carefully.** Claim files contain medical records, personal data and privileged material. The same access controls, retention rules and audit requirements apply to the screening system as to the claims system itself — this is an area where a well-intentioned analytics project can create a genuine compliance problem.

## Measuring it

- **Referral rate** before and after, and the share of new referrals that came only from the automated screen.
- **Acceptance rate** of automated referrals by the recovery team — the direct measure of precision, and the number to watch first.
- **Recovered amounts** attributable to files surfaced by the screen.
- **Missed-deadline rate**, which should fall to near zero and stay there.
- **Screening coverage** — the share of closed files actually screened, which in most carriers starts far below 100% and is the underlying reason the opportunity exists.
