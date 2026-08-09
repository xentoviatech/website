---
title: The Latency Budget of a Voice Agent
description: Sub-second response is the difference between a conversation and an interrogation. Here is where the milliseconds actually go and which ones you can get back.
date: 2026-08-09
weight: 40
tags: [Voice AI, Evaluation, Agentic AI]
highlight: Latency Budget
ctaTitle: Want to hear the difference latency makes?
ctaText: XentoVoX runs sub-500ms response in production. Book a call and judge it by ear.
ctaLabel: Book a Demo
ctaHref: /xentovox/
---

People are extremely sensitive to conversational timing. In natural speech, the gap between one person finishing and the next starting is typically a couple of hundred milliseconds. Beyond roughly half a second, a listener starts to perceive hesitation. Beyond a second, they assume something is wrong and often start speaking again — which, with a voice agent, causes a collision that makes the whole interaction feel broken.

This is why latency is the defining engineering constraint in voice AI, more than accuracy or reasoning quality. An agent that responds fast and imperfectly feels far better than one that responds slowly and well.

## Where the time goes

A voice turn passes through a chain, and each link adds delay:

**Network in.** Audio from the caller to your infrastructure. Telephony adds real delay before you touch anything, and it varies by carrier and route. You mostly cannot control this, which means the rest of the budget has to absorb it.

**Endpointing.** Deciding the caller has finished speaking. This is the largest single controllable component and the most misunderstood — covered separately below.

**Transcription.** Converting speech to text. Streaming recognition produces partial results as the caller speaks, so most of this cost overlaps with the speech itself rather than following it.

**Understanding and response generation.** The model producing what to say. Time-to-first-token is what matters, not total generation time, because synthesis can start on the first sentence.

**Any tool calls.** Looking up an account, checking availability, writing a record. Frequently the largest and most variable component, and the one most often overlooked in design.

**Speech synthesis.** Generating audio. Again, time-to-first-audio is the metric; the rest streams.

**Network out.** Back to the caller.

The critical insight is that these should overlap, not queue. A naive implementation that waits for each stage to complete before starting the next will produce delays several times larger than a pipelined one using identical components.

## Endpointing dominates

Deciding when the caller has stopped talking is where most poorly-performing voice agents lose their budget.

A simple silence threshold forces an unpleasant trade-off. Set it short and the agent interrupts people who paused to think. Set it long and every response carries that delay. Neither is acceptable, and a fixed threshold at a comfortable-sounding value is a large fixed tax on every turn.

Better approaches use the content, not just the silence. Whether the utterance is syntactically complete, whether the intonation contour suggests completion, whether the caller is mid-list, and whether the answer so far satisfies what was asked. A caller saying "my account number is four seven..." has clearly not finished, regardless of the pause length, and a system that knows this can use a much shorter threshold everywhere else.

This is the highest-leverage optimisation available in voice agent engineering, and it is largely independent of which models you use.

## Hiding what you cannot remove

Some latency is irreducible. The goal then is to make it inaudible.

**Speculative processing.** Begin understanding and even response planning on partial transcripts before the caller finishes. Most of the time the prediction holds and the response is ready the instant endpointing fires.

**Start tool calls early.** If the caller has given an account number, look it up while they finish the sentence. Retrieval latency then overlaps with speech rather than following it.

**Stream everything.** Synthesis begins on the first clause of the response rather than the complete text. This alone often removes several hundred milliseconds.

**Use natural acknowledgements.** A brief "let me check that" while a slow lookup runs is what a person would do, and it converts dead air into normal conversational behaviour. Used sparingly. Used on every turn, it becomes an irritating tic.

**Keep the first sentence short.** Time-to-first-audio matters more than total response length, and a short opening clause gets sound flowing sooner.

## Tool calls are the usual culprit

In production systems, the component that most often breaks the latency budget is not a model. It is a lookup against a system of record that takes two seconds.

Mitigations, in order of preference: cache aggressively for data that tolerates it; prefetch on any signal that a lookup will be needed; set hard timeouts with a graceful conversational fallback; and, where a slow call is unavoidable, acknowledge it verbally rather than leaving silence.

The design principle worth adopting: no tool call should be able to produce silence. Either it returns within budget, or the agent says something while waiting, or it times out into a sensible response. An agent that goes quiet for three seconds has already lost the caller's confidence regardless of what it says next.

## What to measure

Averages are useless here. Voice quality is determined by the bad turns.

- **Response latency at the 50th, 90th and 99th percentiles**, measured from end-of-speech to first audio out.
- **The same, broken down by stage**, so you know which component to work on.
- **Tool call latency distribution**, separately, because it is the most variable.
- **Barge-in response time** — how quickly the agent stops when interrupted. Over a couple of hundred milliseconds feels like being talked over.
- **Turn collision rate** — how often caller and agent speak simultaneously. A direct measure of whether the timing is working.
- **Silence events** exceeding a threshold, counted and investigated. Every one is a moment the caller thought the system had failed.

The 99th percentile matters more than the median. A caller does not experience your average latency; they experience the worst turn in their call, and that is what they describe afterwards.

## The trade to be explicit about

Faster models are generally less capable, and there is a real trade between response quality and response speed.

For most conversational turns, speed wins decisively. A fast, slightly less sophisticated response keeps the conversation natural; a better response arriving a second and a half later does not. Callers judge voice systems on whether the interaction felt normal far more than on the elegance of any individual reply.

The exception is turns that genuinely require care — a complex request, an unusual situation, anything consequential. There, the right pattern is to acknowledge verbally and take the time, which is exactly what a competent human would do. Uniform treatment of every turn is what produces systems that are either uniformly shallow or uniformly slow.
