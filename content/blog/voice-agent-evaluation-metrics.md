---
title: How to Evaluate a Voice Agent Properly
description: Word error rate tells you almost nothing about whether a voice agent works. Here is the evaluation stack that predicts how it will perform with real callers.
date: 2026-08-09
tags: [Voice AI, Evaluation, Procurement]
highlight: Properly
ctaTitle: Evaluating voice vendors?
ctaText: Ask us for the metrics in this post on your own call types. We would rather be measured than demonstrated.
ctaLabel: Talk to Us
ctaHref: /xentovox/
---

Voice agents are usually evaluated by demonstration: someone makes a call, it goes well, everyone is impressed. This predicts production performance poorly, because the demonstration call is made by someone who knows what to say, in a quiet room, with a good connection, on a path that has been tested.

Real callers are on mobile phones in cars, have accents, change their minds mid-sentence, interrupt, and ask about things nobody anticipated. Evaluating for that requires structure.

## The layers

Voice agent quality is a stack, and a failure at any layer defeats everything above it. Measure each separately, because a single end-to-end number cannot tell you where the problem is.

### Layer 1: Recognition

Does the agent hear correctly?

**Word error rate** is the standard metric and it is nearly useless on its own, because it weights every word equally. What matters is accuracy on the words that carry the decision.

**Entity accuracy** is the metric to use: names, dates, times, numbers, account references, addresses, product names, and the specific vocabulary of your domain. An agent that transcribes conversational filler perfectly and misreads one digit of an account number has failed the call.

Measure this across the conditions your callers are actually in: mobile audio, background noise, speakerphone, accents represented in your customer base, speech rates, and non-native speakers. Segment the results. An aggregate figure that averages a clean-audio majority with a poor-audio minority hides the population that will complain.

### Layer 2: Understanding

Does the agent work out what was meant?

**Intent accuracy** per intent, with the confusion matrix. Aggregate accuracy conceals the two intents that get confused with each other.

**Out-of-scope detection.** When a caller asks about something the agent does not handle, does it recognise that and hand over, or does it attempt an answer? This is one of the most consequential behaviours and one of the least measured.

**Ambiguity handling.** Does it ask a clarifying question when the request is genuinely ambiguous, or does it guess?

**Correction handling.** "No, I said the fifteenth." Callers correct themselves and correct the agent constantly, and an agent that does not handle correction gracefully produces very frustrating calls.

### Layer 3: Conversation

Does the interaction feel like a conversation?

The turn-taking metrics from our post on that subject: barge-in response time, false barge-in rate, premature endpoint rate, turn collision rate, and awkward silence count. Plus response latency at the tail, not the median.

These cannot be evaluated from transcripts. They require timing instrumentation and, ultimately, listening.

### Layer 4: Task

Did the caller get what they came for?

**Task completion rate**, defined per intent with unambiguous criteria. This is the headline business metric.

**Task accuracy.** Of the tasks completed, how many were completed correctly? An agent that books appointments quickly and gets a quarter of the dates wrong has a completion rate that looks excellent and a business impact that is negative.

**Containment rate**, with the important caveat that containment is not the goal. An agent that keeps a caller who needed a human is worse than one that transfers promptly. Report containment alongside the outcome of transferred calls.

**Escalation appropriateness**, in both directions: did it hand over when it should, and did it hand over when it should not have?

### Layer 5: Experience

Would the caller use it again?

Direct feedback where you can collect it; call abandonment rate; repeat-call rate within a short window, which indicates the first call did not resolve; and human review of a sample of recordings against a rubric.

The human review is not optional. Automated metrics do not capture an agent that is technically correct and unpleasant to deal with, and callers will tell you about that in ways that show up in retention rather than in your dashboard.

## Building the test set

**Use real recordings.** The single most important step. Transcripts and recordings of actual calls to your business contain the intents, phrasings, accents and audio conditions you will face. Nothing synthetic substitutes.

**Include the hard cases deliberately.** Poor audio, strong accents, background noise, callers who interrupt, callers who ramble, callers who change their request mid-call, callers who are annoyed.

**Include out-of-scope calls.** A meaningful fraction. How the agent behaves on requests it cannot handle is a large part of its real-world quality.

**Cover the intent distribution honestly**, including the long tail. Testing only the top three intents tells you about the top three intents.

**Test in the real audio path.** Evaluating on clean recordings when production runs over a phone network measures something you will never experience. Telephony codecs degrade audio meaningfully.

## Running it

**Automated regression on the recording set**, run on every change to models, prompts, or configuration. Same discipline as the document pipeline: version everything, score everything, diff against baseline.

**Live shadow evaluation** where feasible, comparing the agent's proposed handling against what a human did on the same call.

**Staged rollout** by percentage or by call type, watching the operational metrics rather than only the offline scores.

**Continuous sampling in production.** A regular sample of real calls reviewed by a person against a rubric. This is where you find the failures the test set does not contain, and it is how the test set grows.

## Questions for a vendor

- Show me entity accuracy on my domain vocabulary, on audio from my telephony path.
- Show me the accuracy distribution across accents and audio conditions, not the average.
- What is the barge-in response time at the 95th percentile?
- What is the out-of-scope detection rate?
- How does the agent behave when it does not know? Can I hear examples?
- What is task accuracy, not just completion rate?
- Can I run my own recordings through it before committing?

That last one is the most informative request you can make, and a vendor's willingness to accommodate it is itself a signal.
