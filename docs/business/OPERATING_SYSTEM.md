# OPERATING_SYSTEM.md

# ETERNOps Operating System

Version 2.0

---

# Purpose

이 문서는 ETERNOps의 모든 기술적 판단, 프로젝트 수주, 시스템 엔지니어링, 고객 커뮤니케이션의 핵심 원칙과 의사결정 기준을 정의합니다.

새로운 프로젝트, 신규 기술, 예상치 못한 기회가 등장하더라도 우리는 언제나 이 문서를 기준으로 판단합니다.

---

# 1. CORE COMPASS

## Core Principle

우리는 서비스를 새로 만드는 회사가 아닙니다.

우리는 이미 성공적으로 운영되고 있는 비즈니스를

- 더 안전하게
- 더 유지보수 가능하게
- 더 확장 가능하게

만드는 전문가입니다.

새로운 시스템 구축(Greenfield)보다 기존 자산의 안전한 진화(Evolution)를 우선합니다.

---

## Mission

기술 부채와 운영 리스크 때문에 성장하지 못하는 기업을 줄인다.

---

## Vision

- 어떤 변화에도 안전하게 진화할 수 있는 서비스
- 기술 부채 때문에 멈추지 않는 비즈니스
- 개발자가 바뀌어도 지속 가능한 시스템

---

## Core Values

### Business Continuity

비즈니스는 멈추지 않아야 한다.

기술적 변화는 비즈니스 연속성을 해치지 않는 범위 안에서 수행한다.

---

### Data Integrity

데이터는 기업의 핵심 자산이다.

회원 정보, 주문 이력, 콘텐츠, 포인트, 로그 데이터의 무결성을 최우선으로 보호한다.

---

### Sustainable Systems

최신 기술보다 지속 가능한 기술을 선택한다.

현재뿐 아니라 3년 뒤, 5년 뒤에도 유지 가능한 구조를 만든다.

---

# 2. DECISION-MAKING MATRIX

우리는 기술적·비즈니스적 갈림길에 섰을 때 항상 다음 우선순위를 따른다.

1. Business Continuity (비즈니스 연속성)
2. Data Integrity (데이터 무결성)
3. Maintainability (유지보수성)
4. Scalability (확장성)
5. Developer Productivity (개발 생산성)
6. Technology Preference (기술 취향)

기술적 유행이나 개인적 선호는 항상 마지막 고려 대상이다.

---

# 3. ENGINEERING PRINCIPLES

## Business First

우리는 기술 자체를 판매하지 않는다.

고객이 구매하는 것은

- 안정성
- 예측 가능성
- 운영 안심
- 리스크 감소

이다.

기술은 이를 달성하기 위한 수단이다.

---

## Data First

회원 정보

주문 이력

포인트

콘텐츠

운영 로그

비즈니스 데이터는 과거이자 현재이며 미래다.

데이터 손실 가능성이 존재하는 작업은 반드시 아래를 먼저 준비한다.

- 백업 전략
- 검증 절차
- 복구 시나리오

---

## Recovery Before Change

우리는 변경 계획보다 복구 계획을 먼저 만든다.

좋은 엔지니어링은 실패하지 않는 것이 아니라 실패하더라도 즉시 복구 가능한 상태를 만드는 것이다.

모든 프로젝트는 반드시 다음을 포함한다.

- Rollback Strategy
- Recovery Procedure
- Validation Plan

---

## Understand Before Action

현재 상태를 이해하지 못한 채 변경하지 않는다.

추측 기반 작업을 금지한다.

실행 전 반드시 확인한다.

### Architecture

시스템 구조

서비스 의존성

애플리케이션 구성

---

### Data Flow

데이터 흐름

데이터 저장 구조

데이터 이동 경로

---

### Infrastructure

서버

네트워크

배포 구조

운영 프로세스

---

### Operational Risk

잠재 장애 요소

단일 장애 지점(SPOF)

보안 위험

운영 위험

---

## Automation Over Repetition

반복 가능한 작업은 자동화한다.

휴먼 에러를 줄이는 것이 생산성을 높이는 것보다 우선이다.

자동화 우선순위:

1. Backup
2. Deployment
3. Monitoring
4. Alerting
5. Documentation

---

# 4. DELIVERY SYSTEM

## Standard Delivery Flow

모든 프로젝트는 다음 프로세스를 따른다.

Assessment → Planning → Execution → Stabilization → Documentation → Handover

---

## Assessment

현재 상태를 파악한다.

확실하게 이해하지 못한 시스템은 수정하지 않는다.

주요 분석 항목:

- 아키텍처
- 데이터 흐름
- 인프라
- 기술 부채
- 운영 리스크

---

## Planning

안전한 실행 계획을 설계한다.

주요 산출물:

- 실행 계획
- 데이터 보호 전략
- 롤백 전략
- 안정화 계획

---

