---
title: The Security Questions to Ask an AI Vendor That Standard Questionnaires Miss
description: Your existing vendor assessment covers encryption and access control. It probably does not cover model providers, training use, or what happens to your data inside an inference call.
date: 2026-08-09
tags: [Security, Procurement, Compliance]
highlight: Standard Questionnaires Miss
ctaTitle: Running an assessment on us?
ctaText: Send the questionnaire. We would rather answer the hard questions early than discover them at contract stage.
ctaLabel: Talk to Us
ctaHref: /#contact
---

Standard vendor security questionnaires were designed for software that stores and processes your data on infrastructure the vendor controls. They cover encryption, access control, personnel screening, incident response and business continuity, and they cover them well.

AI vendors have a different shape. Your data may pass through a third-party model provider the questionnaire never asks about, may be used in ways the standard questions do not surface, and the system's behaviour may change without any deployment occurring.

These are the gaps worth closing.

## The model supply chain

**Which models do you use, and whose are they?** Self-hosted open-weight models, a third-party API, or both? This determines the entire data flow, and it is remarkable how often it is not asked.

**Name every provider in the chain.** If a vendor calls a model API, that provider is processing your data. You need them enumerated, with the relevant agreements in place, and a commitment to notify you before the list changes.

**What is the retention configuration at the provider?** Major model providers offer zero-retention or restricted-retention options. Confirm which is in use for your data specifically, get it in writing, and confirm it applies to the exact endpoint being called.

**Is your data used for training?** By the vendor, and separately by the model provider. These are two different questions with two different answers, and both need to be addressed in the contract rather than inferred from a policy page.

**Where does inference happen, geographically?** A vendor may host in your region while calling a model endpoint in another. For organisations with residency obligations this is the question that matters, and it is frequently missed because the questionnaire asks about "data storage" rather than processing.

## Change without deployment

**How do you version models and prompts?** A system whose behaviour is determined by an unversioned string can change materially with no release, no change record and no notification.

**Will you notify us before material changes?** And is there a window to test before they take effect? For anything in a regulated workflow this should be a contractual commitment, not a courtesy.

**Can we pin a version?** And for how long is a pinned version supported?

**What is your regression testing practice?** Ask specifically whether they maintain a labelled evaluation corpus and run it on every change. The answer distinguishes engineering discipline from optimism quickly.

**What happens when an upstream provider deprecates a model?** This is a real operational event that will occur, and the answer reveals how much migration risk you are absorbing.

## What the system can reach

**What tools or integrations can the AI components invoke?** A model with network access, database access or the ability to trigger actions has a much larger blast radius than one that reads a document and returns fields.

**How is untrusted input handled?** If documents from external parties reach the model, ask what prevents content in those documents from influencing behaviour. See our post on prompt injection for what a substantive answer looks like — "we instruct the model to ignore it" is not one.

**What is the least-privilege story for automated components?** Service accounts, scopes, and what an automated actor can access that a human in the same role cannot.

## Data lifecycle, in detail

**What exactly is retained?** Source documents, rendered page images, extracted data, model request and response payloads, logs, telemetry, the feedback store from reviewer corrections. Each is a separate category and each may have a different default.

The debugging store is the one most often missed. Captured prompts and responses containing your content are a data store nobody classified, and it frequently has the longest retention of anything in the system.

**How is deletion implemented?** Not the policy — the mechanism. Which stores does a deletion request reach, what is the backup position, and can they evidence completion?

**What is in the logs?** Document content in error messages, stack traces and monitoring events is a common leak path.

**Is customer data segregated?** In storage, in processing, and in any evaluation or improvement work.

## Accuracy as a security property

Unusual for a security questionnaire, and appropriate here.

**How do you measure accuracy, and will you report it on our data?** A vendor unwilling to be measured on your documents is telling you something.

**What is the escaped error rate, and how is it measured?** If there is no answer, there is no monitoring of whether wrong values are reaching your systems.

**How does the system behave when uncertain?** Abstention, flagging, or a confident guess. In a security context, a system that fabricates plausible values on inputs it cannot read is producing corrupted data with no signal attached.

**Can every output be traced to a source?** Provenance is both a quality feature and an audit control.

## Assurance and evidence

The conventional items still apply, with AI-specific angles:

- Current security attestations and audit reports, and whether the AI components are in scope of them.
- Penetration test results, with the AI surface specifically tested.
- Subprocessor list, with notification commitments for changes.
- Incident response procedures, including what constitutes an incident for an AI system — a model change producing systematically wrong output is one.
- Business continuity, including what happens if a model provider has an outage.
- Data processing agreement, with residency, retention and deletion terms.

## Contract terms worth insisting on

- No training on your data without explicit written agreement.
- Notification before subprocessor changes and material model changes.
- Data portability — your extracted data in an open format, on demand, at any time.
- Your evaluation corpus remains yours.
- Audit rights proportionate to the risk.
- Deletion on termination, with evidence.
- Accuracy reporting on your own documents, at an agreed cadence.

## The tell

The single most informative signal in an AI vendor assessment is how the vendor responds to being asked to be measured.

A vendor who welcomes an evaluation on your documents, with your ground truth, and reports the per-field results including the bad ones, is operating a system they understand. A vendor who deflects toward a demonstration and a case study may still have a good product, but you are being asked to take the important part on faith.
