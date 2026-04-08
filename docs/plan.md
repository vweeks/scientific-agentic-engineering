# Plan: Scientific Agentic Engineering — Repository & Website Scaffold

## Context

Victor Weeks is a 2026 BSSw Fellow at NSF NCAR developing "Scientific Agentic Engineering" — methodology for integrating AI agents into scientific software workflows. The project needs a professional, public-facing GitHub repo with an incrementally-built website. Git repo already initialized at `/Users/vweeks/NCAR/BSSw/scientific-agentic-engineering/`.

**Sensitive material constraint**: The SOW (`../2026_BSSw-SOW_VictorWeeks_revised_20260212.docx`) is one directory up. Budget, financial details, and SOW contents must never enter version control.

## Architecture Decision

**Bare Astro + Tailwind + Pagefind + Content Collections.** Not Starlight as a framework, not pure Quarto. Cherry-pick Starlight components where useful. Quarto's role is reduced to computational notebook rendering only (tutorials with Pyodide in later milestones).

**Why this architecture:**
- Each milestone extends the component library rather than bolting on new architectural patterns
- The site grows organically from a simple foundation into a rich resource
- Mirrors the methodology the fellowship teaches: principled, incremental, AI-assistable
- Maximum control — no framework opinions constraining layout or navigation
- Content Collections with typed schemas map cleanly to fellowship deliverables

**Milestone-aligned component growth:**
- **M1** (July 2026): Landing page layout + Framework document layout
- **M2** (Oct 2026): Catalog layout (community repo) + Tutorial layout (with Quarto/Pyodide)
- **M3** (Jan 2027): Failure mode exhibit layout + Full tutorial series
- **M4** (April 2027): Workshop recording layout

## Decisions

- **Repo**: `scientific-agentic-engineering` on Victor's personal GitHub
- **Framework**: Astro (bare, no Starlight governance)
- **Styling**: Tailwind CSS
- **Search**: Pagefind (static, framework-independent)
- **Content**: Astro Content Collections with typed schemas
- **Notebooks**: Quarto + Pyodide for interactive tutorials (M2+)
- **License**: Dual — `LICENSE-CODE` (MIT) + `LICENSE-CONTENT` (CC-BY-4.0)
- **Deployment**: GitHub Actions (Astro build → GitHub Pages)

---

## Implementation Steps

### Batch 0: Prerequisites

1. **Verify Node.js** is installed (`node --version`, need 18+)
2. **Create Astro project** via `npm create astro@latest` in the existing repo directory
3. **Add integrations**: `npx astro add tailwind`, add Pagefind
4. **Create GitHub repo**: `gh repo create scientific-agentic-engineering --public --source=. --remote=origin`

### Batch 1: Foundation (Commit 1 — "Initial project setup")

| File | Purpose |
|------|---------|
| `.gitignore` | Broad defensive patterns (*.docx, *.mov, SOW*, node_modules, dist, .astro) |
| `LICENSE-CODE` | MIT license, copyright 2026 Victor Weeks |
| `LICENSE-CONTENT` | CC-BY-4.0 full text |
| `README.md` | Badges (BSSw Fellow, licenses, website, CI), project overview, acknowledgment |
| `CITATION.cff` | CFF 1.2.0 with dual license, ORCID, keywords |
| `CONTRIBUTING.md` | How to contribute, dual license notice |

**Key `.gitignore` additions beyond Astro defaults:**
```
# Block sensitive/large file types broadly
*.docx  *.xlsx  *.pptx  *.mov  *.mp4  *.zip
SOW*  sow*  budget*  *statement*of*work*
```

### Batch 2: Astro Site Structure (Commit 2 — "Add Astro site with landing page")

**Astro project structure:**

```
scientific-agentic-engineering/
├── astro.config.mjs          # Astro config with Tailwind, site URL
├── tailwind.config.mjs       # Tailwind config
├── tsconfig.json             # TypeScript config (Astro default)
├── package.json              # Dependencies
│
├── src/
│   ├── content/
│   │   ├── config.ts         # Content Collection schemas (typed)
│   │   └── framework/        # M1: Framework documents (markdown)
│   │       └── _placeholder.md
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro  # HTML shell: head, meta, nav, footer
│   │   └── FrameworkLayout.astro  # M1: Layout for framework docs
│   │
│   ├── components/
│   │   ├── Nav.astro         # Top navigation bar
│   │   ├── Footer.astro      # Footer with BSSw acknowledgment + licenses
│   │   ├── Hero.astro        # Landing page hero section
│   │   └── FeatureCard.astro # Landing page feature cards
│   │
│   ├── pages/
│   │   ├── index.astro       # Landing page
│   │   ├── about.astro       # About Victor / fellowship
│   │   └── framework/
│   │       └── [...slug].astro  # Dynamic routes from content collection
│   │
│   └── styles/
│       └── global.css        # Tailwind directives + any global styles
│
├── public/
│   ├── favicon.svg           # Simple placeholder favicon
│   └── robots.txt            # Allow all crawlers
│
└── docs/
    └── development-log.md    # Already exists — meta-documentation
```

