---
title: "The pattern catalog"
description: "Named practices, each tied to the stage of the workflow it serves and the failure it counters, with a picture of what its absence looks like."
order: 6
draft: false
---

# The pattern catalog

The chapters before this one argue for a shape of working. The catalog takes it apart into practices small enough to adopt one at a time. Each entry names the stage of [the workflow](/scientific-agentic-engineering/framework/the-loop/) it serves, the [failures](/scientific-agentic-engineering/framework/failure-modes/) it counters, the practice itself, and what its absence looks like — because most of these are easiest to recognize from the inside of not doing them. The entries run in stage order, with the one practice that spans every stage at the end.

The illustrations are composites: realistic situations assembled from real development episodes, with identifying detail removed. What matters in each is the mechanism, and the mechanism survives the removal.

## Cut the goal to task size

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">frame</span>
</p>

*Counters: scope drift, the wrong problem solved well.*

A task is one unit of work, and some goals are bigger than one unit. When the goal is broad — an application rather than a feature, a campaign of analysis rather than a figure — frame a roadmap before framing any task: the phases the work divides into, what each phase must deliver, and which comes first. Each phase then becomes a task in its own right, with a goal focused enough for a short plan to cover. A phase that still resists a short plan gets split the same way. The roadmap stays at the level of what each phase has to produce; how any phase will be built is a question for that phase's own planning.

**When it is missing:** the scope of the work is chosen by the assistant, and it tends to choose big. An exploratory question — roughly, what might a configuration for a tool like this look like — comes back as the complete application: fluent, plausible, and never used, because it answers a question nobody asked. The same failure at larger scale is the multi-phase project attempted as a single task, under a plan too long for anyone to have honestly read.

## Decide the gates in advance

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">frame</span>
</p>

*Counters: over-trust, and every failure that becomes expensive once committed.*

Name, before the work starts, the actions that require a human decision — the push, the deployment, the deletion, the moment a result gets reported as real — and make the assistant stop at them. A gate chosen in the moment is chosen by momentum; by the time the question is asked, the session has been fluent and agreeable for an hour, and waving it through feels like continuity rather than a decision.

**When it is missing:** oversight means watching the session scroll. Everything was visible and nothing was decided, and the irreversible step went through in the same rhythm as the reversible ones on either side of it.

## Refuse to call complete

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">frame</span>
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">implement</span>
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">verify</span>
</p>

*Counters: unit confusion, precision loss, subtle physics violations.*

Where a condition of correctness can be stated — conservation within a justified tolerance, a stability criterion, a physical range a quantity must stay inside — name it in the frame as a precondition: the task is not complete while it fails. The check itself gets built during implement, alongside the code it guards, and the strongest form stops the work outright, exiting before the expensive computation starts or any output is written. Verify then holds the result to the named preconditions, and asks what the frame missed — the check that should have been named and was not. Choosing the tolerance is the hard part and it is genuinely domain work: too tight and the check cries wolf across compilers and decompositions, too loose and it passes on anything.

**When it is missing:** the diagnostic that would have caught the violation exists, and prints its complaint into a log nobody reads, under output nobody scrolls through, while the pipeline continues to the end and delivers a number.

## Plan before code

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">plan and critique</span>
</p>

*Counters: hallucinated APIs and physics, scope drift.*

The workflow already puts the plan ahead of the code, so the ordering is not what this entry adds. What it prescribes is the plan itself: the approach, the interfaces taken to exist, the files to be touched, the risks the author can already see — the assumptions stated while they are still cheap to challenge. Approving an approach is a decision; unwinding an implementation is a project. And the plan stays short enough to actually read, because a plan that gets skimmed has been approved on trust. If it cannot be kept short, the trouble is upstream: the goal is still bigger than one task, and it needs cutting down before planning continues.

**When it is missing:** the first artifact you see is four hundred lines of plausible code. Somewhere in it is an assumption you never granted, and reading the code will not surface it, because the code is the assumption, fluently elaborated.

## Fresh-eyes critique

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">plan and critique</span>
</p>

*Counters: context bloat, self-confirmation, blind spots baked into the framing.*

Have the plan examined by a reader that did not write it and cannot see the conversation that produced it — a colleague, or a clean assistant session. The critic gets the frame: the goal, the constraints, the condition that counts as done. It does not get the derivation, the exchanges that talked the plan into its current shape. Withhold the goal too and the critic can judge nothing but internal coherence, and a plan can be perfectly coherent and aimed at the wrong thing. Given the frame and the plan, a critic is obliged to judge the argument actually on the page against the problem it claims to solve.

**When it is missing:** the plan is reviewed by scrolling up. Everything looks right, because the same context that produced the assumptions is being asked whether the assumptions look right.

## Ask the real thing

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">implement</span>
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">verify</span>
</p>

*Counters: hallucinated APIs, datasets, and physics.*

When a fact about the world is available — a function signature, a variable's units attribute, a dataset's dimensions — have it read from the source rather than recalled. An assistant's memory of a library is a plausible reconstruction; the library's documentation, the dataset's own metadata, the running interpreter are the fact. Current models increasingly reach for this on their own — it is common to watch one reason that it should check the actual code rather than assume. The pattern removes the dependence on that judgment: the [previous chapter](/scientific-agentic-engineering/framework/structure/) describes the access structures that make reading the source the path of least resistance, so the lookup happens whether or not the model would have chosen it that day.

**When it is missing:** the code calls a function that almost exists, with arguments in the order a reasonable person would have chosen, against a dataset whose variables are named what they would be named if the world were tidier. It reads perfectly. None of it is real.

## Prove the check can fail

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700">verify</span>
</p>

*Counters: [false success](/scientific-agentic-engineering/framework/failure-modes/).*

Before trusting any check, feed it an answer you know is wrong and watch it fail. This is ordinary good practice, and current models already write generous test suites without being asked — which is exactly why the human action left in this pattern is one question: do any of these checks fail on a known-wrong input? A broken check looks identical to a working one from the outside, and the size of a suite is not evidence that anything in it can fail. Mutation testing asks the question systematically; asked by hand, once per suite, it is still worth the minute it takes.

**When it is missing:** the validation suite has passed for months. So would noise. Nobody finds out which until the day the result matters.

## Keep the decision trail

<p class="not-prose flex flex-wrap gap-2">
  <span class="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-600">all stages</span>
</p>

*Counters: the slow erosion of reproducibility.*

File the plan that was approved, the checks that ran, and the basis on which the result was accepted — alongside the code, where version control keeps them. What commits record and what they leave out is covered under [provenance](/scientific-agentic-engineering/framework/principles/#provenance); the practice here is simply to file it as you go, in the repository, rather than trusting it to a session.

**When it is missing:** six months later the result is questioned. The code is still there; the reasoning is in a chat session nobody kept, and the honest answer to "why is this right?" is that it passed at the time.

## What earns a place here

The catalog is deliberately short. A pattern earns its place by having been observed to work, in a situation someone can describe; sounding plausible is not enough here, for the same reason it is not enough anywhere else in the framework.