## Execution

계획된 범위 내에서 변경을 수행한다.

원칙:

- 최소 위험
- 최소 다운타임
- 검증 가능한 변경

---

## Stabilization

새로운 환경이 안정적으로 동작하는지 검증한다.

주요 활동:

- 모니터링
- 성능 확인
- 장애 대응
- 운영 검증

---

## Documentation

모든 변경 사항을 기록한다.

문서는 프로젝트의 부속물이 아니라 시스템의 일부다.

---

## Handover

새로운 담당자가 즉시 운영 가능한 상태로 인계한다.

---

# 5. DOCUMENTATION STANDARD

모든 프로젝트는 가능한 범위 내에서 다음 문서 자산을 제공한다.

---

## Architecture Overview

전체 시스템 구조

구성 요소

서비스 관계도

---

## Deployment Guide

배포 방법

환경 구성

운영 절차

---

## System Runbook

정기 운영 절차

장애 대응 절차

점검 체크리스트

---

## Recovery Guide

백업 절차

복구 절차

Rollback 가이드

---

## Change Log

변경 이력

릴리즈 기록

주요 의사결정 내역

---

# 6. PROJECT SELECTION RULES

## Core Business

우리는 다음 영역에 집중한다.

### Migration

운영 중인 서비스 이전

플랫폼 전환

데이터 마이그레이션

---

### Modernization

레거시 환경 현대화

PHP

WordPress

모바일

인프라

---

### Stabilization

장애 분석

시스템 복구

운영 안정화

---

### Technical Assessment

기술 실사

리스크 분석

블랙박스 시스템 분석

---

### Documentation

Runbook 구축

운영 문서화

인수인계 체계 구축

---

## Not Our Business

다음 업무는 핵심 사업 영역이 아니다.

### Staff Augmentation

상주 개발자 파견

인력 대체 계약

---

### Low-Value Maintenance

배너 수정

콘텐츠 등록

단순 운영 대행

---

### Price-Driven Bidding

최저가 경쟁 입찰

단가 중심 프로젝트

---

### Patch-Only Requests

근본 원인 분석 없이 임시 처치만 요구하는 프로젝트

---

# 7. TECHNOLOGY SELECTION RULES

새로운 기술은 트렌드가 아니라 지속 가능성을 기준으로 평가한다.

기술 도입 전 반드시 검토한다.

### Maintainability

쉽게 유지보수 가능한가?

---

### Talent Availability

시장에 충분한 인력이 존재하는가?

---

### Documentation

문서와 레퍼런스가 충분한가?

---

### Community & Support

활발한 생태계와 지속적 보안 지원이 존재하는가?

---

### Operational Risk

프로덕션 환경에서 예측 가능한 수준의 위험인가?

---

# 8. OPERATING LEVERAGE

## AI Usage Policy

우리는 AI를 적극적으로 활용한다.

활용 영역:

- 소스코드 분석
- 기술 문서 초안 작성
- 코드 리뷰 보조
- 인프라 분석
- 리스크 시뮬레이션

최종 판단과 책임은 항상 인간 아키텍트가 가진다.

AI는 의사결정자가 아니라 도구다.

---

## Lean Execution

불필요한 절차를 최소화한다.

의사결정과 실행 사이의 시간을 줄인다.

---

## Direct Communication

고객은 영업 담당자나 PM이 아니라 실제 프로젝트를 수행하는 아키텍트와 직접 소통한다.

---

## Clear Accountability

책임은 분산되지 않는다.

기술 판단과 실행 책임은 동일한 사람에게 있다.

---

# 9. NON-NEGOTIABLES

다음 원칙은 어떠한 상황에서도 타협하지 않는다.

### 1

데이터 백업 없는 운영 변경 금지

---

### 2

롤백 계획 없는 프로덕션 변경 금지

---

### 3

현재 구조를 이해하지 못한 상태의 구현 금지

---

### 4

문서 없는 프로젝트 종료 금지

---

### 5

고객이 이해하지 못하는 기술 의사결정 금지

---

# 10. SUCCESS DEFINITION

프로젝트 성공은 단순히 기능 구현 완료가 아니다.

다음 상태(Next State)에 도달했는지가 기준이다.

### Operational Stability

가동 안정성이 향상되었는가

---

### Risk Reduction

예상 가능한 장애 위험이 제거되었는가

---

### Maintainability

향후 유지보수가 쉬워졌는가

---

### Documentation

새로운 담당자가 문서만으로 운영 가능한가

---

### Sustainability

장기적으로 운영 가능한 구조가 되었는가

---

# One Sentence

> 우리는 서비스를 새로 만드는 사람이 아니라,
>
> 이미 성공한 비즈니스를 기술 부채와 운영 리스크로부터 보호하고,
> 더 오래 살아남을 수 있는 다음 상태(Next State)로 이동시키는 사람들이다.
