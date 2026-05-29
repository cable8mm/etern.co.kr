# ETERNOps (이터놉스) — Official Repository Hub

> 우리는 서비스를 새로 만드는 것보다,
> 이미 운영 중인 비즈니스를 더 안전하고 지속 가능한 상태로 진화시키는 데 집중합니다.

ETERNOps는 운영 중인 웹·모바일 서비스의 Migration, Modernization, Stabilization을 전문으로 하는 기술 자문 및 엔지니어링 스튜디오입니다.

본 저장소는 ETERNOps [공식 웹사이트(https://etern.co.kr)](https://etern.co.kr)의 소스 코드와 비즈니스 운영 문서, 엔지니어링 템플릿을 관리하는 단일 진실 공급원(Single Source of Truth)입니다.

---

## Repository Purpose

이 저장소는 다음 목적을 위해 유지됩니다.

- ETERNOps 공식 웹사이트 개발 및 운영
- 브랜드 및 서비스 정책 관리
- 영업·제안·계약 문서 관리
- 기술 진단(Assessment) 표준화
- 프로젝트 수행 산출물 템플릿 관리
- AI/Codex 기반 개발 자동화 지원

---

## Repository Structure

```text
repository-root/
│
├── docs/
│
│   ├── company/
│   │   ├── BRAND.md
│   │   ├── POSITIONING.md
│   │   ├── SERVICES.md
│   │   ├── OFFER.md
│   │   ├── NOT_TO_DO.md
│   │   └── SPEC.md
│   │
│   ├── business/
│   │   ├── BUSINESS.md
│   │   ├── IDEAS.md
│   │   ├── OPERATING_SYSTEM.md
│   │   ├── DISCOVERY_CALL.md
│   │   └── FAQ.md
│   │
│   ├── marketing/
│   │   ├── MARKETING.md
│   │   ├── CONTENT_STRATEGY.md
│   │   ├── CONTENT_PLAN_90D.md
│   │   ├── CASE_STUDIES.md
│   │   └── LANDING_PAGE.md
│   │
│   ├── audit/
│   │   ├── AUDIT_CHECKLIST.md
│   │   ├── AUDIT_TEMPLATE.md
│   │   ├── AUDIT_TEMPLATE_SAMPLE.md
│   │   └── AUDIT_TEMPLATE_SAMPLE.pdf
│   │
│   └── templates/
│       ├── CONTRACT_TEMPLATE.md
│       ├── PROPOSAL_TEMPLATE.md
│       ├── SOW_TEMPLATE.md
│       ├── PROJECT_BRIEF_TEMPLATE.md
│       ├── ASSESSMENT_TEMPLATE.md
│       ├── RUNBOOK_TEMPLATE.md
│       └── RECOVERY_GUIDE_TEMPLATE.md
│
├── src/
├── public/
├── AGENTS.md
└── README.md
```

---

## Document Priority

문서 간 충돌이 발생할 경우 아래 우선순위를 적용합니다.

### Level 1 — Company Constitution

가장 높은 우선순위

- docs/company/BRAND.md
- docs/company/POSITIONING.md

---

### Level 2 — Service Definition

- docs/company/SERVICES.md
- docs/company/SPEC.md
- docs/company/NOT_TO_DO.md

---

### Level 3 — Marketing & Messaging

- docs/marketing/LANDING_PAGE.md
- docs/marketing/CONTENT_STRATEGY.md
- docs/marketing/MARKETING.md

---

### Level 4 — Operational Documents

- FAQ.md
- DISCOVERY_CALL.md
- BUSINESS.md
- OPERATING_SYSTEM.md

---

### Level 5 — Templates

- Proposal
- Contract
- SOW
- Assessment
- Runbook
- Recovery Guide

---

## Engineering Principles

ETERNOps의 모든 프로젝트는 다음 원칙을 따른다.

### Understand Before Change

구조와 데이터 흐름을 이해하기 전에는 프로덕션 환경을 변경하지 않는다.

---

### Data Integrity First

회원 정보, 주문 데이터, 콘텐츠, 운영 기록은 비즈니스 자산이다.

모든 이관 및 현대화 작업은 데이터 무결성 검증 절차를 포함해야 한다.

---

### Recovery Before Change

변경 계획보다 복구 계획을 먼저 설계한다.

롤백 전략 없이 프로덕션 변경을 수행하지 않는다.

---

### Business Continuity

기술보다 중요한 것은 서비스의 지속적인 운영이다.

아키텍처 결정은 항상 비즈니스 연속성을 우선으로 고려한다.

---

## Website Conversion Flow

ETERNOps 공식 웹사이트는 아래 흐름을 기준으로 설계된다.

```text
Landing Page
    ↓
Service Exploration
    ↓
Case Studies
    ↓
FAQ
    ↓
Discovery Call
    ↓
Project Brief
    ↓
Assessment
    ↓
Proposal & SOW
    ↓
Execution
```

---

## AI / Codex Guidelines

AI 에이전트 및 Codex는 반드시 AGENTS.md를 우선적으로 참조해야 한다.

주요 규칙:

- BRAND.md 우선
- LANDING_PAGE.md 카피 유지
- 과장 광고 금지
- 무료 감사(Audit) 제공 금지
- 무료 서비스는 Discovery Call만 허용
- 비즈니스 연속성 중심 메시지 유지
- 서비스 범위를 벗어난 기능 제안 금지

---

## Development

```bash
npm install
npm run dev
```

Production Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

---

## Contact

Website

<https://etern.co.kr>

Email

<ops@etern.co.kr>

---

© 2026 ETERNOps. All Rights Reserved.
