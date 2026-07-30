---
title: "Structuring the workflow"
description: "Where the safeguards live — the layered places guidance can sit, from the model itself down to a single task's plan, plus the constraints you enforce rather than state, the skills that make checks repeatable, and the shape of the agents."
order: 5
draft: false
---

# Structuring the workflow

[The workflow](/scientific-agentic-engineering/framework/the-loop/) says what happens at each stage. This chapter is about where those things live. A safeguard that lives in structure — a file, a procedure, a permission — survives long sessions, new collaborators, and ordinary forgetting. A safeguard that lives in somebody's habits does not.

The places to put structure form a stack, ordered by how long each layer lasts and how much work it governs: the model itself, the configuration that follows you, the project file, the assistant's memory, the skills a project carries, the frame you give one task, and the plan the agent writes for it. Seven today — but the number is a snapshot of current tooling, not a law. What lasts is the question the stack teaches you to ask of any safeguard: how long should this live, and how much work should it govern? Answer that, and the right layer follows.

The stack has one property worth knowing before walking it: structure migrates toward the model. Each generation absorbs judgment that previously had to be written down — Anthropic reports removing over 80% of the system prompt from its own coding agent for its newest models, with no measured loss on its coding evaluations. So nothing below is written once. Every layer is rightsized over time, and a line that no longer earns its place is a bug.

## Where guidance lives

**The model** is the layer you do not write. Each generation arrives with more of the discipline built in — reading the source instead of assuming, planning before acting, checking its own output. Your only decision here is subtraction: when the model has absorbed a rule, delete your copy of it.

**User configuration** follows the person rather than the project — how cautious the assistant should be with destructive commands, what always requires asking, how you like work reported. For a CLI assistant these are real files, read alongside the project's own. A rule about *you* belongs here, once, rather than repeated in every repository you touch.

**The project file** is versioned with the code and read at the start of every session — the cheapest structural safeguard there is: written once, applied every session, whether or not anyone remembers to mention it. Keep it lean: a line on what the repository is for, then the gotchas. The units convention. The tolerances that count as passing. Which datasets are authoritative, which results are frozen. And the gates — the actions that always require a human decision, named in advance so the assistant stops for them rather than discovering them mid-task. What does not belong is anything the assistant can see for itself; a file that re-describes the codebase is bloat, and a pile of prohibitions written for last year's failures is worse than bloat, because conflicting stale instructions force the model to arbitrate between your rules instead of doing the work. More capable models do better with fewer, sharper lines. Keep the file short enough that a new collaborator would actually read it.

**Memory** persists past the context window, and increasingly the assistant maintains it itself. It differs from the project file in kind, not just in place: the file is authored, reviewed, and versioned; memory accumulates out of the work. What belongs in it is what you would otherwise re-teach every session but would not commit to the repository — the state of an ongoing effort, a preference discovered in use, the correction you do not want to make twice. Treat it as its own layer, and audit it the way you audit the file: a stale memory misdirects as effectively as a stale instruction.

**Skills** sit between the standing layers and the task — procedures rather than prose. They earn their own section below.

