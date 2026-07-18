---
title: "The three principles"
description: "Validation loops, human-in-the-loop oversight, and domain-specific safeguards — what has to be true of a workflow before you can trust its output."
order: 2
draft: false
---

# The three principles

Everything else in this framework follows from three claims. They are not a checklist you complete once; they describe properties a workflow should have the whole time it runs. Stated plainly, a workflow you can trust catches its own errors where they are made, spends human attention on the decisions that matter, and checks the things that are only wrong in a scientific context.

## Validation loops

*Catch errors where they are made, not where they surface.*

A validation loop is a domain check placed at the point a decision is made, whose result feeds back into the work before it goes any further. The two halves both matter. It has to be a **domain** check — units, conservation, precision, bounds, provenance — because the checks a project already runs do not fail on a physically wrong answer: the build succeeds, the linter is quiet, the unit tests pass, and the result is still meaningless. And it has to **loop** — the check runs at the decision, not three stages downstream where the cause is expensive to find and the wrong number has already been built on.

"Add more tests" is not the same instruction. A test suite that runs at the end, over the whole system, tells you something is wrong somewhere. A validation loop tells you *this step* violated *this constraint*, at the moment the step happened. The discipline is to find the check that can actually fail on the specific way this piece of code could be wrong, and to run it there.

The strongest loops refuse to proceed. A check that computes a stability condition and exits before writing any output is worth more than one that records a warning nobody reads. A conservation test whose tolerance is loose enough to pass on any input is not a loop at all — it is a green light wired to always be green.

## Human-in-the-loop oversight

*Spend review where it changes the outcome.*

Human review is a finite resource, and spreading it evenly wastes it. Reading every line an agent writes with equal attention is not more oversight; it is oversight aimed at the wrong place, and it does not scale past the first afternoon. The skill is knowing which decisions to look at hard.

Two kinds are almost always worth it. The first is **decisions that later work inherits without re-examining** — an interface, a data layout, a units convention — because a wrong one is not one mistake but the silent premise of everything built on top of it. The second is **decisions that steer the agent itself** — the framing of the task, the assumptions it is told to make — because a wrong assumption early pollutes everything that follows it, and it does so fluently.

Which decisions those are is project-specific; the [loop's gate stage](/scientific-agentic-engineering/framework/the-loop/) and the [pattern catalog](/scientific-agentic-engineering/framework/patterns/) come back to the judgment. The general rule here is cheap: the least expensive checkpoint available is a plan you approve before any code exists, because a wrong plan costs a sentence to correct and a wrong implementation costs a day. Put a human decision in front of anything that is hard to undo, and let the rest run lighter.

## Domain-specific safeguards

*Add the checks no general-purpose tool ships with.*

The first two principles describe how to work. This one is about what you have to build, because nobody built it for you. General-purpose tooling checks syntax, types, style, and whether the tests you wrote pass. It does not check that a flux is conserved, that a unit conversion is physically coherent, that a numerically delicate operation did not quietly lose precision, that a plot's axes say what the plot appears to say, or that the code did not confidently call an API or invoke a physical law that does not exist.

Those checks only make sense in a scientific context, which is exactly why they are absent by default and exactly why they are the ones that matter. A domain-specific safeguard is any check you add because the failure it guards against is invisible to everything else: a physics assertion, a precision test, a provenance record, a bound on a scope the agent is not allowed to cross. They are the substance of the validation loops — the thing the loop actually checks — and building a reusable set of them for scientific work is what the project's community repository is for.

## How the three fit together

The principles are not independent virtues to be balanced against each other. They compose. Domain-specific safeguards are *what* a validation loop checks; oversight is *where* a human decides the loop's result is good enough to build on. The next two chapters make the composition concrete: first the [failures these principles defend against](/scientific-agentic-engineering/framework/failure-modes/), then [the loop](/scientific-agentic-engineering/framework/the-loop/) that runs them in order.
