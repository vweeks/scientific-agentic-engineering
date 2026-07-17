---
title: "The validated agentic loop"
description: "The process the principles run inside — frame, plan, critique, implement, verify, gate, record — stage by stage, with a minimum version for anyone working alone in a single chat window."
order: 4
draft: false
---

# The validated agentic loop

The principles describe what has to be true. This is the process that makes them true, one stage at a time. It is not a new invention — it is the shape careful practitioners already converge on, written down so it can be taught and reused. Read it as a default to adapt, not a ceremony to perform: a two-line fix does not need seven stages, but knowing the full loop tells you which stages you are choosing to skip.

Each stage below names the principle that governs it, the failures it is positioned to catch, and — because most people reading this are working alone in a single chat window, not conducting a team of agents — what the stage looks like when you are the only human and there is one assistant.

## Frame

State the goal, the constraints, and the assumptions the work is allowed to make, before any code exists. Most bad output traces back to a bad frame: an unstated assumption, an ambiguous target, a success condition nobody wrote down. This is the cheapest place in the whole loop to be wrong, because correcting the frame costs a sentence.

- **Principle:** human-in-the-loop oversight — the frame is the highest-leverage decision you make.
- **Catches:** hallucinated requirements, scope drift, the wrong problem solved well.
- **Solo:** write the goal and the constraints in a sentence or two before you ask for anything. If you cannot state the success condition, you are not ready to ask for code.

## Plan

Have the assistant work out *how* it would reach the goal and show you the plan before acting — files it would touch, the approach, the risks. You are approving an approach while it is still cheap to change, not watching an implementation you will have to unwind.

- **Principle:** human-in-the-loop oversight — plan approval is the cheapest checkpoint that exists.
- **Catches:** hallucinated APIs and physics, before they are built on; approach-level mistakes that are expensive to reverse once coded.
- **Solo:** ask for the plan first, explicitly. Read it for the assumption you did not state and the step that sounds confident but invented.

## Critique

Before implementing, have the plan examined by something that did not write it — ideally a reviewer with fresh context. An author re-reading their own plan tends to confirm it; a reader who never saw the reasoning is in the position a code reviewer is in, and for the same reason.

- **Principle:** validation loops — the first check, applied to the plan rather than the code.
- **Catches:** blind spots baked into the framing, physics or numerics the plan takes for granted.
- **Solo:** open a fresh session and paste in only the plan, not the conversation that produced it. What the clean reader questions is what your working context had stopped seeing.

## Implement

Carry out the approved plan, and keep the work scoped to it. Isolation is the point: an agent implementing against a fixed plan, in a bounded context, is easier to check than one improvising the goal and the code at once.

- **Principle:** domain-specific safeguards — this is where the checks the plan called for get built alongside the code.
- **Catches:** scope drift, contained by holding the work to the plan and resetting deliberately when it wanders.
- **Solo:** implement in steps small enough that you can still say what changed and why. When the session starts to drift, start a clean one rather than pushing through.

## Verify

Run the domain checks — and make them adversarial. The job of verification is to make the result fail, not to confirm it passes, because a check written to pass is the false-success failure wearing a green light. Check against the real thing — the actual dataset, the actual API, an independent reimplementation — not against the agent's memory of it.

- **Principle:** validation loops and domain-specific safeguards, together.
- **Catches:** unit confusion, precision loss, physics violations, visualization misinterpretation, and false success itself.
- **Solo:** ask a fresh session to try to break the result, not to review it. Write at least one check that would actually fail if the physics were wrong, and confirm it can fail by feeding it a wrong answer on purpose.

## Gate

At the points that are hard to undo, a human decides — not watches. Watching a session scroll past is not deciding anything. The gate is a deliberate stop before an irreversible action: a push, a deployment, a destructive change, a result about to be reported as real.

- **Principle:** human-in-the-loop oversight — concentrated exactly where it changes the outcome.
- **Catches:** over-trust, and every failure that only becomes expensive once it is committed.
- **Solo:** decide in advance which actions require you to stop and approve, and make the assistant pause for them rather than assuming your silence is a yes.

## Record

Keep the record of what was decided, what the agent produced, and who approved it. A result nobody can reconstruct — because nobody recorded which parts an agent wrote, or on what basis they were accepted — is a result that cannot be defended, and in science that is the same as a result that is wrong.

- **Principle:** all three — provenance is what makes the loop auditable after the fact.
- **Catches:** the slow erosion of reproducibility, which fails quietly and later than everything else.
- **Solo:** keep enough of a trail — the plan, the checks, the decisions — that you could answer "why is this right?" a month from now without rerunning the reasoning in your head.

## Why a loop

The stages are not a pipeline you traverse once. Verification sends you back to plan; a failed gate sends you back to implement; a new goal restarts the frame. The value is in the ordering: each failure from the [previous chapter](/scientific-agentic-engineering/framework/failure-modes/) has a stage where it is cheapest to catch, and running the stages in order puts a check between each failure and the place it would otherwise surface.

This loop is also the spine of what comes next in the project. The Reference Workflow exercise is this loop, run once, on a real scientific task. The pattern catalog — in progress — tags each named practice by the stage it belongs to. And the structural guidance still to come is, in large part, about how to shape agents, skills, and MCP servers so that each stage has something concrete to run.
