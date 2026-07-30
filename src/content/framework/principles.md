---
title: "The five principles"
description: "Validation loops, human-in-the-loop oversight, provenance, context discipline, and domain-specific safeguards — the workflow properties that catch an agent's failures before they reach the result, keep the record that lets it be reproduced, and give each step a clean view of its task."
order: 2
draft: false
---

# The five principles

Everything else in this framework follows from five claims. They describe properties a workflow should have the whole time it runs, rather than steps you complete once.

## Validation loops

*Catch errors where they are made, not where they surface.*

A validation loop is a check placed at the point a decision is made, whose result feeds back into the work before anything is built on it. Three properties make it a loop. It runs **at the decision**, not three stages downstream where the cause is expensive to find and the wrong answer has already been built on. It **can fail** — there must be a wrong answer that would trip it. And its result **gates what proceeds** — a failure sends the work back, and the fix reruns the check.

The loop examines whatever the decision rests on. Sometimes that is code: a return value, an interface contract, a boundary condition. Just as often it is an assumption the agent is working from — that a function exists, that a dataset has the shape the plan says it has. Confirming the assumption at the decision is a moment's work; discovering it was false later means unwinding everything that inherited it.

"Add more tests" is not the same instruction. A test suite that runs at the end, over the whole system, tells you something is wrong somewhere. A validation loop tells you *this step* violated *this constraint*, at the moment the step happened. The discipline is to find the check that can actually fail on the specific way this piece of work could be wrong, and to run it there.

The strongest loops refuse to proceed: a check that computes a stability condition and exits before writing any output is worth more than one that records a warning nobody reads. And nothing in the principle is specific to science — what a check contains, for scientific work, is what the fifth principle, [domain-specific safeguards](#domain-specific-safeguards), supplies.

## Human-in-the-loop oversight

*Spend review where it changes the outcome.*

Human review is a finite resource, and spreading it evenly wastes it. Reading every line an agent writes with equal attention does not scale, and it spends the attention where it was least needed. The skill is knowing which decisions to look at hard.

Two kinds are almost always worth it. The first is **decisions that later work inherits without re-examining** — an interface, a data layout, a units convention — because a wrong one is not one mistake but the silent premise of everything built on top of it. The second is **decisions that steer the agent itself** — the framing of the task, the assumptions it is told to make — because a wrong assumption early pollutes everything that follows it. In both, the assumptions deserve as hard a look as the decisions: the ones the agent is operating under, and the ones you granted without noticing.

Which decisions those are is project-specific; the [workflow chapter](/scientific-agentic-engineering/framework/the-loop/) and the [pattern catalog](/scientific-agentic-engineering/framework/patterns/) come back to the judgment. The general rule is cheap: approve a plan before any code exists, because a wrong plan costs a sentence to correct and a wrong implementation costs a day — a day measured in tokens as well as time, since diagnosing and repairing existing code is far more expensive than writing it correctly the first time. Put a human decision in front of anything that is hard to undo, and let the rest run lighter.

## Provenance

*Keep the why — while you still have it.*

The principles up to here are about getting the answer right and deciding when to trust it. This one is about being able to show, afterward, how you got it — because an AI-assisted result nobody can trace back is hard to reproduce, defend, or safely build on.

Version control captures what changed, but not why it changed — the approach that won out over the alternatives, the assumptions behind it, the evidence that settled the question, and which parts an agent produced versus a human approved. That reasoning is in front of you while a decision is being made and mostly gone once the next one starts, so provenance is something you capture as the work happens, not reconstruct at the end.

Kept this way, the record pays off in two directions: backward, it lets someone challenge the result and see which step to distrust; forward, it is live context the workflow reuses while the work is still going. For scientific work the payoff is reproducibility — a derivation on the record can be checked and repeated by someone who was not in the room when it was made.

## Context discipline

*Give each actor the context its task needs — current, and no more.*

An agent works from what is in front of it, and that window is finite. Fill it with a previous task's history, a half-finished investigation, or detail that was relevant an hour ago, and the next piece of work inherits all of it — the model cannot tell which parts still matter. What falls out of the window is not flagged as missing, and what lingers in it is not flagged as stale. Either way the work proceeds on a premise nobody checked.

So context is something you actively manage rather than let accumulate. At its simplest that is manual: clear or compact the window before a new task, start a fresh session rather than piling onto a spent one. Delegating a bounded task to a sub-agent does the same thing structurally — the sub-agent starts clean, sees only what its task needs, and hands back a result instead of a transcript. The mechanism changes with scale; the property does not.

It is also where a workflow's independence comes from. A critique or a verification only counts as a check if the reviewer did not help write what it is checking, and that is a property of context, not of good intentions. Validation loops depend on it: a check produced from the same context as the code it checks inherits whatever that context got wrong.

## Domain-specific safeguards

*Encode the science only you can vouch for.*

The four principles before this one are general: they hold for any software built with agents. This one is what scientific work adds. General-purpose tooling checks syntax, types, style, and whether the tests pass, and models are steadily getting better at proposing checks of their own. What none of that settles is whether a flux should be conserved here, which unit convention this interface assumes, or what tolerance counts as passing for this problem. Those are claims about your science, and they stay yours to make.

A domain-specific safeguard is any check you add because the failure it guards against is invisible to everything else: a physics assertion, a precision test, a bound on a scope the agent is not allowed to cross. They only make sense in a scientific context, which is why they are absent by default and why they are the ones that matter. The project's community repository will release a curated starter set of such checks — unit checkers, conservation-law validators — as examples to build from.

## How the five fit together

The five work together rather than trading off against each other. The first four are general, and they pair off: validation loops and oversight govern the **checking** — *when and where* a check runs, and *who* decides the result is good enough to build on. Provenance and context discipline govern the **information** — the record you *keep*, and the view you *show* each actor. Provenance looks backward and lasts; context is present and finite; together they set what the workflow remembers and what it sees.

The fifth is what scientific work adds. Domain-specific safeguards are *what* a validation loop checks — the substance the first principle needs and cannot supply for itself. Without them the loop still runs, on time and in the right place, and passes on an answer that is physically meaningless. The next two chapters make the composition concrete: first the [failures these principles defend against](/scientific-agentic-engineering/framework/failure-modes/), then [the workflow](/scientific-agentic-engineering/framework/the-loop/) that puts them to work.
