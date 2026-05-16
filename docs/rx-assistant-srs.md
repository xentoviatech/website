# Software Requirements Specification
## Xentovia Rx Assistant

| Field | Value |
|-------|-------|
| **Document ID** | RXA-SRS-001 |
| **Version** | 1.2 (Draft — Incorporates 2026 Agentic & VLM Updates) |
| **Status** | For Review |
| **Date** | 2026-05-18 |
| **Owner** | Xentovia Tech Pvt. Ltd. |
| **Classification** | Internal — Confidential |

> **v1.2 change summary:** Transitions from a "Scribe" to an **"Agentic Clinical Co-pilot"**. Adds Ambient Clinical Intelligence (§4.2), Multimodal VLM reasoning for Lab/Imaging (§4.5), Proactive Agentic Workflows (§4.15), and XAI Grounding (§4.13). Updates infrastructure to **100% Cloud-Native High Availability** (removing edge-SLM per directive). Incorporates **ABDM Milestone 3 (Scan-and-Share)** and **SaMD/QMS Regulatory Readiness** (§8).

---

## v1 Release Scope (decided 2026-05-15)

This SRS describes the **north-star product**. The literal v1 build is narrower and ships first as a **Pathology Dictation Assistant** — a documentation tool for solo pathologists, **not a SaMD-graded clinical co-pilot**. The buildable v1 spec lives at:

```
rx-assistant/docs/superpowers/specs/2026-05-15-rx-assistant-v1-design.md
```

### In v1 (buildable now)
- **Persona:** Solo / small-team Indian pathology consultant (informed by customer-discovery visit to Dr Krishnakumar S, MD Pathologist, Sankara Nethralaya, Chennai — sample report retained in this directory).
- **Workflow:** Voice dictation → structured pathology report. Optional phone-photo of slide via QR handoff. Source-pill XAI per field. Sign + export.
- **Templates:** Pre-built library (Histopathology, Cytology, Radiology X-ray) + per-doctor visual editor (rename/reorder/add fields). No AI auto-extraction from sample reports.
- **Stack (revised 2026-05-16):** Next.js 15 + TS + Tailwind + shadcn/ui; **self-hosted Postgres 16 + Drizzle ORM + Auth.js v5 + MinIO** all in Docker on the founder's OVH VPS (DPDP residency from day 1, sub-ms DB latency); OpenAI `gpt-4o-transcribe` for STT; **Anthropic Claude Opus 4.7** with Vision for structuring. Multi-tenancy via Postgres RLS.
- **Export:** Plain text, .docx, PDF, .txt, JSON, **FHIR R4 DiagnosticReport JSON** (EMR-ready).
- **Positioning:** Documentation tool, not medical device. No SaMD, no ISO 13485, no CER in v1.

### Deferred from this aspirational SRS to v2+
- **FR-VOI-1/2** Ambient ACI / passive listening — v1 is button-driven dictation.
- **FR-LAB-V1/V2/V3** Full Med-VQA over DICOM and WSI — v1 supports phone-photo + lab-PDF only; no DICOM, no gigapixel WSI.
- **FR-SAF-G1/G2** GNN drug-interaction safety — irrelevant to path reports.
- **FR-XAI-1/2** SRS-grade XAI with fabrication budget — v1 ships simpler source-pill grounding; <1% hallucination target on internal eval corpus, not multi-agent debate.
- **FR-AGN-1/2/3** Agentic Mesh, downstream task drafting, billing optimizer — out of scope for the pathology dictation niche.
- **FR-INT-M3 / FR-INT-UHI** ABDM Milestone 3 / Unified Health Interface — deferred.
- **NFR-PERF-7/8** Multi-agent orchestration latency, real-time canvas — v1 is batch (≤15s P95 for a 90s dictation).
- **NFR-REL-4/5** Multi-region active-active HA, cross-LLM failover — premature for an MVP.
- **COMP-11/12** SaMD Class II / ISO 13485 / Clinical Evaluation Report — v1 explicitly positions outside SaMD.

