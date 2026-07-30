---
title: "How scientific code fails"
description: "The specific failures the principles defend against — failures where the agent gets the science wrong, and process failures that let a wrong answer through — and where in the workflow each should be caught."
order: 3
draft: false
---

# How scientific code fails

The principles are a defense. This chapter is what they defend against.

## The signature

The failures in this chapter are not all alike. The ones that do the most damage share a signature: nothing visible goes wrong. No crash, no failing test, no red mark. Silent failure is not unique to science, so that alone does not make this the hard case. What does is that nothing downstream will correct you — a wrong result can sit inside a correct-looking pipeline indefinitely, because the only thing that would reveal it is a domain check somebody decided to run.

Two properties of the tools make this worse. An agent's output is *fluent*: it reads as confident and well-formed whether or not it is right, so tone carries no information about correctness. And when the same model writes both the code and the check on it, agreement between them is not evidence, for the reason the [introduction](/scientific-agentic-engineering/framework/introduction/) sets out. Independence has to come from somewhere else.

Other software has bugs like these too. What is distinctive about scientific work is that these are *the* failures to guard against, they are common enough to plan around, and the general-purpose safety net is not positioned to catch any of them.

## Domain failures: what the agent gets the science wrong about

These are errors in the content of the work — the science itself is wrong, while the code that expresses it is fine.

- **Unit confusion** — quantities combined or converted in the wrong units. The arithmetic is valid; the physics is not.
- **Precision loss** — numerically careless operations, such as catastrophic cancellation or recomputation from rounded intermediates, that degrade a result without breaking anything.
- **Subtle physics violations** — code that runs and returns plausible numbers while breaking a conservation law, a boundary condition, or a physical bound.
- **Visualization misinterpretation** — a figure that is technically produced from the data and still tells the reader something false: a mislabeled unit, a misleading colormap, a truncated axis.

## Process failures: how the workflow lets a wrong answer through

These are errors in the way of working — the science might have been checkable, but the workflow did not check it, or checked it in a way that could not fail.

- **False success** — a check that reports success without testing anything: a tolerance loose enough to pass on any input, a gate that returns green when the job it was watching stalled, a suite that runs the code without asserting on the result. It is the most dangerous failure in the catalog, because it actively certifies the wrong answer. It is also easy to introduce without intending to: when the same agent writes the check and the code it checks, the check can end up shaped to pass that code rather than to test it.
- **Hallucinated APIs, physics, or data** — the agent builds on a function, a flag, a dataset, or a physical relationship that does not exist, or that does not mean what it was used to mean. Because the invention is fluent and specific, it is easy to accept.
- **Context bloat** — long sessions drift as the window fills; details established early get buried, and nothing warns you when they do. The reverse also happens: something rejected early can resurface later as if it had been decided, especially after the context is summarized, and the agent builds to the wrong spec. The detail does not even have to come from the work itself. Answering an ordinary question about the code, such as why one approach was used instead of another, puts the alternative into the context, and a later summary can flatten the explanation of why it was rejected into a record that it was chosen.
- **Scope drift** — the work wanders from the task that was framed. An agent asked to fix one function returns a refactored module. The extra work arrives already done, and gets reviewed as though someone had asked for it.
- **Over-trust** — accepting fluent output because it is fluent. This is mostly a property of the reader rather than the model, and no less costly for it. Agents are susceptible too: when work is split across several, one agent's confident but wrong report can be taken as ground truth by the rest.

This taxonomy is drawn from observed episodes across real projects. It is not exhaustive, and not every failure in it is unique to scientific work; it names what a general-purpose workflow may not look for, so that a scientific one can.

## Where each failure is caught

Each failure maps to a stage of [the workflow](/scientific-agentic-engineering/framework/the-loop/):

- **Unit confusion, precision loss, physics violations** — caught by a domain check at the **verify** stage, at best one that refuses to run at all when a physical condition is violated.
- **Visualization misinterpretation** — caught at **verify**, by checking the figure against the data it claims to show rather than by looking at whether a figure was produced.
- **False success** — caught by making the **verify** check adversarial: a reviewer with fresh context whose job is to make the test fail, not confirm it passes.
- **Hallucinated APIs, physics, or data** — caught early, at **plan** and **critique**, before the fabrication is built on; and at **verify** by running against the real thing instead of the agent's memory of it.
- **Scope drift** — caught at **frame**, where the scope is fixed, and contained at **implement** by holding the work to the plan it was approved under.
- **Context bloat and over-trust** — caught structurally: by fresh context at **critique** and **verify**, and by a human deciding at the points that are hard to undo rather than watching the work go by.

The mapping is the argument for the workflow: each failure has a stage where catching it is cheap and stages where it is not. Whether organizing the work that way catches more of them in practice remains to be seen.
