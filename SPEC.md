# Legacy Revival Studio Specification (v0.2)

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

```text
/raw/
    original source snapshots

/runtime/
    dockerized execution environments

/analysis/
    dependency reports
    compatibility checks

/migration/
    modernization patches

/docs/
    recovery notes
```

---

## Preservation Rules

Always preserve:

- original source code
- original database dumps
- original configuration
- original file structure

Never overwrite original artifacts.

All modifications must remain reversible.

---

## Recovery Workflow

### Step 1: Artifact Collection

Collect all original materials:

- source code
- database dumps
- deployment files
- screenshots
- documentation

---

### Step 2: Runtime Restoration

Make the original system runnable locally.

Preferred methods:

- Docker
- isolated virtual environments
- version pinning

---

### Step 3: Behavioral Documentation

Document how the original system behaves:

- key workflows
- expected outputs
- visible UI behavior
- known failures

---

### Step 4: Compatibility Repair

Apply minimal fixes required for execution.

Examples:

- dependency updates
- runtime shims
- configuration patches

Avoid unnecessary redesign.

---

### Step 5: Optional Modernization

Modernize only where beneficial:

- framework upgrades
- deployment simplification
- maintainability improvements

Original behavior should remain recognizable.

---

## Success Definition

A system is considered revived when:

- it starts successfully
- core functions work
- data remains intact
- behavior is documented
- recovery steps are reproducible

---

# 2. Tooling

Preferred tools:

- Git
- GitHub
- Docker
- Python
- SQL tools
- static analyzers
- AI-assisted code analysis

Principles:

- human-guided
- AI-assisted
- Git-preserved

---

# 3. Studio Website Architecture

The public website (`etern.co.kr`) presents the Legacy Revival Studio philosophy and portfolio.

---

## Site Structure

```text
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
```

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

---

# 4. Static Site Generation & SEO Architecture

The website uses static prerendering for SEO.

Search engines must be able to read meaningful HTML without executing JavaScript.

---

## Technical Stack

- Vite
- React
- static prerender generation
- GitHub Pages deployment

---

## Build Pipeline

### Client build

```bash
npx vite build --outDir dist/client
```

---

### SSR build

```bash
npx vite build --ssr src/entry-server.jsx --outDir dist/server
```

---

### Prerender

```bash
node prerender.js
```

This generates route-specific static HTML files.

Example:

```text
dist/index.html
dist/projects/index.html
dist/philosophy/index.html
dist/en/index.html
dist/en/projects/index.html
```

---

## Language Structure

- `/` → Korean
- `/en` → English

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

---

## Search Engine Artifacts

Generated support files:

- `public/sitemap.xml`
- `public/robots.txt`

---

## Maintenance Boundary

When pages are added or modified:

- update source files
- update `prerender.js`
- update `public/sitemap.xml`
- rebuild
- validate generated HTML

Never edit `dist/` manually.

`dist/` is generated output only.