### Differentiation
v1 deliberately does **not** compete with EkaScribe (a doctor-patient consult scribe). It targets a different persona — the pathologist who today dictates to a junior who types — and a different output format. Same plumbing extends to other dictating specialists (radiology, cardiology) post-launch.

### Open pre-build questions
1. **Data-policy stance.** Standard-tier OpenAI/Anthropic retain content briefly; PHI handling under DPDP Act 2023 needs an explicit decision before non-synthetic-data UAT. Options: zero-retention enterprise contracts, PHI-scrub before LLM, or standard tier + clear data-use disclosure.
2. Production deployment target (Vercel + Supabase Cloud vs self-host on VPS) — doesn't block dev, decide before private beta.
3. Pricing, branding, audio retention policy — see design spec §7.

### v1 status
Design approved by founder 2026-05-15; implementation plan being authored next.

---

## 1. Introduction

### 1.1 Purpose
This document specifies requirements for **Rx Assistant**, a 2026-standard AI Clinical Co-pilot. It enables clinicians to:
1.  **Ambiently capture** clinical encounters without manual start/stop triggers.
2.  **Reason across modalities** (Text, Audio, DICOM images, Hand-written records).
3.  **Automate clinical tasks** (Drafting referrals, ICD-11 coding, and patient-centric handouts).

### 1.2 Scope (v1.2)
- **Ambient Intelligence:** Passive capture of doctor-patient interactions.
- **Multimodal VLM:** Reasoning over imaging (X-rays, Scans) and Pathology slides.
- **Agentic Workflows:** Multi-agent orchestration for safety, billing, and clinical drafting.
- **Explainable AI (XAI):** One-click grounding/source-attribution for all AI claims.
- **Infrastructure:** 100% Cloud-based (AWS/Azure/GCP) with multi-region redundancy.

---

## 2. Overall Description

### 2.2 High-Level Product Functions (The Agentic Stack)

┌──────────────────────────────────────────────────────────────────────┐
│                  XENTOVIA AGENTIC ORCHESTRATOR                       │
│                                                                      │
│ 1. AMBIENT INGEST   → Passive Audio Capture + ABDM M3 Scan-and-Share │
│ 2. VLM REASONING    → Multi-modal analysis of Labs, ECG, DICOM       │
│ 3. AGENTIC MESH     → Scribe Agent + Compliance Agent + Safety Agent │
│ 4. XAI GROUNDING    → Source attribution to Transcript/Canvas        │
│ 5. GNN SAFETY       → Graph-based drug interaction verification     │
└──────────────────────────────────────────────────────────────────────┘


---

## 4. Functional Requirements

### 4.2 Ambient & Voice Intelligence (Module: VOICE)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-VOI-1 | **Ambient Clinical Intelligence (ACI):** The system SHALL support a "Passive Mode" that listens to the entire doctor-patient interaction, distinguishing between speaker roles (Doctor vs. Patient) using Diarization. | P0 |
| FR-VOI-2 | **Auto-Trigger Extraction:** The system SHALL automatically begin extracting data into the Canvas when clinical "intent" is detected (e.g., "Tell me about your cough" or "I'm prescribing..."). | P1 |
| FR-VOI-10 | **Code-Switching (2026 Standard):** Support for Hinglish, Tam-English, etc., with a combined WER ≤ 8% on clinical datasets. | P0 |

### 4.5 Multimodal Lab & Imaging (Module: VLM)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-LAB-V1 | **Visual Question Answering (Med-VQA):** The clinician SHALL be able to ask the AI questions about an uploaded DICOM or Path-slide (e.g., "Are the margins clear in this biopsy?"). | P0 |
| FR-LAB-V2 | **Visual Grounding:** The system SHALL highlight the specific coordinates on an image or document that informed the AI's extracted finding. | P0 |
| FR-LAB-V3 | **Trend Vision:** The VLM SHALL compare the current visual artifact (e.g., a chest X-ray) with historical images in the canvas to identify visual progression/regression. | P1 |

