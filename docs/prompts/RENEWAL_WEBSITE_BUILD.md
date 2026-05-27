You are a senior staff frontend engineer and information architect.

Your task is to redesign and rebuild the official ETERNOps website.

Before writing code, read ALL project documents and understand the business.

This is NOT a generic marketing website redesign.

This is a trust-building consulting website for existing production system modernization and migration projects.

==================================================
MANDATORY READING ORDER
==================================================

1.

AGENTS.md

1.

docs/marketing/LANDING_PAGE.md

1.

docs/marketing/SITE_MAP.md

1.

docs/company/_
docs/business/_
docs/marketing/\*

1.

docs/templates/\*
(only as reference for services and deliverables)

==================================================
ABSOLUTE RULES
==================================================

The documents above are the source of truth.

Do not invent:

- services
- offers
- process steps
- claims
- company history
- founder credentials
- pricing
- case studies

unless explicitly defined inside docs/.

If documents conflict:

1. AGENTS.md
2. BRAND.md
3. POSITIONING.md
4. LANDING_PAGE.md
5. everything else

==================================================
PROJECT OBJECTIVES
==================================================

The website must:

1.

Increase qualified consultation inquiries.

1.

Build institutional trust.

1.

Communicate ETERNOps positioning clearly.

1.

Show practical engineering expertise.

1.

Feel like a premium technical consulting firm.

NOT:

- startup
- SaaS
- agency
- freelancer portfolio

==================================================
TECH STACK
==================================================

Existing stack:

- React 19
- Vite
- Tailwind CSS v4
- i18next

Keep stack unchanged.

Do NOT introduce:

- Next.js
- Remix
- Gatsby
- MUI
- Chakra
- Bootstrap
- heavy animation libraries

==================================================
DESIGN DIRECTION
==================================================

Visual personality:

- calm
- authoritative
- minimal
- high trust
- enterprise consulting

Use:

- strong typography
- whitespace
- clean grids
- restrained colors

Avoid:

- gradients
- glassmorphism
- startup illustrations
- excessive icons
- parallax
- flashy animations
- marketing gimmicks

Think:

McKinsey
BCG
enterprise audit firms
technical advisory firms

not startup landing pages.

==================================================
SITE STRUCTURE
==================================================

Implement the structure defined in:

docs/context/SITE_MAP.md

Required sections/pages:

Home
Services
Case Studies
About
FAQ
Assessment
Contact

==================================================
HOME PAGE
==================================================

Use LANDING_PAGE.md as blueprint.

Required order:

Hero
Problem
Why Waiting Is Expensive
Methodology
Core Services
Case Studies
Why ETERNOps
Final CTA

Use actual content from LANDING_PAGE.md.

Do not rewrite positioning.

Only improve readability where necessary.

==================================================
SERVICES
==================================================

Create dedicated service pages:

- Commerce Migration
- PHP Modernization
- WordPress Modernization
- Mobile Modernization
- Infrastructure Modernization
- Recovery & Stabilization

Content source:

SERVICES.md
LANDING_PAGE.md

==================================================
CASE STUDIES
==================================================

Create overview page.

Use existing project/case content if available.

Do not fabricate results.

If data is missing:

Create structured placeholders with TODO markers.

==================================================
ABOUT
==================================================

Must communicate:

- philosophy
- methodology
- why ETERNOps exists

Founder information:

If existing founder content already exists in repository:

keep it.

Do not invent biographies.

==================================================
FAQ
==================================================

Build FAQ page.

Content source:

docs/business/FAQ.md

==================================================
ASSESSMENT PAGE
==================================================

Purpose:

Show how Technical Assessment works.

Include:

- assessment overview
- scorecard concept
- assessment process
- sample report explanation

Provide direct download link for:

docs/audit/AUDIT_TEMPLATE_SAMPLE.pdf

No lead capture.

No email gate.

No newsletter.

Simple download.

==================================================
CONTACT PAGE
==================================================

Site is deployed on GitHub Pages.

Preferred options:

A.
External contact platform integration

or

C.
mailto + structured inquiry workflow

If neither is practical:

E.
Simple contact information page

DO NOT implement backend services.

DO NOT add server infrastructure.

DO NOT add fake forms.

GitHub Pages compatibility is mandatory.

==================================================
SEO
==================================================

Generate:

- title tags
- meta descriptions
- Open Graph tags
- canonical URLs

for all pages.

Primary keywords:

쇼핑몰 데이터 이전
PHP 현대화
워드프레스 최적화
레거시 시스템 현대화
데이터 마이그레이션
서비스 안정화

==================================================
ACCESSIBILITY
==================================================

Target:

Accessibility >= 95

Requirements:

- semantic HTML
- keyboard navigation
- aria labels
- heading hierarchy
- sufficient contrast

==================================================
PERFORMANCE
==================================================

Target Lighthouse:

Performance > 90
Accessibility > 95
SEO > 95
Best Practices > 95

Avoid unnecessary JS.

Prefer static content.

==================================================
IMPLEMENTATION PROCESS
==================================================

Phase 1

Analyze repository.

Produce:

- architecture summary
- route plan
- component inventory

Phase 2

Implement new information architecture.

Phase 3

Implement pages.

Phase 4

Refine design system.

Phase 5

Run final cleanup.

==================================================
DELIVERABLE FORMAT
==================================================

For every major change:

1.

Files changed

1.

Reason

1.

Impact

1.

Remaining TODOs

Never make silent assumptions.

Always explain decisions.
