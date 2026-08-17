# Scientific Agentic Engineering

## Project

2026 BSSw Fellowship project by Victor Weeks (NSF NCAR). Developing methodology for integrating AI agents into scientific software workflows.

**Architecture**: Bare Astro + Tailwind CSS + Pagefind + Content Collections. No Starlight governance. Quarto used only for interactive notebook tutorials (M2+). Each milestone extends the component library — the site grows incrementally from a simple foundation.

**Plan**: See `docs/plan.md` for the current implementation plan with milestone roadmap and file details.

## Sensitive Content — DO NOT COMMIT

The SOW document lives one directory up (`../2026_BSSw-SOW_VictorWeeks_revised_20260212.docx`). Never reference specific financial amounts, SOW text, or budget details in any committed file. The `.gitignore` blocks `*.docx`, `SOW*`, `budget*`, etc., but remain vigilant.

## Development Log (`docs/development-log.md`)

This file transparently records how AI-assisted development was used to build this project. It is a **pedagogical artifact** — the site is about responsible AI-assisted development, and the log demonstrates that methodology in practice.

### When to update the development log

Update the log after **every significant interaction** — defined as any interaction that:
- Makes an architectural or design decision
- Creates, modifies, or deletes files in the repo
- Involves research that informed a decision
- Surfaces a pattern worth documenting (AI behavior, human override, quality issue)
- Results in a rejected approach (failed attempts are as educational as successes)

Do NOT log routine, mechanical actions (typo fixes, formatting, etc.) unless they reveal something interesting.

### How to update the development log

1. **Append a new entry** at the end of the current session section, before the "Template for Future Entries" section
2. **Use the template** from the bottom of the log file:
   - `### Interaction N: [Title]` — increment N from the last entry
   - `**Human prompt (paraphrased):**` — what was asked (paraphrase, do not copy verbatim)
   - `**What the AI did:**` — tools used, agents launched, files created/modified
   - `**Key findings/output:**` — what was produced or discovered
   - `**Human decisions:**` — what the human chose, modified, or rejected
   - `**Observation:**` — what this reveals about AI-assisted development
3. **Start a new session section** (`## Session N — YYYY-MM-DD: [Theme]`) when the conversation is a new Claude Code session
4. **Be honest** about AI missteps, over-engineering, and human corrections — these are the most pedagogically valuable entries
5. **Update the "Patterns Observed" section** when a new pattern emerges across multiple interactions

### Tone

Write as a neutral technical observer, not as marketing. The log should read like a well-kept lab notebook: factual, specific, reflective. Attribute decisions clearly — who decided what and why.

## Milestones

- **M1** (due July 2026): Landing page + Framework document layout + Framework draft
- **M2** (due Oct 2026): Catalog + Tutorial layouts, Quarto/Pyodide integration, US-RSE'26
- **M3** (due Jan 2027): Failure mode exhibits + Full tutorial series
- **M4** (due April 2027): Workshop recordings, HPC webinar, BSSw.io blog post

## Required Funding Statements

**Acknowledgement statement** — must appear verbatim (no paraphrasing) in the site footer (all pages) and on the About page, and in any other published content (README, papers, slides, posters, etc.) produced for this project:

> This work was supported by the Better Scientific Software Fellowship Program, a collaborative effort of the U.S. Department of Energy (DOE), Office of Advanced Scientific Research via ANL under Contract DE-AC02-06CH11357 and the National Nuclear Security Administration Advanced Simulation and Computing Program via LLNL under Contract DE-AC52-07NA27344; and by the National Science Foundation (NSF) via SHI under Grant No. 2435328.

**Disclaimer** — must accompany the acknowledgement statement in all published content **except** articles or papers published in scientific, technical, or professional journals:

> Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the DOE or NSF.

When adding a new page, document, or deliverable, include both (acknowledgement always; disclaimer unless it's journal-published) rather than assuming the footer alone covers it — standalone documents (PDFs, slide decks, the milestone report) need their own copy.

## Conventions

- **Licensing**: Content is CC-BY-4.0 (`LICENSE-CONTENT`), code is MIT (`LICENSE-CODE`)
- **BSSw acknowledgment**: See "Required Funding Statements" above — exact wording required, not a paraphrase
- **Component naming**: PascalCase `.astro` files in `src/components/`
- **Content Collections**: Typed schemas in `src/content/config.ts`, one collection per deliverable type
- **Commit style**: Focused commits; split foundation/structure/CI into separate commits
