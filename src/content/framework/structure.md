---
title: "Structuring the workflow"
description: "Where the safeguards live — shaping standing instructions, skills, access to real systems, and the agents themselves so every stage of the loop has something concrete to run."
order: 5
draft: false
---

# Structuring the workflow

[The loop](/scientific-agentic-engineering/framework/the-loop/) says what happens at each stage. This chapter is about where those things live. A workflow gives you four places to put structure — the project's standing instructions, the procedures an assistant can run, its access to real systems, and the shape of the agents themselves — and a safeguard that lives in one of them survives long sessions, new collaborators, and ordinary forgetting. A safeguard that lives in somebody's habits does not.

The four go by different names in every current ecosystem, and the names will not last. The functions will, so the chapter is organized around the functions, with today's names noted as examples.

## Standing instructions

Most current assistants read a project instruction file before starting work — a plain-text file, versioned with the code, that every session begins from. It is the cheapest structural safeguard there is: written once, applied every session, whether or not anyone remembers to mention it.

What belongs in it is exactly what you would otherwise repeat at the start of every conversation, and what it would be costly for a session to not know:

- **Domain conventions** — the units convention, the coordinate system, the tolerances that count as passing, the datasets that are authoritative.
- **Constraints** — what must never be regenerated, which directories are off limits, which results are frozen.
- **The gates** — the actions that always require a human decision, named in advance so the assistant stops for them rather than discovering them mid-task.

Standing instructions bloat the way contexts do, and for the same reason: adding a line is easy and removing one requires a decision. The file is read at the start of every session, so every line taxes all of them. Keep it short enough that a new collaborator would actually read it, and treat a line that no longer earns its place as a bug.

## Skills: procedures with a home

A skill is a written procedure the assistant can invoke by name — today's ecosystems variously call these skills, commands, or recipes. The mechanism matters less than the property: the procedure is written down, versioned, and runs the same way every time, instead of being improvised from memory in each session.

That property is what validation loops need. "Run the conservation check," "validate units across this interface," "rebuild the error statistics and compare against the frozen baseline" — each of these is a check that should exist once, as a procedure, rather than being reconstructed on request and slightly differently each time. Encapsulating a domain check as a skill is how it stops depending on whoever happens to be prompting.

The best skills end by asserting something falsifiable. A skill that runs a computation and prints the output leaves the judgment to whoever is watching; a skill that runs the computation and fails loudly when a bound is violated is a validation loop in executable form.

## Access to real systems

An agent that cannot reach a real system answers from recall, and recall is where hallucinated APIs, datasets, and physics come from. Typed access to outside systems — today standardized as MCP servers — is the structural answer: the agent asks the actual catalog what the variable's units attribute says, queries the actual API, reads the actual file, instead of producing the answer that looks like the answer.

For scientific work, four design choices do most of the good:

- **Read-only by default.** Grant write access per task, not per project. Most validation needs only to look.
- **Expose questions, not shells.** An interface that answers "what are the dimensions of this variable" is checkable; an interface that runs arbitrary commands is a second implementation surface to audit.
- **Return provenance with data.** Dataset version, retrieval time, source identifier — carried alongside every answer, so the record stage of the loop gets its trail without anyone assembling it by hand.
- **Scope the credentials.** An agent's access should look like the access you would give a new student on their first day, not like your own.

## The agents themselves

An agent is shaped by three things: its role, its context, and its tools. Structural guidance for agents is mostly the discipline of keeping those three matched.

- **One role per agent.** The agent that implements should not be the agent that judges the implementation. This is not etiquette; it is the isolation that makes the critique and verify stages mean something. A reviewer that shares the author's context inherits the author's blind spots.
- **Fresh context for critics.** The reviewing agent gets the plan or the diff — not the conversation that produced it. The value of a critic is exactly what it arrives without.
- **Tools matched to role.** A reviewer needs to read; it rarely needs to write, and it never needs to deploy. Granting every agent every tool converts each one into a full-surface risk for no gain in capability.

There is also a temptation worth naming: more agents is not more rigor. Every additional agent is another context to keep honest and another output to verify. Add one when isolation buys you a check you cannot get otherwise — a critic with no memory of the reasoning, parallel work that must not share state — and not because an org chart of agents feels like a team.

## Where each stage lives

Putting the two chapters together: **frame** is served by standing instructions, which hold the constraints a frame must not violate; **plan** and **critique** by agent shape, since a fresh context is what makes review of a plan an actual check rather than a re-reading; **implement** by skills and scoped permissions, which bound what a session can quietly do; **verify** by skills backed by real-system access, so checks run against the actual data and can actually fail; **gate** by the standing list of actions that require a human decision; and **record** by provenance that the tooling returns as a side effect of doing the work.

None of this requires a particular vendor, and most of it does not require agents at all. The smallest viable version is one person in a chat window with a project instruction file, a directory of check scripts that fail loudly, and the discipline to paste in real data instead of letting the model remember it. The structure scales up from there; the functions do not change. The [pattern catalog](/scientific-agentic-engineering/framework/patterns/) breaks the same material into practices you can adopt one at a time.
