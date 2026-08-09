---
title: What SOC 2 Does and Does Not Tell You About an AI Vendor
description: The report is a genuine signal about operational discipline. It says almost nothing about whether the AI works, and buyers routinely read more into it than it contains.
date: 2026-08-09
tags: [Security, Procurement, Compliance]
highlight: Does and Does Not
ctaTitle: Going through security review with us?
ctaText: We will provide the report, the subprocessor list and answers to the questions the report does not cover.
ctaLabel: Talk to Us
ctaHref: /#contact
---

For enterprise software procurement, a SOC 2 report has become close to a prerequisite. Many security reviews will not proceed without one, and vendors invest substantially in obtaining it.

It is a meaningful signal. It is also frequently over-read, particularly for AI vendors, where the most important questions fall outside its scope entirely.

## What the report actually is

SOC 2 is an attestation by an independent auditor about a service organisation's controls relevant to security and, optionally, availability, processing integrity, confidentiality and privacy.

Two distinctions matter and are commonly confused.

**Type I versus Type II.** Type I says the controls were suitably designed at a point in time. Type II says they operated effectively over a period, typically several months to a year. Type II is substantially more meaningful, because designing a control is easier than running it. A vendor with only a Type I has started the journey; they have not demonstrated sustained operation.

**Scope.** The vendor defines which systems and which trust services criteria are in scope. A report covering the corporate environment but not the product, or covering one product and not the one you are buying, is a real and not-uncommon situation.

Read the scope section first. It is the part that determines whether the rest of the report is about the thing you are purchasing.

## What it tells you

**Operational discipline exists.** Access is reviewed, changes are managed, incidents have a process, vendors are assessed, personnel are screened. For an early-stage company, the existence of a clean Type II is genuine evidence that the organisation is run rather than improvised.

**Someone independent looked.** An auditor tested the controls and reported exceptions. That is more than a self-assessment.

**There is a control environment to build on.** Whatever additional requirements you have, they will be added to something that exists.

## What it does not tell you

**Whether the AI is accurate.** Nothing in SOC 2 addresses model performance, extraction accuracy, error rates or the quality of outputs. A vendor with an immaculate report can have a system that misreads a third of your fields.

**Whether the model supply chain is acceptable.** The report will not enumerate which model providers process your data, what their retention configuration is, or whether your content is used for training. These are the questions that matter most for AI vendors and they sit outside the framework.

**Whether behaviour is stable.** SOC 2 change management covers deployments. A prompt edit or an upstream model version change can alter system behaviour materially without any deployment occurring, and a conventional change management control may not capture it.

**What the system can reach.** The blast radius of an AI component with tool access is a design question, not a control question.

**Whether it is fit for your regulated workflow.** Sector obligations — health information, financial services, government — are separate requirements. SOC 2 does not substitute for them, though a vendor holding one usually has the foundations for the others.

**Whether the vendor will still exist.** Not a control matter, and a real consideration.

## Exceptions are informative, in both directions

Reports contain exceptions — instances where a control did not operate as described. Buyers sometimes treat any exception as disqualifying, which is the wrong reading.

A report with no exceptions at all, from an organisation of any size, is more often a sign of a narrow scope or a light audit than of perfection. What matters is the nature of the exception, whether it was detected by the vendor's own monitoring, and what management's response was.

An exception found by the vendor's own process, with a documented remediation, is evidence the process works. An exception found by the auditor in an area central to your use case, with a thin response, is the one to ask about.

## The questions to ask alongside it

Treat the report as the baseline and add the AI-specific layer:

- Which models, whose, and where does inference physically occur?
- Which subprocessors, and will you notify us before that list changes?
- What is the retention configuration at the model provider, in writing?
- Is our data used for training, by you or by any provider?
- How are prompts and model versions controlled, and will we be notified before material changes?
- What is your regression testing practice, and can we see the results on our documents?
- What can the AI components access, and what is the least-privilege story?
- How do you handle untrusted content in documents supplied by external parties?
- What is retained beyond the obvious — debugging captures, logs, telemetry, feedback stores?

Most of these have no home in a SOC 2 report and most of them determine whether the deployment is acceptable.

## For vendors deciding whether to pursue it

The practical position for a company selling into enterprise: you will need it, and the sequencing matters.

Starting the process early is worth more than it appears, because a Type II requires an observation period. A vendor beginning the process when the first enterprise deal requires it is looking at a delay measured in months at exactly the wrong moment.

The other honest observation is that the preparation work is largely worth doing regardless. Access reviews, change management, logging, incident procedures and vendor assessment are things a serious company should have. The certification formalises them and produces the artefact buyers ask for; the underlying practices are the actual benefit.

## The balanced view

SOC 2 is necessary and insufficient. Treat its absence as a genuine concern and its presence as a starting point rather than an answer.

The vendor questions that determine whether an AI deployment is safe and effective — accuracy on your documents, the model supply chain, change control over prompts and models, and what the system can reach — all have to be asked separately. A buyer who checks the report and stops has verified that the vendor manages laptops well.