**Content Collection schema** (`src/content/config.ts`):
```typescript
import { defineCollection, z } from 'astro:content';

const framework = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    draft: z.boolean().default(false),
  }),
});

// Future collections added per-milestone:
// M2: tutorials, community (catalog items)
// M3: failure-modes
// M4: workshops

export const collections = { framework };
```

**Landing page** (`src/pages/index.astro`):
- Hero component: project title, one-line description, CTA button → Framework
- 4 FeatureCard components: Framework, Tutorials (coming M2), Community (coming M2), Workshops (coming M4)
- BSSw acknowledgment block
- Clean, minimal — Tailwind utility classes, no complex styling

**Nav component**: Home, Framework, About. Tutorials/Community/Workshops links added as milestones deliver them.

**Footer component**: © 2026 Victor Weeks | Content: CC-BY-4.0 | Code: MIT | Supported by the BSSw Fellowship Program

**After creating files**: `npm run dev` to verify local rendering.

### Batch 3: CI/CD (Commit 3 — "Add GitHub Actions deployment")

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | Astro build → GitHub Pages |

**GitHub Actions workflow:**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Post-push**: In GitHub repo Settings → Pages → Source: "GitHub Actions".

---

## Files Deferred to Later Milestones

| What | When | Why |
|------|------|-----|
| `FrameworkLayout.astro` content | M1 (July 2026) | Layout exists in scaffold; real content comes with framework draft |
| Tutorial layout + Quarto integration | M2 (Oct 2026) | Tutorials are M2 deliverable |
| Catalog layout (community repo) | M2 (Oct 2026) | Community repo launches at M2 |
| Pagefind integration | M2 (Oct 2026) | Not enough content to search until M2 |
| Failure mode exhibit layout | M3 (Jan 2027) | Failure modes documented at M3 |
| Workshop recording layout | M4 (April 2027) | Workshops happen at M4 |
| Quarto notebooks + Pyodide | M2 (Oct 2026) | Interactive tutorials are M2+ |
| `.devcontainer` | M2+ | No contributors yet |
| Pre-commit hooks | M2+ | No Python code yet |

---

## Milestone Component Roadmap

### M1 (July 2026): Foundation
**New components**: `Hero`, `FeatureCard`, `Nav`, `Footer`, `BaseLayout`, `FrameworkLayout`
**Content**: Framework draft documents in `src/content/framework/`
**Site sections live**: Home, Framework, About

### M2 (October 2026): Catalog + Tutorials
**New components**: `CatalogCard`, `CatalogLayout`, `TutorialLayout`, `CodeBlock` (Pyodide wrapper)
**New collections**: `tutorials`, `community`
**Integrations**: Pagefind for search, Quarto for notebook rendering
**Site sections live**: + Tutorials, + Community

### M3 (January 2027): Failure Modes + Full Tutorials
**New components**: `FailureModeExhibit`, `BeforeAfter` (comparison layout)
**New collection**: `failure-modes`
**Content**: Full tutorial series, failure mode visual documentation
**Site sections live**: + Failure Modes gallery

### M4 (April 2027): Workshops
**New components**: `WorkshopCard`, `VideoEmbed`, `WorkshopLayout`
**New collection**: `workshops`
**Content**: Workshop recordings, HPC webinar, BSSw.io blog post draft
**Site sections live**: + Workshops archive

---

## Verification

After each batch:

1. **Batch 1**: `git status` clean, no sensitive files. `grep -ri "SOW\|budget\|25,000" .` returns nothing
2. **Batch 2**: `npm run dev` → landing page renders at localhost, nav works, feature cards display, footer shows acknowledgment + licenses, dark mode if configured
3. **Batch 3**: Push → GitHub Actions succeeds → site live at Pages URL
4. **CITATION.cff**: GitHub shows "Cite this repository" on repo page
5. **Lighthouse**: Run accessibility audit on local dev server

---

## Critical Files

- `.gitignore` — First file created; broad defensive patterns prevent SOW leak
- `astro.config.mjs` — Central Astro config (site URL, integrations, output mode)
- `src/content/config.ts` — Content Collection schemas; typed foundation for all deliverables
- `src/layouts/BaseLayout.astro` — HTML shell shared by every page; nav, footer, meta
- `.github/workflows/deploy.yml` — Deployment automation; must use Pages v4 action pattern
- `src/pages/index.astro` — Landing page; first impression of the project
