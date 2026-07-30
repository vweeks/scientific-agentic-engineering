---
title: "Introduction"
description: "What Scientific Agentic Engineering is, who this framework is for, and how it is organized."
order: 1
draft: false
---

# Introduction

**[Agentic engineering](/scientific-agentic-engineering/glossary/#agentic-engineering)** is directing AI agents that plan, act, and use tools, rather than writing every line yourself. Getting working code out of an agent is easy, and getting easier. Getting the code you actually meant, robust enough to rely on, is the part that takes skill.

The bugs agents produce are mostly familiar ones. What is new is the standing of the checks you already run. A test counts as evidence because someone decided what correct behavior was independently of the code, then wrote that down. When one model produces the implementation *and* the test for it from the same context and the same assumptions, agreement between them stops being informative: the suite still passes, but its passing no longer counts as evidence. Better tests do not fix this, because the tests are what changed.

That is true of any software, and it bites hardest where nothing downstream will catch the error for you. A billing error turns up in the revenue; a broken page is visible to anyone who opens it. A wrong diffusion coefficient produces a plausible number that gets built on, and the error stays undetected, sometimes all the way to publication. [How scientific code fails](/scientific-agentic-engineering/framework/failure-modes/) catalogs the specific ways this happens — unit confusion, precision loss, a violated conservation law, a figure that misrepresents a correct result, a check that cannot fail — and what makes them worth planning around together is that the general-purpose safety net is aimed at none of them.

So the framework is mostly general discipline, applied where it is least optional. Four of its five principles hold for any software built with agents. The fifth is what scientific work adds: checks that only mean something against a conservation law, a unit convention, or a real dataset. Models increasingly propose such checks themselves. Whether a proposed check is the invariant your result actually depends on is a claim about your science, and the responsibility for that claim stays with you. Scientific Agentic Engineering is that combination.

## What this framework is

Five principles run through the framework: **validation loops**, **human-in-the-loop oversight**, **provenance**, **context discipline**, and **domain-specific safeguards**. The next chapter takes each in turn.

The way of working is a short sequence of stages — frame, plan and critique, implement, verify — that every task runs through, with decisions recorded across all of them. You loop back through the stages as the work teaches you something, and the principles operate inside. None of it is new: it is the shape careful practitioners already converge on, written down so it can be taught, checked, and reused. It is also, by design, the backbone of the Reference Workflow exercise and the tutorials later in the project.

## How to read it

The draft is organized to be read in order, but each chapter stands on its own.

1. **[The five principles](/scientific-agentic-engineering/framework/principles/)** — the workflow properties that catch an agent's failures before they reach the result.
2. **[How scientific code fails](/scientific-agentic-engineering/framework/failure-modes/)** — the specific failures the principles defend against, and why the checks a project already runs do not catch them.
3. **[The workflow](/scientific-agentic-engineering/framework/the-loop/)** — the process that operationalizes the principles, stage by stage, starting with the plain version you can run with a single assistant in one chat window.
4. **[Structuring the workflow](/scientific-agentic-engineering/framework/structure/)** — where the safeguards live: the layered places guidance can sit, the constraints you enforce rather than state, the skills that make checks repeatable, and the shape of the agents themselves.
5. **[The pattern catalog](/scientific-agentic-engineering/framework/patterns/)** — named practices, each tied to the stage of the workflow it serves and the failure it counters, with a picture of what its absence looks like.

This draft names specific tools only as illustration — the claims are written to outlast any particular one.

If you are new to the vocabulary — agents, skills, MCP servers, validation loops — the [glossary](/scientific-agentic-engineering/glossary/) defines the project's core terms, and the [overview](/scientific-agentic-engineering/overview/) makes the case for the project as a whole.

## A note on the evidence

These practices come from real scientific-software projects built with AI agents, rather than from speculation about how such work ought to go. The evidence is also narrow: largely one practitioner's work, on one vendor's tools, over one year. So each practice is stated provisionally — where you read that something catches a particular failure, read it as *observed to catch*, not *guaranteed to*. The episodes behind them are being written up as they are cleared for publication. Until those appear here, treat the specifics on this site as claims to be tested rather than results to cite.

This is a Milestone 1 draft (July 2026) of the fellowship project *Maintaining Scientific Rigor in AI-Assisted Development: A Validation-Focused Methodology*, published to be read and argued with.
