---
title: Data Residency When Your Model Provider Is Somewhere Else
description: A vendor hosting in your region may still send your documents through an inference endpoint in another. Here is how to establish where processing actually happens.
date: 2026-08-09
tags: [Compliance, Security, Procurement]
highlight: Somewhere Else
ctaTitle: Have residency constraints to satisfy?
ctaText: We support regional and in-environment deployment. Tell us your constraint and we will tell you honestly whether we can meet it.
ctaLabel: Talk to Us
ctaHref: /#contact
---

Data residency was a reasonably tractable question when software meant storage and compute the vendor controlled. You asked where the database was, the vendor told you, and the answer was verifiable.

AI systems complicate this in a specific way: the inference call. A vendor can host their application, their database and their storage in your region, and still send the contents of your documents to a model endpoint somewhere else. The standard residency question — where is my data stored — does not surface it, because that is not storage.

## Ask about processing, not storage

The precise question is where your content is **processed**, which for a document pipeline means where every one of these happens:

- Document upload and storage.
- Page rendering and pre-processing.
- The model inference call — the one most often overlooked.
- Extracted data storage.
- Logs, telemetry and monitoring.
- Backups and disaster recovery.
- Any human review, including where reviewers are located.

That last one is worth naming explicitly. If a vendor uses a review or annotation team, the people looking at your documents are in a location, and that is a data transfer. It should be disclosed and it frequently is not asked about.

## The inference endpoint question

Model providers offer varying regional coverage, and it is generally narrower than their general cloud infrastructure. A vendor may genuinely intend to keep processing in your region and be constrained by which regions their model provider serves.

Questions that establish the position:

- Which model provider and which specific endpoint or deployment is called?
- In which region does that endpoint run?
- Is there a contractual commitment that it will not change?
- If the provider adds capacity elsewhere, or fails over, where does traffic go?
- What is the retention configuration at that endpoint, and where does any retained data sit?

Failover is the one most commonly missed. A system pinned to one region under normal operation may fail over to another during an incident, which is exactly the moment nobody is checking.

## Deployment models and what they actually give you

**Multi-tenant SaaS in a chosen region.** Simplest and cheapest. Your data is in the region, logically separated from other customers. Adequate for many purposes and insufficient where isolation is a hard requirement.

**Single-tenant in a chosen region.** Dedicated infrastructure, stronger isolation, higher cost. The inference endpoint question still applies and is still the one to check.

**Deployment into your cloud environment.** The vendor's software runs in infrastructure you control. Strong control over data location and access. The model call may still leave your environment unless the model is also deployed there.

**Fully self-contained, including the model.** Open-weight models deployed inside your environment, with no external calls. The strongest position and the one with real trade-offs: you accept the operational burden, and open-weight model quality on a given task may differ from the frontier hosted options. Worth measuring rather than assuming in either direction.

The pattern to notice: the strength of the residency guarantee tracks how much of the stack sits inside your boundary, and the cost and operational burden track the same axis. There is no configuration that gives you frontier hosted models and a guarantee that nothing leaves your environment.

## What belongs in the agreement

A data processing agreement should specify, concretely:

- The categories of data processed and the purposes.
- Named subprocessors, with the model provider explicitly included, and notification before changes.
- Processing locations for each stage, including inference.
- The transfer mechanism where data crosses borders.
- Retention periods per data category, and the deletion mechanism.
- Security measures.
- Breach notification timing.
- Audit rights.
- Assistance with data subject requests.
- What happens at termination.

Two items deserve particular attention for AI vendors. **Training use** must be addressed explicitly — the absence of a statement is not a prohibition. And **subprocessor notification** matters more than usual, because the model supply chain changes more frequently than conventional infrastructure.

## Verifying rather than trusting

Contractual commitments are necessary and not self-enforcing.

Ask for architecture documentation showing data flows with regions marked. Ask whether the regional configuration is technically enforced or operationally maintained — an enforced constraint that cannot route elsewhere is a stronger control than a setting. Ask what logging exists to demonstrate where processing occurred, and whether you can see it. Where the deployment is in your own environment, network egress controls give you the ability to verify independently, which is the strongest position available.

## Sector-specific constraints

Some sectors carry harder requirements than general data protection law: government and public sector work, certain financial services regimes, health data in some jurisdictions, and defence-adjacent work.

Where these apply, the constraint is often not satisfiable by a hosted model at all, and the honest answer from a vendor is that they can meet it only through in-environment deployment with an open-weight model — with whatever accuracy implications that carries for your documents, measured rather than assumed.

A vendor who tells you that plainly is more useful than one who claims their standard offering satisfies every constraint.

## The practical summary

Establish where inference happens, not just where data is stored. Get the model provider named as a subprocessor. Get processing locations in the agreement, per stage. Understand what happens on failover. And match the deployment model to the actual strength of your constraint rather than to the strongest-sounding option, because the cost and operational differences between them are substantial and the right answer depends on what you are genuinely required to guarantee.
