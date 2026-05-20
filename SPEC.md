# Legacy Revival Studio Specification (v0.3)

## Goal

Restore legacy software systems safely, reproducibly, and respectfully.

Legacy Revival Studio exists to revive old software, preserve digital artifacts, and modernize legacy systems while respecting their original intent.

The project combines:

- archival preservation
- reproducible recovery
- minimal modernization
- AI-assisted technical analysis
- Git-based change tracking

---

# 1. Revival System Architecture

## Repository Structure

Each revival project should follow a preservation-oriented repository structure.

Example:

~~~text
/raw/
    original source snapshots
    untouched artifacts

/runtime/
    dockerized execution environments
    local runtime configuration

/analysis/
    dependency reports
    compatibility checks
    reverse engineering notes

/migration/
    modernization patches
    compatibility shims

/docs/
    recovery notes
    architecture documentation
    restoration logs

/archive/
    screenshots
    original binaries
    exported references
~~~

The repository itself functions as both:

- a restoration workspace
- a historical archive

Original artifacts must remain preserved permanently.

---

## Preservation Rules

Always preserve:

- original source code
- original database dumps
- original configuration
- original file structure
- historical runtime assumptions

Never overwrite original artifacts.

All modifications must remain:

- reversible
- traceable
- documented

Prefer additive recovery over destructive rewriting.

---

## Recovery Workflow

### Step 1: Artifact Collection

Collect all original materials:

- source code
- database dumps
- deployment files
- screenshots
- documentation
- archived binaries
- environment information

Preserve original timestamps whenever possible.

---

### Step 2: Runtime Restoration

Make the original system runnable locally.

Preferred methods:

- Docker
- isolated virtual environments
- runtime emulation
- version pinning

The first milestone is not modernization.

The first milestone is successful execution.

---

### Step 3: Behavioral Documentation

Document how the original system behaves:

- key workflows
- expected outputs
- visible UI behavior
- operational assumptions
- known failures

Capture screenshots and runtime logs whenever possible.

---

### Step 4: Compatibility Repair

Apply minimal fixes required for execution.

Examples:

- dependency updates
- runtime shims
- polyfills
- configuration patches
- database compatibility fixes

Avoid unnecessary redesign.

Avoid altering historical behavior unless required for stability or security.

---

### Step 5: Optional Modernization

Modernize only where beneficial.

Examples:

- framework upgrades
- deployment simplification
- maintainability improvements
- security hardening
- CI/CD integration

Original behavior should remain recognizable.

Modernization must not erase system identity.

---

## Success Definition

A system is considered revived when:

- it starts successfully
- core functions work
- data remains intact
- historical behavior is preserved
- recovery steps are reproducible
- future maintenance becomes possible

---

# 2. Tooling

Preferred tools:

- Git
- GitHub
- Docker
- Node.js
- PHP
- Python
- SQL tools
- static analyzers
- AI-assisted code analysis

Principles:

- human-guided
- AI-assisted
- Git-preserved
- minimally invasive
- reproducible

AI should assist investigation and recovery,
not blindly rewrite systems.

---

# 3. Studio Website Architecture

The public website (`etern.co.kr`) presents the Legacy Revival Studio philosophy and portfolio.

The website itself should reflect the studio philosophy:

- minimal
- archival
- technical
- durable
- content-first

---

## Site Structure

~~~text
/
    Homepage (Korean)

/projects
    Revival portfolio archive

/projects/:slug
    Individual project details

/services
    Services and engagement

/philosophy
    Archive-first philosophy

/about
    Studio background

/contact
    Contact information

/en
    Homepage (English)

/en/projects
/en/services
/en/philosophy
/en/about
~~~

---

## Project Documentation Model

Each project page should document:

- original stack
- failure mode
- recovery actions
- preservation concerns
- modernization scope
- final outcome

Projects should read like technical restoration records,
not marketing case studies.

---

## Services Model

The studio communicates available work through service categories rather than fixed pricing.

### Legacy Review

Quick technical review of an old codebase.

---

### Revival Assessment

Feasibility analysis and restoration planning.

---

### Code Modernization

Targeted modernization while preserving original behavior.

---

### Full Revival Project

End-to-end restoration and redeployment.

---

Pricing should remain consultation-based:

- By consultation
- Scope dependent
- Project-based engagement

Avoid commodity-style pricing presentation.

---

# 4. Static Site Generation & SEO Architecture

The website uses static prerendering for SEO.

Search engines must be able to read meaningful HTML without executing JavaScript.

---

## Technical Stack

- Vite
- React
- static prerender generation
- react-i18next
- GitHub Pages deployment

---

## Build Pipeline

### Client build

~~~bash
npx vite build --outDir dist/client
~~~

---

### SSR build

~~~bash
npx vite build --ssr src/entry-server.jsx --outDir dist/server
~~~

---

### Prerender

~~~bash
node prerender.js
~~~

This generates route-specific static HTML files.

Example:

~~~text
dist/index.html
dist/projects/index.html
dist/philosophy/index.html
dist/en/index.html
dist/en/projects/index.html
~~~

---

## Language Structure

- `/` → Korean
- `/en` → English

English should remain the primary indexing language for international discoverability.

Korean content exists for local accessibility.

---

## Translation Files & Architecture

Translation dictionaries are located at:

- `src/locales/ko.json`
- `src/locales/en.json`

Requirements:

- both dictionaries must remain structurally identical
- keys must never drift
- dynamic arrays must preserve consistent data structures
- missing translations must fail visibly during development

The UI loads translations using:

- `react-i18next`
- `i18next-browser-languagedetector`

Language detection should prioritize URL path prefixes.

---

## Project Data Synchronization

Project records located inside:

~~~text
docs/projects/[slug].md
~~~

serve as the canonical source of truth.

Public website translation entries under:

~~~text
project_data.[slug]
~~~

must remain synchronized with project documents.

Synchronization rules and transformation policies are documented in:

~~~text
AGENTS.md
~~~

---

## Metadata Requirements

Every public route must include:

- page title
- meta description
- canonical URL
- Open Graph metadata
- Twitter Card metadata
- hreflang alternate links
- JSON-LD structured data

Metadata should prioritize:

- clarity
- archival identity
- technical credibility

Avoid exaggerated marketing language.

---

## Search Engine Artifacts

Generated support files:

- `public/sitemap.xml`
- `public/robots.txt`

Recommended additions:

- structured project schema
- Open Graph preview images
- project-specific metadata

---

## Maintenance Boundary

When pages are added or modified:

- update source files
- update prerender routes
- update sitemap
- rebuild
- validate generated HTML
- validate metadata output

Never edit `dist/` manually.

`dist/` is generated output only.

---

# 5. Engineering Philosophy

Legacy Revival Studio follows several core beliefs:

## Software Has Historical Value

Old systems are operational artifacts.

They contain:

- organizational memory
- undocumented workflows
- historical assumptions
- accumulated business logic

Destroying them carelessly destroys knowledge.

---

## Running Software Matters More Than Perfect Software

A runnable imperfect system is often more valuable than a rewritten replacement that loses historical behavior.

---

## Preservation Before Reinvention

Revival work begins with understanding.

Not replacement.

Not abstraction.

Not trend-driven rewrites.

---

## Minimalism Over Complexity

Prefer:

- small patches
- isolated fixes
- reversible changes
- transparent systems

Avoid unnecessary architectural complexity.

---

## AI as Restoration Assistance

AI is used as:

- an investigative assistant
- a compatibility analysis tool
- a documentation accelerator

Human judgment remains authoritative.
