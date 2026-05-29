# AGENTS.md

# ETERNOps — Project Constitution & Agent Guideline

Version 5.0

---

# Mission

Build and maintain the official ETERNOps website (`https://www.etern.co.kr`).

The website exists to establish trust with business owners, executives, and technical decision-makers responsible for operating existing production systems.

ETERNOps specializes in:

- Migration
- Modernization
- Stabilization

of already-operating business systems.

The objective of the website is not to entertain visitors.

The objective is to communicate credibility, competence, operational maturity, and engineering discipline.

---

# Core Positioning

ETERNOps is NOT:

- a freelancer portfolio
- a software outsourcing agency
- a startup studio
- a no-code agency
- a marketing agency
- a web design company

ETERNOps IS:

A specialized engineering practice focused on safely evolving production systems while preserving:

- Business Continuity
- Data Integrity
- Operational Sustainability

---

# Primary Audience

Decision makers responsible for existing systems.

Examples:

- CEO
- Founder
- CTO
- Technical Lead
- Product Owner
- Operations Manager

Typical visitor concerns:

- legacy PHP systems
- aging WordPress environments
- commerce platform migration
- infrastructure modernization
- deployment instability
- operational risk
- disappearing maintainers
- undocumented systems
- database migration risk

---

# Non-Negotiable Business Rules

## Never Sell Rebuilds

The website must never encourage:

- complete rewrites
- greenfield replacement projects
- unnecessary platform replacement

ETERNOps philosophy:

> Understand before change.
>
> Recover before change.
>
> Preserve before replace.

---

## Discovery Call Restriction

The only free offering is:

### 30-Minute Free Discovery Call

The agent must NEVER generate:

- free audit offers
- free technical assessments
- free migration reports
- free consulting packages
- free architecture reviews

without explicit instructions from repository source documents.

---

## No Fake Authority

Never invent:

- customers
- case studies
- testimonials
- project counts
- revenue figures
- uptime statistics
- migration numbers
- certifications

If evidence does not exist in repository documents,
do not generate it.

---

# Tone & Writing Style

Required qualities:

- Professional
- Calm
- Senior
- Practical
- Direct
- Trustworthy
- Technical
- Measured

Preferred writing style:

- short paragraphs
- factual statements
- minimal adjectives
- high clarity
- executive readability

Avoid:

- hype
- fear marketing
- exaggerated urgency
- startup language
- marketing clichés

---

# Forbidden Vocabulary

Do not use:

- Revolutionary
- Disruptive
- Cutting-edge
- Game-changing
- Next-generation
- World-class
- Best-in-class
- Unicorn
- Hyper-growth

unless directly quoted from source documents.

---

# Design System Principles

Content first.

Trust first.

Readability first.

Visual hierarchy must support comprehension.

Website should resemble:

- technical advisory firms
- enterprise consulting firms
- audit firms
- professional legal services

More than:

- startup landing pages
- agency portfolios
- SaaS marketing sites

---

# Visual Constraints

Preferred:

- monochrome palette
- charcoal
- slate
- neutral gray
- restrained accent colors

Required:

- generous whitespace
- strong typography hierarchy
- semantic layout
- accessibility compliance

Forbidden:

- parallax effects
- decorative animations
- auto-playing video
- animated counters
- flashy gradients
- stock photography
- fake dashboards
- 3D illustrations

---

# Engineering Standards

## Framework

Use:

- Next.js (App Router)
- TypeScript
- Tailwind CSS

Prefer:

- Server Components
- Static Rendering
- Minimal Client Components

---

## Performance Targets

Lighthouse Targets:

- Performance > 90
- Accessibility > 95
- Best Practices > 95
- SEO > 95

---

## HTML Standards

Use semantic structure:

```html
<header>
  <main>
    <section>
      <article>
        <footer></footer>
      </article>
    </section>
  </main>
</header>
```

Avoid div-heavy layouts when semantic elements exist.

---

## Accessibility

Required:

- proper heading hierarchy
- alt text
- keyboard accessibility
- sufficient color contrast

---

# Repository Source of Truth

Implementation must follow repository documents.

No external assumptions.

No invented business logic.

No invented service offerings.

No invented copy.

---

## Priority 1 — Core Business Documents

Highest authority.

- docs/business/BRAND.md
- docs/business/POSITIONING.md
- docs/business/SERVICES.md
- docs/business/OFFER.md
- docs/business/NOT_TO_DO.md
- docs/business/SPEC.md

If conflicts occur:

BRAND.md overrides all documents.

POSIITONING.md overrides implementation decisions.

---

## Priority 2 — Business Operations

- docs/business/BUSINESS.md
- docs/business/IDEAS.md
- docs/business/OPERATING_SYSTEM.md
- docs/business/DISCOVERY_CALL.md
- docs/business/FAQ.md

---

## Priority 3 — Marketing Layer

- docs/business/MARKETING.md
- docs/business/CONTENT_STRATEGY.md
- docs/business/CONTENT_PLAN_90D.md
- docs/business/CASE_STUDIES.md
- docs/business/LANDING_PAGE.md

LANDING_PAGE.md is the primary homepage blueprint.

Homepage structure should follow it unless explicitly instructed otherwise.

---

## Priority 4 — Delivery Artifacts

Reference only.

- docs/business/AUDIT_CHECKLIST.md

- docs/templates/ASSESSMENT_TEMPLATE.md
- docs/templates/CONTRACT_TEMPLATE.md
- docs/templates/PROPOSAL_TEMPLATE.md
- docs/templates/SOW_TEMPLATE.md
- docs/templates/RUNBOOK_TEMPLATE.md
- docs/templates/RECOVERY_GUIDE_TEMPLATE.md

These documents explain methodology and deliverables.

They do not define homepage layout.

---

# Routing Rules

Only create routes supported by repository content.

Do not invent pages.

Possible routes may include:

- /
- /services
- /case-studies
- /faq
- /contact

Only if corresponding content exists.

---

# Content Generation Rules

Never create:

- fake case studies
- fake metrics
- fake client logos
- fake reviews
- fake partner badges

Never exaggerate outcomes.

Never promise:

- zero risk
- guaranteed success
- guaranteed uptime

Use precise engineering language.

---

# Final Principle

Every implementation decision must reinforce:

Business Continuity.

Data Integrity.

Operational Sustainability.

If a design choice increases visual excitement but decreases credibility,

choose credibility.
