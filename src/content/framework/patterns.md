---
title: "The pattern catalog"
description: "Named practices, each tied to the stage of the loop it serves and the failure it counters, with a picture of what its absence looks like."
order: 6
draft: false
---

# The pattern catalog

The chapters before this one argue for a shape of working. The catalog takes it apart into practices small enough to adopt one at a time. Each entry names the stage of [the loop](/scientific-agentic-engineering/framework/the-loop/) it serves, the [failures](/scientific-agentic-engineering/framework/failure-modes/) it counters, the practice itself, and what its absence looks like — because most of these are easiest to recognize from the inside of not doing them.

The illustrations in this draft are composites: realistic situations assembled from real development episodes, with identifying detail removed. Documented episodes from named projects will be cited as they are cleared for publication, and the catalog is built to grow as the project's community repository collects more.

## Plan before code

*Stage: frame, plan. Counters: hallucinated APIs and physics, scope drift, the wrong problem solved well.*

Ask for the plan, not the code. A plan is short enough to actually read, cheap enough to discard, and it exposes the assumptions — the API taken to exist, the physics taken to apply — before anything is built on them. Approving an approach is a decision; unwinding an implementation is a project.

**When it is missing:** the first artifact you see is four hundred lines of plausible code. Somewhere in it is an assumption you never granted, and reading the code will not surface it, because the code is the assumption, fluently elaborated.

## Fresh-eyes critique

*Stage: critique. Counters: context bloat, self-confirmation, blind spots baked into the framing.*

Have the plan examined by a reader that did not write it and cannot see the conversation that produced it — a colleague, or a clean assistant session given only the plan. Re-reading your own reasoning mostly confirms it; a reader who has only the plan is in the position a referee is in, obliged to judge the argument that is actually on the page.

**When it is missing:** the plan is reviewed by scrolling up. Everything looks right, because the same context that produced the assumptions is being asked whether the assumptions look right.

## Ask the real thing

*Stage: implement, verify. Counters: hallucinated APIs, datasets, and physics.*

When a fact about the world is available — a function signature, a variable's units attribute, a dataset's dimensions — have it read from the source rather than recalled. An assistant's memory of a library is a plausible reconstruction; the library's documentation, the dataset's own metadata, the running interpreter are the fact. The [previous chapter](/scientific-agentic-engineering/framework/structure/) describes the access structures that make this the path of least resistance.

**When it is missing:** the code calls a function that almost exists, with arguments in the order a reasonable person would have chosen, against a dataset whose variables are named what they would be named if the world were tidier. It reads perfectly. None of it is real.

## Prove the check can fail

*Stage: verify. Counters: false success — the most dangerous failure in the catalog.*

Before trusting any check, feed it an answer you know is wrong and watch it fail. A tolerance loose enough to pass anything, a comparison that never runs, a gate that reports green when the job it watched stalled — every one of these looks identical to a working check from the outside. The only way to know a check can fail is to have seen it fail.

**When it is missing:** the validation suite has passed for months. So would noise. The green light is not evidence of anything except that the light is wired to be green, and the first time anyone discovers this is the day the result matters.

## Refuse to run

*Stage: verify, gate. Counters: unit confusion, precision loss, subtle physics violations.*

Where a physical condition can be stated, enforce it as a precondition that stops the work — an assertion on conservation within a justified tolerance, a stability criterion checked before the expensive computation starts, a bounds check on a quantity that has a physical range. A check that halts is worth more than a warning that scrolls past, because a halt cannot be unread.

**When it is missing:** the diagnostic that would have caught the violation exists, and prints its complaint into a log nobody reads, under output nobody scrolls through, while the pipeline continues to the end and delivers a number.

## Decide the gates in advance

*Stage: gate. Counters: over-trust, and every failure that becomes expensive once committed.*

Name, before the work starts, the actions that require a human decision — the push, the deployment, the deletion, the moment a result gets reported as real — and make the assistant stop at them. A gate chosen in the moment is chosen by momentum; by the time the question is asked, the session has been fluent and agreeable for an hour, and waving it through feels like continuity rather than a decision.

**When it is missing:** oversight means watching the session scroll. Everything was visible and nothing was decided, and the irreversible step went through in the same rhythm as the reversible ones on either side of it.

## Keep the decision trail

*Stage: record. Counters: the slow erosion of reproducibility.*

File the plan that was approved, the checks that ran, and the basis on which the result was accepted — alongside the code, where version control keeps them. Commits already record what changed and who changed it; the trail that goes missing is *why*: the approach that was chosen, the assumptions it rested on, the evidence that convinced someone it was right. That is the part a defense of the result will need, and the part nothing records by default.

**When it is missing:** six months later the result is questioned. The code is still there; the reasoning is in a chat session nobody kept, and the honest answer to "why is this right?" is that it passed at the time. What cannot be reconstructed cannot be defended.

## Extending the catalog

Seven patterns is a deliberate floor, not an estimate of how many there are. The catalog grows two ways: episodes from real projects, cited with their owners' agreement as they are cleared, and contributions through the community repository as other practitioners write down what their own workflows caught — or failed to catch. A pattern earns its place here the same way a check earns trust: by being observed to work, in a situation someone can describe.
