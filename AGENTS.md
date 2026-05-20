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

## Translation & Localization (i18n) Rules

This project uses `react-i18next` for internationalization. Translators and AI agents must follow these rules strictly to ensure correct behavior and rendering.

### Locale File Locations

- Korean translations: `src/locales/ko.json`
- English translations: `src/locales/en.json`

### Structural Parity & Key Matching

- Both locale files must maintain **exact structural parity**. Every key, object, and array structure present in one file must also exist in the other with the identical key name and nesting.
- If a translation is missing, do not omit the key; use a placeholder, the original text, or a fallback.

### Key Naming Conventions

- Top-level components and page-wide blocks should use lowercase snake_case (e.g. `studio_metrics`, `before_after`, `core_principle`, `project_preview`, `project_grid`, `projects_page`).
- Nested keys should be logical and match existing patterns.

### Project Data Schema (`project_data.[slug]`)

Each project record in `project_data` (e.g. `project_data.aipro`, `project_data.holapet`) must conform to the following schema:

- `title` (String): Translated title of the project.
- `status` (String): Translated restoration status (e.g., "복원 완료" in `ko.json` vs "Revived" or "Converted" in `en.json`).
- `summary` (String): Translated brief summary of the project.
- `figCaption` (String): Figure caption matching the format `[Fig X. [English Title] [Device Chassis Type/Media type] [Snapshot/Screenshot/Mobile Screenshot], [Year]]` (e.g., `[Fig 1. Smart Logistics WMS System Revived Dashboard Snapshot, 2026]`).
- `facts` (Array of objects): Key-value pairs containing technical specs. Must contain exactly 5 standardized items in this order:
  1. `원본 기술 환경` (Korean) / `Original Stack` (English)
  2. `장애 상태` (Korean) / `Problem` (English)
  3. `복원 작업` (Korean) / `Recovery` (English)
  4. `복원 결과` (Korean) / `Outcome` (English)
  5. `현재 상태` (Korean) / `Status` (English)
- `notes` (Array of Strings): Bulleted details of recovery, optimization, and modernization.

### Project Markdown to i18n Sync Rules

Project Markdown files located in `docs/projects/[slug].md` serve as the primary source of truth in Korean. When a markdown file is created or updated, agents must sync the data to the locale JSON files using direct translation.

#### 1. File Metadata Mapping

- **`프로젝트 영문: key [slug]`**: Determines the JSON object key name under `project_data.[slug]` (e.g., `aipro`).
- **`프로젝트 제목`**: Maps to `title` (Korean in `ko.json`, professionally translated to English in `en.json`).
- **`한 줄 요약`**: Maps to `summary` (Korean in `ko.json`, translated to English in `en.json`).
- **`현재 상태`**: Maps to `status` (e.g. "복원 완료" in `ko.json` vs "Revived" or "Converted" in `en.json`).
- **`이미지 파일명`**: Refers to the original media. This must trigger the processing of the raw screenshot to standard archival thumbnail `public/images/[slug]-thumb.png` (using `16:10` aspect ratio and a device chassis) as described in _Project Media & Thumbnail Guidelines_.

#### 2. Project Facts Mapping

The 5 metadata bullet points in the markdown file map directly to the 5-item `facts` array in the JSON schema. Standardize the labels and translate the values cleanly:

| Markdown Bullet             | Korean `facts` Object (`ko.json`)                   | English `facts` Object (`en.json`)                             |
| :-------------------------- | :-------------------------------------------------- | :------------------------------------------------------------- |
| `- 원본 기술 환경: [value]` | `{ "label": "원본 기술 환경", "value": "[value]" }` | `{ "label": "Original Stack", "value": "[translated value]" }` |
| `- 장애 상태: [value]`      | `{ "label": "장애 상태", "value": "[value]" }`      | `{ "label": "Problem", "value": "[translated value]" }`        |
| `- 복원 작업: [value]`      | `{ "label": "복원 작업", "value": "[value]" }`      | `{ "label": "Recovery", "value": "[translated value]" }`       |
| `- 복원 결과: [value]`      | `{ "label": "복원 결과", "value": "[value]" }`      | `{ "label": "Outcome", "value": "[translated value]" }`        |
| `- 현재 상태: [value]`      | `{ "label": "현재 상태", "value": "[value]" }`      | `{ "label": "Status", "value": "[translated value]" }`         |

_Note: Technical names (e.g. `PHP 7.3`, `MySQL 5.7`, `CakePHP 2`, `Laravel Nova`) must remain untranslated in both languages._

#### 3. Recovery Notes (`notes`) Mapping

The nested bullets under `- 복구 노트 내용:` map to the `notes` array of strings:

- Strip out list indices (e.g. change `1. 데이터베이스 설계\n - 과거 사이트에서는...` into a clean, concise, self-contained bullet point).
- Compile sub-bullets or nested descriptions into direct, robust sentences.
- Make sure every bullet in Korean is matched by an elegant, professional technical translation in English.
- If a note contains a markdown link (e.g., `[전용 툴](https://github.com/cable8mm/xeed)`), preserve the exact same link structure and URL target in both languages.

### Technical Term Preservation

- Do not write phonetic transliterations in Korean for standard technical tools, languages, frameworks, or databases. Keep their original English/Latin spelling in both locale files.
  - **Correct**: `Laravel`, `MySQL`, `Docker`, `CakePHP 2`, `Objective-C`
  - **Incorrect**: `라라벨`, `마이에스큐엘`, `도커`, `케이크PHP`
- Standard nouns, pricing notes, and status labels must be translated naturally (e.g., "By consultation" -> "상담 후 결정", "Original Stack" -> "과거 스택").

### URLs and External Redirections

- Any reference URLs or repository links (e.g. `https://github.com/cable8mm/xeed`) must remain identical in both files to ensure correct links across locales.

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
