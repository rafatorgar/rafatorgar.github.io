---
title: "How We Built an AI System to Evaluate Competencies from Conversations"
date: 2025-11-18 10:00:00 +0100
tags:
  [
    AI,
    product-development,
    voicit,
    technical-architecture,
    behavioral-interview,
    competency-assessment,
  ]
description: "The technical story behind building an AI system that extracts critical incidents from interviews and evaluates competencies. Methodology, challenges, and why reasoning models aren't always the answer."
image: "/assets/img/competency-evaluation.jpg"
lang: en
lang_ref: ai-competency-evaluation-2025
---

At [Voicit](https://voicit.com), we generate interview reports for selection processes. One of our most complex features is **competency evaluation through critical incidents** - a system that analyzes conversations and determines a candidate's competency level based on behavioral evidence.

This is the technical story of how we built it, the methodology behind it, and what we learned along the way.

## Context: What We're Solving

In Voicit, users can generate interview reports using **report templates**. These templates allow adding sections that extract specific information: work experience, salary range, technical skills, etc.

Among these sections, some are simple and others are complex. **Competency evaluation through critical incidents** is one of the complex ones.

Users can select competencies from our **competency dictionary**, which includes both Voicit-defined competencies and custom ones that teams can create and share. Each competency has:

- Name
- Definition or description
- Evaluation levels (e.g., Basic, Intermediate, Advanced, Expert)

The output for each competency includes:

- **Detected level** with its definition
- **Level justification** analyzing patterns and limitations detected in critical incidents
- **Critical incidents** used to determine the level
- **Recommendations** on what to probe further

<mark>The challenge was: how do you reliably extract behavioral evidence from a conversation and map it to competency levels in a way that's useful for combining with formal test results?</mark>

## The Three-Phase Architecture

We broke down the problem into three distinct phases, each with a specific responsibility.

### Phase 1: Extraction and Classification of Critical Incidents

**Goal:** Identify conversation fragments that demonstrate the presence (or absence) of a specific competency.

The AI system analyzes:

- The interview transcription
- The competency name
- The competency definition (from the user's dictionary)

**Key insight:** Not all evidence is a critical incident, but every critical incident is evidence.

This distinction is crucial when working with AI systems, which tend to interpret any evidence as a valid critical incident. We needed **solid behavioral evidence** - complete behavioral narratives.

Each critical incident follows the **SAR model** (Situation-Action-Result) and is classified into a JSON object:

| Field                 | Role                             | Notes                                                       |
| --------------------- | -------------------------------- | ----------------------------------------------------------- |
| **impact**            | Overall episode assessment       | "positive" / "negative" - reflects behavioral effectiveness |
| **intensity**         | Strength level of the incident   | "weak" / "moderate" / "strong"                              |
| **intensity_reason**  | Justification for the intensity  | Allows auditing and automated weighting                     |
| **context.situation** | Context or environment           | Essential (defines the scenario)                            |
| **context.task**      | Responsibility or objective      | Essential (defines the person's role)                       |
| **behavior**          | Specific action(s) taken         | Optional if candidate doesn't detail clear behaviors        |
| **result**            | Observable consequence or impact | Optional, but valuable for calibrating effectiveness        |
| **learning**          | Reflection or derived learning   | Optional, shows maturity or self-awareness                  |
| **timeKeys**          | Temporal location                | Very useful for auditing or reviewing audio/video excerpts  |

This classification ensures critical incidents have sufficient quality parameters to serve for subsequent level evaluation. That's why there's currently **no intermediate phase** to evaluate the quality of extracted incidents - the structure itself enforces quality.

### Phase 2: Competency Level Evaluation

**Goal:** Determine the level achieved in a specific competency based on the critical incidents extracted in Phase 1, integrating both positive and negative evidence.

**Methodological foundation:** Based on **BEI (Behavioral Event Interview)** models and **Critical Incident Technique (Flanagan, 1954)**.

The competency level is deduced from:

1. **Consistency** of observed behaviors across different situations
2. **Complexity** of contexts where behaviors manifest
3. **Degree of autonomy and impact** demonstrated
4. **Learning capacity** or transfer to new scenarios

The system analyzes all critical incidents (positive and negative) and contrasts them with the competency dictionary's level definitions.

**Output structure:**

| Field                                                     | Role                                    | Notes                                                                                                                                         |
| --------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **level_label**                                           | Assigned level identifier               | Name of existing levels in the competency within the dictionary.                                                                              |
| **level_definition**                                      | Description of assigned level           | Definition of existing level in the competency within the dictionary.                                                                         |
| **confidence_score**                                      | Confidence degree (1–10)                | 1 = very low confidence (little/weak evidence), 10 = maximum confidence (multiple solid, consistent incidents).                               |
| **critical_gaps**                                         | List of critical deficiencies           | Identifies areas without evidence or with insufficient evidence (e.g., _"Lack of measurable results"_, _"No leadership behaviors observed"_). |
| **critical_incidents_justification**                      | Link between incidents and level        | List describing how each critical incident contributes (or limits) the assigned level.                                                        |
| **critical_incidents_justification[].incident_id**        | Unique incident identifier              | ID from Phase 1, maintains traceability.                                                                                                      |
| **critical_incidents_justification[].content**            | Incident description and relevance      | Interpretive summary describing what behavior or fact was relevant.                                                                           |
| **critical_incidents_justification[].relevance_to_level** | Impact interpretation on assigned level | Explains how the incident reinforces or limits competency relative to selected level.                                                         |

**Key criteria:**

- **Strong positive incidents** reinforce high levels if they show observable behaviors with impact or autonomy
- **Strong negative incidents** can limit the maximum possible level if they affect essential aspects (ethics, leadership, results)
- If incidents are **insufficient, ambiguous, or routine**, a lower level is assigned and the **evidence gap** is documented
- The `confidence_score` reflects the model's certainty (1–10) based on quantity, coherence, and intensity of available incidents

<mark>The result of this phase is not narrative, but structured and explanatory.</mark> It defines the achieved level, the reasons, and areas without sufficient evidence. This becomes the foundation for Phase 3.

### Phase 3: Competency Summary Generation

**Goal:** Transform the structured evaluation from Phase 2 into an **interpretive narrative summary** that:

- Clearly presents facts supporting the level evaluation
- Synthesizes **behavioral patterns**, **consistency**, and **transferability** of the competency
- Highlights **critical gaps** identified

This summary is designed for the **selection consultant or recruiter** to support their professional judgment alongside formal competency tests, to reach a clear conclusion.

**Summary structure:**

**Assigned level and definition**

- Indicates final level along with its description

**Level justification: patterns and limitations**

- Explains recurring behaviors, how they relate, and what level of complexity or autonomy they imply
- Limitations found, relating them to the assigned competency level

**Supporting evidence**

- Summarizes behaviors, contexts, and results observed in the most representative critical incidents
- What they did (behavior)
- In what context and task
- What result they obtained
- What learning or development they showed
- Provides time references to find it in the conversation

**Aspects to probe further**

- Analysis of aspects needing deeper exploration to improve competency evaluation

## How Selection Teams Actually Use This

An important part of this critical incident competency analysis is **how selection teams use it**.

Voicit offers them **guidance on competency level** and **evidence from their professional experience** that they can use to:

- Contrast with their own conclusions
- Compare with competency test results
- Complement test results with detected critical incidents

This enables a **more complete and objective final competency evaluation**.

<mark>It's not about replacing human judgment - it's about giving consultants structured, traceable evidence to make better decisions.</mark>

## The Surprising Learning: Reasoning Models Aren't Always Better

One of the most interesting findings during development: **reasoning LLMs are not necessary for this type of analysis**.

They don't improve results and add a very high time delay.

For structured behavioral analysis with clear frameworks (like SAR model and competency dictionaries), traditional LLMs with good prompting outperform reasoning models in both quality and speed.

This was counterintuitive but consistent across our testing.

## FAQs

**Can the definition of the same competency level vary between candidates?**

No. The level definition remains fixed, according to the competency dictionary.

What varies is the justification: it adapts to the critical incidents and evidence observed in each interview, which are unique for each candidate.

**What information is generated for a competency?**

Competencies are analyzed based on critical incidents mentioned in the conversation. From these critical incidents we extract:

- Detected level and definition
- Justification of detected level based on critical incidents
- List of evidence
- Recommendations on what points to probe further to improve competency evaluation

## Implementation Summary

The critical incident competency evaluation section extracts **critical incidents** that include: impact, intensity, intensity reason, situation, task, behavior, result, learning, and time references.

With this data, **competency level is evaluated** based on the competency dictionary. The evaluation generates:

- Competency level and definition
- Evaluation confidence
- Critical limitations
- Level justification according to critical incidents

Finally, a **summary for the consultant** is created, showing the assigned level and its definition, justification, analyzed critical incidents, and **recommendations to probe further** based on detected limitations.

## Why This Matters

Building this system taught us that **AI doesn't replace expertise - it structures it**.

The methodology (BEI, Critical Incident Technique) existed long before LLMs. What AI enables is:

1. **Scale** - Analyze hours of conversation in minutes
2. **Consistency** - Apply the same framework uniformly
3. **Traceability** - Link every conclusion to specific evidence
4. **Augmentation** - Give consultants tools to make better decisions faster

The magic isn't in the AI. It's in combining solid methodology with AI's ability to process and structure information at scale.

---

_This is another insight on how I've built product at [Voicit](https://voicit.com). If you're working on similar challenges with AI and structured analysis, I'd love to hear your approach._
