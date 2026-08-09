---
title: Private Deployment Options for Document AI, and What Each Costs You
description: "Nothing leaves our environment" is achievable. It is not free, and the trade-offs are worth understanding before it becomes a hard requirement in a procurement document.
date: 2026-08-09
tags: [Security, Procurement, Agentic AI]
highlight: What Each Costs You
ctaTitle: Have a hard isolation requirement?
ctaText: Tell us the constraint. We will tell you which deployment model meets it and what it means for accuracy and cost.
ctaLabel: Talk to Us
ctaHref: /#contact
---

"Our data cannot leave our environment" appears in a lot of requirements documents, sometimes as a genuine regulatory constraint and sometimes as a default position adopted before anyone examined what it costs.

It is achievable. The options form a spectrum, and each point on it trades control against capability, cost and operational burden. Making the choice deliberately produces much better outcomes than inheriting it from a template.

## The spectrum

### Multi-tenant SaaS

The vendor operates the service; your data is logically separated from other customers'; inference typically goes to a hosted model provider.

**You get** the lowest cost, no operational burden, immediate access to model improvements, and the vendor's full attention on reliability.

**You give up** physical isolation, and you accept the model provider in your data path.

Adequate for a great deal of enterprise work, including work involving confidential business information, provided the contractual position on retention and training is sound.

### Single-tenant hosted

Dedicated infrastructure operated by the vendor, in a region you choose.

**You get** stronger isolation, clearer residency, and often more configuration control.

**You give up** some cost efficiency. The model call may still go to a hosted provider, which is the point most often missed — single tenancy of the application does not imply single tenancy of the inference.

### Deployed in your cloud environment

The vendor's software runs in infrastructure you own and control.

**You get** data under your access controls, your network policy, your monitoring, and the ability to verify egress independently. For many organisations this is the point where the security conversation becomes straightforward.

**You give up** operational simplicity — someone has to run it — and you take on upgrade coordination. Unless the model is also deployed here, inference may still leave your boundary.

### Fully self-contained

Everything, including the model, inside your environment. Open-weight models on your hardware or in your cloud account, with no external calls.

**You get** a complete and verifiable guarantee. Nothing leaves. This is the only configuration where "nothing leaves our environment" is literally true, and it is the answer to constraints that genuinely admit no other.

**You give up** more than people expect, which is the subject of the next section.

## What full self-containment actually costs

**Model capability, possibly.** Open-weight models have improved dramatically and are genuinely capable. Whether a given open-weight model matches a hosted frontier model on *your* documents is an empirical question — the gap varies enormously by task, and on well-structured extraction it is often negligible, while on difficult handwriting or complex reasoning it may not be. Measure it on your corpus rather than accepting either the optimistic or the pessimistic assumption.

**Infrastructure cost and utilisation.** Inference hardware is expensive and it is provisioned for peak. A hosted API charges for what you use; a deployed model costs the same whether it processes a million pages or none. For low or spiky volume the economics are poor; at sustained high volume they can be favourable.

**Operational burden.** Model serving, scaling, monitoring, GPU capacity management, and upgrades become your responsibility. This is a real ongoing commitment and it requires skills that may not be present.

**Upgrade lag.** Hosted model improvements arrive automatically. In a self-contained deployment, adopting a new model is a project — evaluate, test, migrate. In practice, self-hosted deployments run older models than hosted ones, and the gap widens unless someone owns closing it.

**Support friction.** The vendor cannot see your environment. Diagnosis is slower and depends on what you can share.

## Choosing honestly

The useful discipline is to interrogate the constraint before selecting for it.

**Is it a legal or regulatory requirement, specifically?** Ask which rule, and read it. Many constraints described as regulatory turn out to be internal policy that was written before contractual and technical controls matured, and that policy may be adjustable with the right evidence.

**Is it about the data or about the vendor?** Sometimes the concern is a specific model provider's terms rather than external processing in principle. That is solvable without full self-containment.

**Does it apply to all your data or some of it?** A common good outcome is a split: the sensitive subset processed in-environment, the rest through a hosted path with better economics and capability. Most organisations do not have uniformly sensitive document estates and treating them as though they do is expensive.

**What would satisfy it short of full isolation?** Contractual zero-retention, a named region, no training use, single tenancy, and egress controls address a great many concerns at far lower cost.

## Questions for a vendor

- Which deployment models do you support, and are they the same product or different ones?
- In the in-environment option, does inference stay in my environment, or does the model call still leave?
- Which open-weight models do you support, and what is the accuracy difference on my documents?
- What is the infrastructure requirement, concretely?
- How are upgrades delivered, and what is the coordination burden?
- What visibility do you have for support, and what do I have to share?
- Can I start hosted and move later, or is that a migration?

That last question is worth asking early. A vendor whose architecture supports both without a rewrite gives you the option to begin quickly and tighten later, which is usually the right sequence — you learn what the system does for you before committing to the expensive isolation posture.

## The recommendation

Start from what you are actually required to guarantee, not from the strongest-sounding option. For most enterprise document workloads, a hosted deployment in a chosen region with contractual zero-retention, no training use and a named subprocessor list satisfies the genuine requirement at a fraction of the cost of full isolation.

Where the constraint is real — certain government work, some health and financial contexts, defence-adjacent work — self-containment is the answer and the costs above are simply the price. Knowing which situation you are in is worth the week it takes to establish.
