# AGENTS.md

## Project Identity

Title(English): **Legacy Revival Studio**

Description(English):

A project dedicated to reviving old software, preserving digital artifacts, and modernizing legacy systems while respecting their original intent.

Title(한글): **레거시 리바이벌 스튜디오**

Description(한글):

오래된 웹사이트를 복원하고 다시 살아 움직이게 합니다.

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

## Project Media & Thumbnail Guidelines

When a user adds a new project with a raw screenshot image in the workspace (e.g., under `docs/projects/assets/`), the AI agent must automatically process it into a concept-matching, premium museum-style archival thumbnail and save it inside `public/images/[key]-thumb.png`.

### Archival Design Concept

- **Landscape Aspect Ratio**: Standardize on a strict `16:10` aspect ratio.
- **Museum Presentation**: Center the screenshot inside a realistic retro-modern device chassis (e.g., metallic/glass smartphone chassis for mobile screenshots, industrial minimalist monitor/screen chassis for web/desktop screenshots) set against a clean, soft, light-greenish gray (`#f5f7f4` or `#e9efe8`) background.
- **Archival Metadata**: Add clean, minimalist technical metadata labels at the bottom (e.g., `DIGITAL ARTIFACT: [Title] / VER X.Y.Z`) or a realistic registry plate.
- **Clean Workspace**: Always delete raw, unprocessed vertical screenshots from the `/public/` directory after saving the finished `[key]-thumb.png` file to maintain a tidy codebase.

---

## Current task

Transform the existing `etern.co.kr` homepage into the **Legacy Revival Studio** homepage.

### Goals

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

---

## SSG Guide Rules

This project uses **Static Site Generation (SSG)** for SEO.

Do not treat this site as a pure client-side React SPA.

Search engines must be able to read meaningful HTML without executing JavaScript.

### Core principle

SEO must exist in the generated HTML at build time.

Runtime-only metadata updates are not sufficient.

Do not rely only on:

- client-side `<Helmet>` updates
- JavaScript-injected meta tags
- SPA-only SEO behavior

Every important route must be prerendered into actual HTML files.

---

### Preferred architecture

Keep the current stack:

- Vite
- React
- GitHub Pages

Do not migrate to:

- Next.js
- Nuxt.js
- server-side rendering

Prefer static prerendering tools compatible with Vite, such as:

- `vite-plugin-ssg`
- `react-snap`

Choose the simplest durable approach.

---

### Required prerender coverage

Every public route must generate a real HTML file.

#### Korean

- `/`
- `/projects`
- `/services`
- `/philosophy`
- `/about`

#### English

- `/en`
- `/en/projects`
- `/en/services`
- `/en/philosophy`
- `/en/about`

### Expected output examples

- `dist/index.html`
- `dist/projects/index.html`
- `dist/services/index.html`
- `dist/en/index.html`
- `dist/en/projects/index.html`

---

### Metadata must be rendered statically

The generated HTML must already contain:

- `<title>`
- `meta description`
- canonical URL
- Open Graph tags
- hreflang links
- structured data (JSON-LD)

Do not assume crawlers will execute JavaScript.

---

### Verification workflow

After SEO-related changes:

1. run `npm run build`
2. inspect generated files inside `dist/`
3. verify:
   - correct prerendered HTML exists
   - correct page title
   - correct meta description
   - correct canonical
   - correct hreflang
   - correct Open Graph tags
   - structured data present

---

### Build output is for validation only

`dist/` is not source code.

Never edit generated HTML manually.

Always modify source files and regenerate.