### 4.7 Safety & Knowledge Graphs (Module: SAFETY)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SAF-G1 | **GNN Verification:** Drug-drug and drug-allergy interactions SHALL be verified against a **Knowledge Graph (GNN)** to provide deterministic safety logic, rather than relying solely on LLM probability. | P0 |
| FR-SAF-G2 | **Reasoning Chains:** Every safety warning SHALL provide a "Reasoning Chain" explaining *why* a contraindication was flagged based on the patient's specific lab values (e.g., "Creatinine > 1.5; Contraindicated for Metformin"). | P0 |

### 4.13 Explainability & Grounding (Module: MQM/XAI)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-XAI-1 | **Source Attribution:** Every field in an AI-generated SOAP note or Rx SHALL be hyperlinked to the specific audio timestamp or source document line. | P0 |
| FR-XAI-2 | **Fabrication Budget:** The "Fabrication Rate" (FR-MQM-3) SHALL be strictly capped at < 1% for clinical claims, enforced by an automated Multi-Agent debate. | P0 |

### 4.15 Agentic Workflows (Module: AGN) — **NEW**

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-AGN-1 | **Proactive Gap Analysis:** The AI SHALL flag missing information during a consult (e.g., "You discussed chest pain but haven't asked about radiation or duration"). | P1 |
| FR-AGN-2 | **Downstream Task Drafting:** The system SHALL draft referral letters, insurance pre-auths, and laboratory orders automatically based on the "Plan" section of the SOAP note. | P0 |
| FR-AGN-3 | **Billing Optimizer:** Suggest ICD-11 and CPT codes based on the complexity of the visit to maximize audit-defensible revenue. | P0 |

---

## 5. External Interface Requirements

### 5.3 ABDM Milestone 3 & UHI
- **FR-INT-M3:** Support for **Scan-and-Share**. Patients scan a clinic QR code via their PHR app to instantly share their history/profile with the Xentovia Canvas.
- **FR-INT-UHI:** Integration with the **Unified Health Interface** to pull longitudinal records from external hospitals (where patient consent exists).

---

## 6. Non-Functional Requirements (Cloud-Native 2026)

### 6.1 Performance & Orchestration
- **NFR-PERF-7:** **Multi-Agent Orchestration Latency:** The "Agentic Mesh" (Scribe + Safety + Compliance) SHALL complete its internal debate and present a draft in ≤ 10s P95.
- **NFR-PERF-8:** Real-time visual updates to the Canvas as the doctor speaks (latency ≤ 500ms).

### 6.3 Reliability (100% Cloud)
- **NFR-REL-4 (Cloud HA):** The system SHALL utilize **Multi-Region Active-Active deployment** (e.g., Mumbai and Singapore). 
- **NFR-REL-5:** In the event of a primary LLM provider outage (e.g., Anthropic), the system SHALL automatically failover to a secondary provider (e.g., Google Gemini or Azure OpenAI) within 60 seconds without session loss.

---

## 8. Compliance & Regulatory (SaMD)

| ID | Requirement |
|----|-------------|
| **COMP-11** | **SaMD Class II Readiness:** The system SHALL follow **ISO 13485** Quality Management Systems for medical devices. |
| **COMP-12** | **Clinical Evaluation Report (CER):** Maintain a continuous CER documenting the performance of the VLM and LLM against clinical gold standards. |

---

## 12. Updated Risk Register

| ID | Risk | Mitigation |
|----|------|------------|
| **R-13** | **Agentic Over-Autonomy:** Agent drafts a referral or order that the doctor signs without full review. | **Mitigation:** "Forced Friction" UI—the doctor must click "Verify" on critical fields before the "Sign" button activates. |
| **R-14** | **VLM Hallucination:** VLM misidentifies a visual artifact in a scan. | **Mitigation:** Visual Grounding (FR-VLM-2)—AI must highlight the pixels it is referencing. |

---

### Recommended 2026 Tech Stack
1.  **Orchestration:** LangGraph or CrewAI (for multi-agent coordination).
2.  **Multimodal:** Gemini 1.5 Pro / GPT-4o (for VLM/Audio-to-Text).
3.  **Safety Logic:** Neo4j (for the GNN Knowledge Graph of drugs).
4.  **Database:** Supabase/PostgreSQL (with `pgvector` for Multi-Modal RAG).
5.  **Deployment:** Kubernetes on AWS/Azure for 100% cloud scaling.