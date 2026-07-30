---
title: "The workflow"
description: "The workflow the principles run inside — frame, plan and critique, implement, verify, with recording across all of them — in the plain version you can run with a single assistant."
order: 4
draft: false
---

# The workflow

The principles say what a rigorous workflow needs to do. This chapter is the workflow itself — the sequence you move a piece of work through to get from a goal to a result you can defend.

A few words for the moving parts, used the same way for the rest of the framework. A **task** is one unit of work you hand off — a feature to add, a bug to chase, a prototype to try. Each task moves through a short sequence of **stages**: frame, plan and critique, implement, verify. A goal too big for one task splits into smaller tasks that each run the same stages. You **loop** back through the stages when the work forces it — implementing reveals that a plan assumption does not hold, or verify finds a gap — and you **record** decisions across all of them. The rest of this chapter walks the stages and closes with [the loop](#the-loop).

Start with the plain version. You can run all of it with a single assistant — one chat window, no team of agents, no special tooling. The stages are the same whether you are working alone with a chatbot or orchestrating a dozen agents; what changes is how much rigor you build into each one. [Structuring the workflow](/scientific-agentic-engineering/framework/structure/) and the [pattern catalog](/scientific-agentic-engineering/framework/patterns/) are where that hardening lives.

Two roles run through what follows: *you*, responsible for the result, and *the assistant*, the agent doing the work at your direction. Some stages are yours to own; some are the assistant's to do and yours to check.

## Frame

Framing is yours. You set the goal, the constraints it has to respect, and the condition that would let you call the task done — and you set up somewhere for the work to live: a repository initialized, a fresh branch or worktree started, so what happens next can be recorded and undone.

The goal, the constraints, and the done-condition are the skeleton. A good frame also hands over what the assistant cannot cheaply discover: pointers to the relevant code or data, the pitfalls you already know about, the parts of the system that must not be touched, and any assumption you are working under that deserves to be said out loud. What you rarely need is a tour of the codebase. Current models will usually examine it on their own before acting, so the frame's job is to direct that examination rather than duplicate it: which directories matter, which results can be trusted, where the sharp edges are.

You start a new frame whenever you start new work. Not every frame has a crisp target. An exploratory task whose whole goal is to find out what "done" could even look like is a perfectly good frame, as long as you say that is what it is. What costs you later is the frame that left something unsaid: an assumption never stated, an ambiguous target, a success condition nobody wrote down. This is the cheapest place in the workflow to be wrong.

## Plan and critique

Before any code, the assistant works out how it would reach the goal — the approach, the tech stack, the files it would touch, the risks it sees — and that plan gets examined before anything is built on it. You read the plan to surface the assumptions that should have been stated outright, and the step that sounds confident but may be invented, and you push back until it holds up.

## Implement

The assistant carries out the agreed plan and holds the work to it. A plan you have already critiqued is a boundary: it is easier to check an implementation against a fixed approach than to check code that is inventing its goal and its details at the same time. The checks that will verify the work belong here too, written alongside the code rather than after it.

Watch for the work drifting from what was framed. That is [scope drift](/scientific-agentic-engineering/framework/failure-modes/), and it is a signal to stop and re-frame rather than push through. Keeping what the assistant can see trained on the task, so that drift is less likely in the first place, is one of the safeguards the next chapter takes up.

## Verify

Verify is a review of what was built, and it has one requirement worth being strict about: whoever wrote the code does not review it. The fresh eyes can be yours or a second agent's. If the same model handles both, the review has to run in a fresh session or a sub-agent that carries none of the context in which the work was produced; a session reviewing its own output brings the same blind spots to both jobs. A common community practice goes further and has a different vendor's model do the review (work produced with one assistant, checked with another), on the theory that different models fail in different ways. That choice has its own trade-offs, but the premise is unchanged: the author is not the reviewer.

The reviewer reads the implementation and its checks against the thing they actually have to match: the real dataset, the live API, an independent recomputation, the governing equation. A review names what does not hold up, what is missing, and what passes on any input and so tests nothing.

The checks themselves were written back in implement. Verify is where someone confirms they exist, that they exercise the science and not just the plumbing, and that they would actually fail on a wrong answer.

## Recording, throughout

Recording is not a fifth stage you pass through; it runs across all of them. Every stage settles something — a plan resolves a question, a critique forces a change, verify rejects a result — and the reason behind each of those is worth capturing while it is still in front of you, before later work buries it. Implement settles things too: discovering mid-build that the plan does not survive contact is itself a settled fact. Record it the moment it happens, then stop and adjust the plan or the frame; a pivot nobody wrote down looks arbitrary later.

What version control keeps and what it leaves out is the subject of [provenance](/scientific-agentic-engineering/framework/principles/#provenance). The part that belongs here is who does it: you can ask the assistant to keep the decision record as it works, but making sure it happens, and stays honest, is yours. With agents doing the edits, *when* and *why* a line changed are what you will want later; *who* changed it starts to matter once agents carry distinct roles, a structure the next chapter introduces.

## The loop

You will not always loop. Verify can confirm the goal is met, and then you stop. When it comes back with problems instead, resist patching them one at a time as they surface: collect them, plan the fixes as a batch, and run that batch through the stages again. Batching is what makes this a loop rather than thrash, and where you re-enter depends on what verify found.

Each time around, the stages run against what was actually built rather than against what could only be assumed before the first implementation existed. Some things are not knowable until an implementation has been attempted; a sound plan states them as assumptions, and the loop is where they get replaced by what turned out to be true. The returns diminish, so you stop when the result holds.

<figure style="margin: 2rem 0;">
<svg viewBox="0 0 560 212" width="100%" role="img" font-family="ui-sans-serif, system-ui, sans-serif">
  <title>The workflow: frame, then plan and critique, then implement, then verify. Verify either holds, and the task is done, or sends the work back — to plan when it needs rethinking, to implement when it just needs a fix. Recording runs across every stage.</title>
  <defs>
    <marker id="wf-head-gray" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" fill="#6b7280"/>
    </marker>
    <marker id="wf-head-blue" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L8,4 L0,8 Z" fill="#2563eb"/>
    </marker>
  </defs>

  <!-- return paths (verify sends you back) -->
  <polyline points="484,62 484,86 386,86 386,65" fill="none" stroke="#2563eb" stroke-width="1.5" marker-end="url(#wf-head-blue)"/>
  <text x="435" y="101" text-anchor="middle" font-size="15" fill="#6b7280">just needs a fix</text>
  <polyline points="506,62 506,118 150,118 150,65" fill="none" stroke="#2563eb" stroke-width="1.5" marker-end="url(#wf-head-blue)"/>
  <text x="320" y="134" text-anchor="middle" font-size="15" fill="#6b7280">needs rethinking</text>

  <!-- done exit -->
  <line x1="528" y1="62" x2="528" y2="122" stroke="#6b7280" stroke-width="1.5" marker-end="url(#wf-head-gray)"/>
  <text x="544" y="140" text-anchor="end" font-size="15" fill="#111827">holds — done</text>

  <!-- forward arrows -->
  <line x1="91" y1="40" x2="114" y2="40" stroke="#6b7280" stroke-width="1.5" marker-end="url(#wf-head-gray)"/>
  <line x1="186" y1="40" x2="208" y2="40" stroke="#6b7280" stroke-width="1.5" marker-start="url(#wf-head-gray)" marker-end="url(#wf-head-gray)"/>
  <line x1="307" y1="40" x2="330" y2="40" stroke="#6b7280" stroke-width="1.5" marker-end="url(#wf-head-gray)"/>
  <line x1="441" y1="40" x2="464" y2="40" stroke="#6b7280" stroke-width="1.5" marker-end="url(#wf-head-gray)"/>

  <!-- stages -->
  <g stroke="#6b7280" stroke-width="1.5" fill="#ffffff">
    <rect x="16" y="18" width="72" height="44" rx="8"/>
    <rect x="118" y="18" width="64" height="44" rx="8"/>
    <rect x="212" y="18" width="92" height="44" rx="8"/>
    <rect x="334" y="18" width="104" height="44" rx="8"/>
    <rect x="468" y="18" width="76" height="44" rx="8"/>
  </g>
  <g text-anchor="middle" font-size="17" font-weight="600" fill="#111827">
    <text x="52" y="40" dy="0.35em">Frame</text>
    <text x="150" y="40" dy="0.35em">Plan</text>
    <text x="258" y="40" dy="0.35em">Critique</text>
    <text x="386" y="40" dy="0.35em">Implement</text>
    <text x="506" y="40" dy="0.35em">Verify</text>
  </g>

  <!-- record band, across every stage -->
  <rect x="16" y="158" width="528" height="42" rx="8" fill="#f3f4f6" stroke="#e5e7eb"/>
  <text x="280" y="179" dy="0.35em" text-anchor="middle" font-size="15">
    <tspan font-weight="600" fill="#111827">Record</tspan>
    <tspan fill="#6b7280"> — decisions and their reasons, across every stage</tspan>
  </text>
</svg>
</figure>

---

Not every piece of work needs all of this, though the exception is narrower than it first looks. The workflow earns its overhead when the approach is genuinely undecided, when a wrong answer would be hard to spot and expensive to have shipped, and also on substantial work whose approach is already settled — size alone gives an unreviewed implementation plenty of room to go wrong. A small fix that verify surfaced already lives inside the workflow and costs almost nothing extra to run through it. The real exception is the standalone small or cosmetic adjustment, and by this chapter's own definition, that is barely a task at all.

What the plain version leaves on the table is how well each stage runs. The same stages get sharper when you scope what each one is allowed to see, bring more than one perspective to bear before trusting a result, and put a human in front of the decisions that are hard to undo. [Structuring the workflow](/scientific-agentic-engineering/framework/structure/) covers where those safeguards live, and the [pattern catalog](/scientific-agentic-engineering/framework/patterns/) breaks them into practices you can adopt one at a time.
