---
title: "Introduction"
description: "What Scientific Agentic Engineering is, who this framework is for, and how it is organized."
order: 1
draft: false
---

# Introduction

Scientific Agentic Engineering is a methodology for integrating AI coding agents into scientific software development workflows. Research software has not settled on these tools, and there is no single story about where it stands: practitioners differ in how far they have adopted them, how much they trust them, and how much of the pace of change they have had attention to follow. A plausible wrong answer is a reasonable thing to be wary of. This framework is meant to serve that whole range — techniques for using these tools effectively while keeping their failures out of the results, wherever you are starting from.

The problem it addresses is narrow and specific. AI agents got good at writing code quickly, and they fail in a way that matters more in science than almost anywhere else: they produce results that are wrong but survive every check a project already runs. The code runs, the tests pass, and the number it prints is physically meaningless. A general-purpose workflow is not looking for that. A scientific one has to.

## What this framework is

It is a set of principles, and a way of working that puts them into practice.

The principles are three, and they are the same three named across this project: **validation loops**, **human-in-the-loop oversight**, and **domain-specific safeguards**. They are claims about what has to be true of a workflow before you can trust its output — not claims about which tools you use to get there. The next chapter develops each one.

The way of working is a single loop — frame, plan, critique, implement, verify, gate, record — that the principles run inside. It is not a novel invention; it is the shape that careful practitioners already converge on, written down so it can be taught, checked, and reused. It is also, deliberately, the skeleton of the Reference Workflow exercise and the tutorials that come later in the project.

## How to read it

The draft is organized to be read in order, but each chapter stands on its own.

1. **[The three principles](/scientific-agentic-engineering/framework/principles/)** — what has to be true of a workflow you can trust.
2. **[How scientific code fails](/scientific-agentic-engineering/framework/failure-modes/)** — the specific failures the principles defend against, and why the checks a project already runs do not catch them.
3. **[The validated agentic loop](/scientific-agentic-engineering/framework/the-loop/)** — the process that operationalizes the principles, stage by stage, with a minimum version for anyone working alone in a single chat window.
4. **[Structuring the workflow](/scientific-agentic-engineering/framework/structure/)** — where the safeguards live: the project's standing instructions, the procedures an assistant can run, its access to real systems, and the shape of the agents themselves.
5. **[The pattern catalog](/scientific-agentic-engineering/framework/patterns/)** — named practices, each tied to the stage of the loop it serves and the failure it counters, with a picture of what its absence looks like.

Where this draft names a specific tool, it does so as an example; the claims are meant to outlast any particular one.

If you are new to the vocabulary — agents, skills, MCP servers, validation loops — the [glossary](/scientific-agentic-engineering/glossary/) defines the project's core vocabulary, and the [overview](/scientific-agentic-engineering/overview/) sets up why scientific code is the hard case.

## A note on the evidence

The practices here are not aspirational. They come from real scientific-software projects built with AI agents — cases where a check caught a wrong answer before it shipped, and cases where nothing did. That is the framework's strongest material and its clearest limitation in the same breath: the evidence so far is narrow — largely one practitioner's work, on one vendor's tools. Two consequences follow, and the framework is built around both. Every practice is written tool-agnostically, as what has to be true of a workflow rather than which product makes it true; and the evidence base is meant to widen through episodes contributed by others as the project's community repository grows. Where you read that a practice catches a particular failure, read it as *observed to catch*, not *guaranteed to*.

This is a Milestone 1 draft (July 2026), published to be read and argued with.
