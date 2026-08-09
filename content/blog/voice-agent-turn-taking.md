---
title: Turn-Taking Is What Makes a Voice Agent Feel Human
description: Interruption handling, backchannels and knowing when someone has finished speaking do more for perceived quality than any improvement in what the agent actually says.
date: 2026-08-09
tags: [Voice AI, Evaluation, Agentic AI]
highlight: Feel Human
ctaTitle: Judge it by ear
ctaText: Turn-taking is impossible to evaluate from a specification. Book a call with XentoVoX and interrupt it.
ctaLabel: Book a Demo
ctaHref: /xentovox/
---

Ask someone why they disliked an automated phone system and they rarely describe a wrong answer. They describe being talked over, having to wait, not being able to interrupt, being cut off mid-sentence, or the thing repeating itself.

All of these are turn-taking failures. Turn-taking — the mechanics of who speaks when — determines perceived quality more than the content of the responses, and it is where a lot of otherwise capable voice systems fall down.

## What people do naturally

Human conversation is coordinated with remarkable precision. Speakers project when a turn is ending and time their entry to a gap of a couple of hundred milliseconds, sometimes overlapping slightly without either party finding it rude.

They do this using cues that arrive before the speech ends: syntactic completeness, intonation falling or rising, a drop in volume, slowing pace, and gaze in face-to-face settings. The listener knows the turn is ending before it has ended, which is what makes the timing possible.

A voice agent that waits for silence and then begins processing cannot achieve this, because it is starting the work at the moment a person would already be speaking. Good turn-taking requires prediction, not detection.

## The behaviours that matter

### Barge-in

The caller must be able to interrupt, and the agent must stop quickly — within a couple of hundred milliseconds of detecting speech. An agent that continues for a full second after being interrupted feels like it is not listening, which is precisely the complaint people have about older systems.

Two refinements separate adequate from good. **Distinguish interruption from acknowledgement**: a caller saying "mm-hm" or "right" while the agent speaks is not taking the turn, and stopping for it makes the agent seem nervous. **Resume sensibly**: after an interruption is handled, do not restart the interrupted sentence from the beginning. Either continue from a sensible point or move on. Repeating verbatim is one of the most irritating behaviours a voice system can exhibit.

### Endpointing that is not just silence

Covered in our latency post, and it belongs here too because it is as much a conversational property as a performance one.

Fixed silence thresholds fail in both directions: they interrupt people who paused to think, and they add delay to every quick exchange. Content-aware endpointing — is the utterance complete, is the caller mid-list, does the answer satisfy the question — allows short thresholds without cutting people off.

Different moments warrant different behaviour. After "what is your account number?", expect a string of digits with pauses and be patient. After "is that correct?", expect a short answer and be quick.

### Backchannels

Brief acknowledgements while the other person speaks — "mm-hm", "okay", "I see". They signal attention, and their absence in a long caller utterance makes the agent feel absent.

They must be sparse and well-timed. Backchannelling at clause boundaries and natural pauses is natural; doing it every two seconds is not, and doing it in the middle of a word is worse than silence. This is a feature that is easy to overdo and worth tuning carefully by listening rather than by rule.

### Handling silence from the caller

People pause to think, to find a document, to consult someone. The agent should tolerate these, and its response to an extended pause should escalate gently: wait, then a soft prompt, then a more explicit offer of help, then an exit path. Immediately re-asking the question after two seconds of thought is a common and frustrating failure.

### Overlap recovery

Sometimes both parties speak at once. It happens between people constantly and is resolved without difficulty. The agent's default should be to yield — stop, let the caller finish, then respond. An agent that continues talking through an overlap is the single most irritating behaviour on this list.

## What this requires architecturally

Turn-taking cannot be bolted on. It has consequences for the whole design.

**Full-duplex audio.** The agent must be listening while it speaks. A half-duplex design cannot support barge-in at all.

**Streaming everywhere.** Partial transcripts must be available during the caller's speech for prediction to be possible. Waiting for a final transcript forecloses it.

**Interruptible synthesis.** Audio generation must be stoppable mid-stream, with the agent knowing exactly how much was actually played — which is what it needs to resume sensibly rather than from the beginning.

**Conversation state that survives interruption.** The agent must know what it had said, what it had not, and what the caller responded to. Systems that treat each turn as independent handle interruption badly because they have lost the thread.

## Evaluating it

Turn-taking cannot be assessed from a transcript. The transcript of an excellent conversation and a terrible one can be identical; the difference is entirely in the timing.

What to measure:

- **Barge-in response time**, at the tail of the distribution.
- **False barge-in rate** — stopping for a backchannel that was not an interruption.
- **Premature endpoint rate** — cutting a caller off mid-utterance. Particularly damaging and worth measuring specifically.
- **Turn collision rate** and mean overlap duration.
- **Time-to-first-audio** after end of speech.
- **Awkward silence count** per call.

And, unavoidably, listen. Human ratings of naturalness on a sample of real calls will surface problems no metric captures, and they should be part of the regular evaluation rather than a one-off exercise.

## Why it matters commercially

Callers form a judgement about an automated system in the first two or three turns, and that judgement is based almost entirely on timing. An agent that responds promptly, lets itself be interrupted, and does not talk over people is perceived as competent before it has said anything of substance.

The reverse is also true, and less recoverable. An agent that talks over a caller in the first thirty seconds has established that it is not listening, and no subsequent accuracy repairs that impression. Turn-taking is not polish applied at the end. It is the foundation the rest of the experience sits on.
