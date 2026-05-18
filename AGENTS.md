# AGENTS.md

## Project Identity

This repository is for **Legacy Revival Studio**.

A project dedicated to reviving old software, preserving digital artifacts, and modernizing legacy systems while respecting their original intent.

---

## Read before making any changes

Read these files in this order:

1. `docs/chatgpt-context.md`
2. `README.md`
3. `SPEC.md`
4. `IDEAS.md`

Do not begin implementation before understanding the project philosophy.

---

## Working principles

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

### Project Media & Thumbnail Guidelines

When a user adds a new project with a raw screenshot image in the workspace (e.g., under `docs/projects/assets/`), the AI agent must automatically process it into a concept-matching, premium museum-style archival thumbnail and save it inside `public/images/[key]-thumb.png`.

**Archival Design Concept:**

- **Landscape Aspect Ratio**: Standardize on a strict `16:10` aspect ratio.
- **Museum Presentation**: Center the screenshot inside a realistic retro-modern device chassis (e.g., metallic/glass smartphone chassis for mobile screenshots, industrial minimalist monitor/screen chassis for web/desktop screenshots) set against a clean, soft, light-greenish gray (`#f5f7f4` or `#e9efe8`) background.
- **Archival Metadata**: Add clean, minimalist technical metadata labels at the bottom (e.g., "DIGITAL ARTIFACT: [Title] / VER X.Y.Z") or a realistic registry plate.
- **Clean Workspace**: Always delete raw, unprocessed vertical screenshots from the `/public/` directory after saving the finished `[key]-thumb.png` file to maintain a tidy codebase.

---

## Current task

Transform the existing `etern.co.kr` homepage into the **Legacy Revival Studio** homepage.

Goals:

- replace old branding
- preserve existing deployment/build setup
- maintain a calm, minimal visual design
- communicate the philosophy of software revival
- make the homepage feel archival, thoughtful, and technically credible

---

## Response behavior

Before editing:

1. summarize understanding
2. propose implementation plan
3. wait for confirmation if major structural changes are required

When uncertain, ask rather than assume.

---

## Ignore build artifacts

The `dist/` directory is a generated build output.

It is not source code.

Do not inspect, modify, or use `dist/` as project context unless explicitly asked.

Always work from source files only.
