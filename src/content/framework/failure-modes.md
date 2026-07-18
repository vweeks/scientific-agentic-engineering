---
title: "How scientific code fails"
description: "The specific failures the principles defend against — domain errors the agent gets wrong, and process errors that let a wrong answer through — and where in the loop each should be caught."
order: 3
draft: false
---

# How scientific code fails

The principles are a defense. This chapter is what they defend against.

## The signature

Almost every failure that matters here has the same signature: the program runs, the tests pass, and the number it prints is wrong. There is no crash to trace and no red mark to chase. That is what makes scientific code the hard case. In most software a wrong answer is usually apparent before long — a page renders wrong, a request errors, a user complains. A wrong scientific result can sit inside a correct-looking pipeline indefinitely, because the only thing that would reveal it is a domain check nobody ran.

Two properties of the tools make this worse rather than better. An agent's output is *fluent* — it reads as confident and well-formed whether or not it is right, so tone carries no information about correctness. And an agent is *plausible by construction* — it produces the answer that looks like the answer, which is precisely the failure mode a discipline built on plausibility cannot self-correct. The check has to come from somewhere other than the thing that produced the answer.

It is worth being clear about scope. Other software has bugs like these too. What is distinctive about scientific work is that these are *the* failures to guard against, they are common enough to plan around, and the general-purpose safety net is not positioned to catch any of them.

## Domain failures: what the agent gets the science wrong about

These are errors in the content of the work — the science itself is wrong, while the code that expresses it is fine.

- **Unit confusion** — quantities combined or converted in the wrong units. The arithmetic is valid; the physics is not.
- **Precision loss** — numerically careless operations, such as catastrophic cancellation or recomputation from rounded intermediates, that quietly degrade a result while every test still passes.
- **Subtle physics violations** — code that runs and returns plausible numbers while breaking a conservation law, a boundary condition, or a physical bound.
- **Visualization misinterpretation** — a figure that is technically produced from the data and still tells the reader something false: a mislabeled unit, a misleading colormap, a truncated axis.

## Process failures: how the workflow lets a wrong answer through

These are errors in the way of working — the science might have been checkable, but the workflow did not check it, or checked it in a way that could not fail.

- **False success** — a check that reports success without testing anything: a tolerance loose enough to pass on any input, a gate that returns green when the job it was watching stalled, a suite that runs the code without asserting on the result. The most dangerous failure in the catalog, because it actively certifies the wrong answer.
- **Hallucinated APIs, physics, or data** — an agent confidently using a function, a flag, a dataset, or a physical relationship that does not exist, or does not mean what it was used to mean. Fluent and specific, and therefore easy to accept.
- **Context bloat** — long sessions drift as the window fills; details established early get buried, and nothing warns you when they do.
- **Over-trust** — accepting fluent output because it is fluent. Not a property of the model so much as of the reader, which is why it is on this list.

This taxonomy is larger than the four-item list this project started from, and it is drawn from observed episodes across real projects rather than imagined in advance. It is not meant to be complete — the point is not to enumerate every way code can be wrong, but to name the failures that a general-purpose workflow does not look for, so that a scientific one can.

## Where each failure is caught

Naming a failure is only useful if you know where to stand to catch it. Each maps to a stage of [the loop](/scientific-agentic-engineering/framework/the-loop/):

- **Unit confusion, precision loss, physics violations** — caught by a domain check at the **verify** stage, and better still by a **pre-gate** that refuses to run when a physical condition is violated.
- **Visualization misinterpretation** — caught at **verify**, by checking the figure against the data it claims to show rather than by looking at whether a figure was produced.
- **False success** — caught by making the **verify** check adversarial: a reviewer with fresh context whose job is to make the test fail, not confirm it passes.
- **Hallucinated APIs, physics, or data** — caught early, at **plan** and **critique**, before the fabrication is built on; and at **verify** by running against the real thing instead of the agent's memory of it.
- **Context bloat and over-trust** — caught structurally, by **isolation** (a fresh context that never saw the reasoning it is checking) and by the **gate** (a human deciding, rather than watching).

The mapping is the argument for the loop: a failure has a place it is cheapest to catch, and a workflow organized around those places catches more of them than diligence applied evenly.
