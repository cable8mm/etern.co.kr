# AGENTS.md

## Project Identity

Title (English): **Legacy Revival Studio**

Description (English):

A project dedicated to reviving old software, preserving digital artifacts, and modernizing legacy systems while respecting their original intent.

Title (한글): **레거시 리바이벌 스튜디오**

Description (한글):

오래된 웹사이트와 시스템을 복원하고 다시 살아 움직이게 합니다.

---

## Read before making any changes

Read these files in this order:

1. `docs/chatgpt-context.md`
2. `README.md`
3. `SPEC.md`
4. `IDEAS.md`

Do not begin implementation before understanding the project philosophy.

---

## Working Principles

### Preserve before replacing

Prefer improving existing code over rewriting it.

Do not remove historical artifacts unless explicitly instructed.

---

### Minimal and reversible changes

Prefer small, incremental modifications.

Avoid large refactors unless necessary.

Explain major architectural changes before implementing them.

---

### Respect original intent

This project is not about redesigning history.

It is about helping old software live again.

Preserve original structure and spirit whenever possible.

---

### Archive-first mindset

Documentation matters.

Code comments matter.

Historical context matters.

Whenever making meaningful changes, document why.

---

### Favor durable technologies

Choose technologies and patterns that are likely to remain maintainable over time.

Prefer simplicity over novelty.

---

## Protected Areas

Unless explicitly instructed, do not:

- rewrite the routing architecture
- replace the build system
- migrate away from Vite
- replace static prerender architecture
- convert the project into a full SSR framework
- remove historical project records
- rename stable public URLs

Preserve backward compatibility whenever possible.

---

## Generated Build Boundary

`dist/` is generated output only.

Never use generated files inside `dist/` as implementation context.

Always trace issues back to source files.

Never manually edit generated HTML files.

---

## Philosophy Overrides

When optimization conflicts with preservation,
preservation takes priority.

When modernization conflicts with historical behavior,
historical behavior takes priority unless explicitly instructed otherwise.

Revive first.

Rewrite only when necessary.

---

## Forbidden Marketing Language

Avoid phrases such as:

- cutting-edge
- revolutionary
- next-generation
- world-class
- disruptive
- innovative platform
- best-in-class
- premium engineering

Prefer calm technical language.

The tone should feel archival,
measured,
and technically grounded.

---

## Code Formatting

After making any changes to the codebase, always execute:

```bash
npm run format
```

to ensure style consistency across all modified files.

---

## Development Workflow

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build static site:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Always verify prerendered HTML output after:

- SEO changes
- metadata changes
- routing changes
- i18n structure changes

---

## Project Media & Thumbnail Guidelines

When a user adds a new project with a raw screenshot image in the workspace (e.g., under `docs/projects/assets/`), the AI agent must automatically process it into a concept-matching, premium museum-style archival thumbnail and save it inside:

```text
public/images/[key]-thumb.png
```

### Archival Design Concept

- Landscape aspect ratio (`16:10`)
- Museum-style presentation
- Realistic retro-modern device chassis
- Soft archival background tones
- Minimal technical metadata labels
- Preserve historical feel
- Remove raw temporary screenshots after processing

---

## Translation & Localization (i18n) Rules

This project uses `react-i18next` for internationalization.

### Locale File Locations

- `src/locales/ko.json`
- `src/locales/en.json`

---

### Structural Parity

Both locale files must maintain exact structural parity.

Do not remove keys from one language only.

---

### Technical Term Preservation

Do not transliterate technical stack names into Korean.

Correct examples:

- Laravel
- Docker
- MySQL
- CakePHP 2
- Objective-C

Incorrect examples:

- 라라벨
- 도커
- 마이에스큐엘

---

## Project Data Schema (`project_data.[slug]`)

Each project record must contain:

- `title`
- `status`
- `summary`
- `figCaption`
- `facts`
- `notes`

### Standardized Facts Order

1. Original stack
2. Failure mode
3. Recovery actions
4. Final outcome

---

## Project Markdown Synchronization Rules

Markdown project files located at:

```text
docs/projects/[slug].md
```

serve as the primary source of truth.

Agents must synchronize project data into:

- `ko.json`
- `en.json`

while preserving schema consistency.

---

## URLs and External Links

External URLs and repository links must remain identical across all locales.

Never localize URLs.

---

## Writing Tone Guide

### Legacy Revival Studio Voice

Quiet technical confidence.

Write like an engineer documenting careful restoration work.

Not like a marketer promoting a startup.

Avoid hype.

Avoid exaggerated claims.

Prefer calm, precise language.

---

### Preferred Language

Prefer:

- revive
- restore
- preserve
- recover
- reconstruct
- make runnable again

Avoid:

- disrupt
- revolutionize
- transform everything
- rebuild from scratch
- replace everything

---

### Respect legacy systems

Treat old systems as valuable technical artifacts.

Legacy systems may contain:

- business logic
- historical records
- operational knowledge
- irreplaceable data

---

### Be technically concrete

Prefer specific descriptions:

- PHP 5 → PHP 8 migration
- dependency repair
- Dockerized runtime reconstruction
- database recovery

Avoid vague marketing phrases.

---

### Short, measured sentences

Prefer concise declarative writing.

Example:

Software should not disappear because technology changes.

Legacy systems can often be restored.

Revive first. Rewrite only when necessary.

---

### Archive-style documentation

Preferred labels:

- Original stack
- Failure mode
- Recovery actions
- Final outcome

Tone should feel historical and technical.

---

### Humility over promotion

Do not oversell.

Avoid:

- world-class
- industry-leading
- best-in-class
- premium platform

Let the work speak for itself.

---

## Current Mission

Transform `etern.co.kr` into the public home of Legacy Revival Studio.

Goals:

- preserve calm visual design
- communicate software preservation philosophy
- maintain technical credibility
- preserve build/deployment architecture
- support multilingual archival presentation

---

## Response Behavior

### Clarification Rule

Do not proceed on assumptions.

If uncertainty exists:

1. summarize understanding
2. propose implementation plan
3. ask for clarification before major changes

When uncertain, ask rather than assume.

---

## Ignore Generated Artifacts

The `dist/` directory is generated output only.

Do not use it as source context.

Always work from source files.

---

## Static Site Generation (SSG) Rules

This project uses static prerendering for SEO.

Do not treat the site as a pure SPA.

Search engines must be able to read meaningful HTML without executing JavaScript.

---

### Preferred Stack

Preserve current architecture:

- Vite
- React
- static prerender generation
- GitHub Pages deployment

Do not migrate to:

- Next.js
- Nuxt.js
- full SSR frameworks

---

### Required Prerender Coverage

Korean routes:

- `/`
- `/projects`
- `/services`
- `/philosophy`
- `/about`

English routes:

- `/en`
- `/en/projects`
- `/en/services`
- `/en/philosophy`
- `/en/about`

---

### Metadata Requirements

Every public route must statically render:

- page title
- meta description
- canonical URL
- Open Graph tags
- Twitter Card tags
- hreflang links
- JSON-LD structured data

---

### Verification Workflow

After SEO-related changes:

1. run `npm run build`
2. inspect generated files in `dist/`
3. verify:
   - prerendered HTML exists
   - correct metadata exists
   - canonical URLs are correct
   - hreflang links are correct
   - Open Graph tags exist
   - structured data exists

---

## Future Documentation Scaling

As the project grows, operational guides may move into:

```text
docs/agents/
    philosophy.md
    seo.md
    localization.md
    media.md
    recovery-workflow.md
```

`AGENTS.md` remains the primary high-level instruction file.