**The frame and the plan** are the bottom of the stack, and they are not standing structure at all: they live and die with the task. What a good frame supplies is the [workflow chapter's](/scientific-agentic-engineering/framework/the-loop/) subject; the plan is the task's own artifact — approved, acted on, and filed with the record rather than promoted into guidance. The bottom of the stack mostly needs defending from the layers above it, in both directions. Yesterday's task instructions pasted into the project file are how standing files bloat; a frame that restates the project file is how sessions start slow. Each layer holds what recurs at its own timescale, and nothing else.

## Constraints: stated or enforced

A constraint can be a sentence the model reads or a boundary the system enforces, and the difference matters most on your worst day. "The directory of published results is off limits" in a project file relies on being read, staying in view, and being obeyed — which holds until the context degrades, and a degraded context is exactly when you need it to hold. A sandbox, a file permission, a scoped credential does not care what the model has forgotten.

Stated constraints are cheap to add, easy to change, and legible to everyone reading the file. Enforced constraints take setup and can obstruct legitimate work. The division that works: enforce what must never happen — the frozen results, the raw data, the credentials, anything public-facing — and state what requires judgment, like scope, style, and when to ask. The gates sit between the two: named in the project file so every session knows them, and, where the tooling allows, backed by an approval mode that makes the stop mechanical rather than remembered. Where the same constraint could live in either place, put the irreversible ones behind enforcement.

## Skills: procedures with a home

Skills are motivated by repetition. The third time you catch yourself giving the same instructions — run the conservation check like this, compare against the frozen baseline, remember the halo cells — the procedure has earned a better home than your memory of it. A skill is that procedure written down: versioned with the code, invocable by name, run the same way every time instead of being improvised from recall in each session. Today's ecosystems call these skills, commands, or recipes; the mechanism matters less than the property.

The anatomy is small: a name, a line saying when the skill applies, the tools it is allowed to touch, and the procedure itself in plain language. As one illustration, in today's terms:

```text
name: conservation-check
when: after any change to the flux integrator
tools: read the repository; run the test harness
procedure: run the reference case; compute total mass before and
  after; report both numbers; fail if |ΔM|/M₀ exceeds the
  tolerance documented in validation/tolerances.md
```

A skill like this runs four ways, and the four are worth distinguishing. Invoked deliberately, when someone asks for it. Embedded, where a producing procedure ends by running its own checks before it is allowed to report the work done. Chained, where one skill calls others in sequence. And gating, where the same procedure runs on every proposed change through continuous integration, whether or not anyone thought to ask.

The chained form is what makes the workflow itself encodable. A verify-stage skill that runs the unit check, then the conservation check, then the baseline comparison, in order, and reports what failed, is the verify stage written down — executed the same way by every session and every collaborator, whoever happens to be prompting. Framing checklists and critique rubrics can get the same treatment: the stages of the workflow are themselves procedures, and procedures are what skills hold. A chain that runs every check on every change costs real compute, so tune one by hand before gating anything on it.

The best skills end by asserting something falsifiable. A skill that runs a computation and prints the output leaves the judgment to whoever is watching; a skill that runs the computation and fails loudly when a bound is violated is a validation loop in executable form.

## Access to real systems

Skills consume access. A validation skill that cannot reach the actual data answers from recall, and recall is where hallucinated APIs, datasets, and physics come from. Typed access to outside systems — today standardized as MCP servers — is the structural answer: the agent asks the actual catalog what the variable's units attribute says, queries the actual API, reads the actual file, instead of producing the answer that looks like the answer.

For scientific work, four design choices do most of the good:

- **Read-only by default.** Grant write access per task, not per project. Most validation needs only to look.
- **Expose questions, not shells.** An interface that answers "what are the dimensions of this variable" is checkable; an interface that runs arbitrary commands is a second implementation surface to audit.
- **Return provenance with data.** Dataset version, retrieval time, source identifier — carried alongside every answer, so the decision record gets its trail without anyone assembling it by hand.
- **Scope the credentials.** An agent's access should look like the access you would give a new student on their first day, not like your own.

## The agents themselves

An agent is shaped by three things: its role, its context, and its tools. Structural guidance for agents is mostly the discipline of keeping those three matched.

- **One role per agent.** The agent that implements should not be the agent that judges the implementation. That isolation is what makes the critique and verify stages mean something, for the reason [context discipline](/scientific-agentic-engineering/framework/principles/#context-discipline) sets out.
- **Fresh context for critics.** The reviewing agent gets the plan or the diff, not the conversation that produced it.
- **Tools matched to role.** A reviewer needs to read; it rarely needs to write, and it never needs to deploy. Granting every agent every tool converts each one into a full-surface risk for no gain in capability.

There is also a temptation worth naming: more agents is not more rigor. Every additional agent is another context to keep honest and another output to verify. Add one when isolation buys you a check you cannot get otherwise — a critic with no memory of the reasoning, parallel work that must not share state — and not because an org chart of agents feels like a team.

## Where each stage lives

Putting the chapters together: **frame** is served by the project file and memory, which hold the constraints and conventions a frame must not violate; **plan** and **critique** by agent shape, which keeps a plan's reviewer independent of its author; **implement** by skills and enforced boundaries, which bound what a session can quietly do; **verify** by skills backed by real-system access, so checks run against the actual data and can actually fail; and **recording** by provenance the tooling returns as a side effect of doing the work. The gates are named once, in the project file, and interrupt whichever stage they fall in.

That mapping is where things live today, and "today" is doing real work in the sentence: each model generation moves the line between what has to be written down and what the model brings on its own. Expect to move safeguards up the stack, and to delete lines, as it shifts. What does not change is the smallest viable version — one person in a chat window with a lean project file, a directory of check scripts that fail loudly, and the discipline to read real data instead of letting the model remember it. The structure scales up from there. The [pattern catalog](/scientific-agentic-engineering/framework/patterns/) breaks the same material into practices you can adopt one at a time.
