# ETERNOps — Statement of Work (SOW)

Version 1.0

본 문서는 프로젝트 계약 체결 시 상호 합의된 구체적인 엔지니어링 업무 범위, 책임 한계, 일정, 산출물 및 검수 기준을 정의하는 정식 작업 명세서(Statement of Work)입니다.

본 문서는 계약서의 부속 문서로서 동일한 효력을 가지며, 프로젝트 수행 범위를 판단하는 최우선 기준으로 사용됩니다.

---

# 0. Project Overview

| 항목            | 내용             |
| --------------- | ---------------- |
| 프로젝트명      |                  |
| 고객사(갑)      |                  |
| 수행사(을)      | ETERNOps         |
| 프로젝트 책임자 | Senior Architect |
| 작성일          | 2026-00-00       |

---

# 1. Scope of Work (업무 범위)

본 프로젝트는 ETERNOps Engineering Specification에 따라 수행됩니다.

## Phase 1 — Environment Isolation & Backup

### 수행 항목

- 프로덕션 환경 전체 구조 분석
- 소스코드 백업 및 형상관리 상태 점검
- 데이터베이스 전체 백업
- 서버 설정 파일 백업
- 복구 시나리오 초안 작성
- 스테이징 환경 구축

### 완료 기준

- 백업 검증 완료
- 스테이징 환경 정상 구동
- 롤백 가능 여부 확인

---

## Phase 2 — Core Engineering & Migration

### 수행 항목

(프로젝트별 작성)

예시:

- PHP 5.4 → PHP 8.2 업그레이드
- Framework Dependency 교체
- 데이터 스키마 분석 및 매핑
- 회원/주문/포인트 데이터 이전
- WordPress 구조 개선
- 모바일 SDK 업그레이드

### 완료 기준

- 주요 기능 정상 동작
- 데이터 정합성 검증 완료
- Validation Checklist 통과

---

## Phase 3 — Infrastructure & Automation

### 수행 항목

- Docker 환경 구축
- CI/CD 자동화 구축
- 보안 설정 개선
- 모니터링 환경 구축
- 백업 정책 수립

### 완료 기준

- 자동 배포 성공
- 롤백 테스트 성공
- 모니터링 정상 수집 확인

---

## Phase 4 — Stabilization

### 수행 항목

- 실시간 로그 분석
- 성능 프로파일링
- 데이터 정합성 재검증
- 장애 모니터링

### 완료 기준

- Critical Issue 없음
- 서비스 정상 운영 확인
- 운영 안정화 승인

---

## Phase 5 — Documentation & Handover

### 수행 항목

- 운영 문서 작성
- 인수인계 세션 진행
- 운영 담당자 교육

### 완료 기준

- 필수 문서 전달 완료
- 고객사 승인 완료

---

# 2. Anti-Scope & Exclusions

다음 항목은 본 계약 범위에 포함되지 않습니다.

- 신규 비즈니스 기능 개발
- 신규 페이지 제작
- UI/UX 리디자인
- 디자인 시스템 구축
- 이미지 제작 및 퍼블리싱 작업
- 마케팅용 랜딩페이지 제작
- 프로젝트 범위를 벗어난 데이터 수작업 정제
- 제3자 시스템 자체 결함 수정
- 상주 개발
- 프로젝트 종료 후 일상 운영 대행

---

# 3. Allocation of Responsibilities

## 3.1 ETERNOps Responsibilities

ETERNOps는 다음 책임을 수행합니다.

- 합의된 범위 내 엔지니어링 작업 수행
- 리스크 식별 및 서면 보고
- 데이터 무결성 보호
- 롤백 계획 수립
- 기술 문서 작성
- 검수 증빙 자료 제공

---

## 3.2 Client Responsibilities

고객사는 다음 사항을 보장해야 합니다.

### 권한 제공

프로젝트 착수 후 3영업일 이내에 아래 접근 권한 제공

- Git Repository
- AWS / Hosting
- Database
- Domain / DNS
- Third-party Services

권한 제공 지연에 따른 일정 변경은 수행사 책임으로 간주하지 않습니다.

### 의사결정

고객사는 프로젝트 기간 동안 의사결정 책임자를 지정해야 합니다.

정책 결정 및 예외 처리 요청에 대해 24시간 이내 회신을 원칙으로 합니다.

### 데이터 원본 상태

기존 시스템의 데이터 오염 또는 구조적 결함은 고객사 자산의 상태로 간주하며, ETERNOps는 이를 분석·격리·개선하기 위한 기술적 지원을 제공합니다.

---

# 4. Deliverables

프로젝트 종료 시 다음 자산을 고객사에 인계합니다.

## Engineering Assets

- Production Source Code
- Migration Scripts
- Infrastructure Configuration
- Docker Configuration
- CI/CD Pipeline Configuration

## Documentation Assets

- Architecture Overview
- System Runbook
- Recovery Guide
- Change Log
- Handover Guide

---

# 5. Project Schedule

| Milestone | 작업 내용            | 예정일     |
| --------- | -------------------- | ---------- |
| M1        | 백업 및 환경 구축    | 2026-00-00 |
| M2        | 코어 엔지니어링 수행 | 2026-00-00 |
| M3        | 전환 및 검증         | 2026-00-00 |
| M4        | 안정화               | 2026-00-00 |
| M5        | 문서 인계 및 종료    | 2026-00-00 |

총 예상 기간:

**00주**
(2026-00-00 ~ 2026-00-00)

---

# 6. Acceptance Criteria

다음 기준 충족 시 프로젝트는 검수 완료로 간주됩니다.

## AC-01 Data Integrity

다음 검증 항목이 충족되어야 합니다.

- 데이터 레코드 수 일치
- 핵심 비즈니스 데이터 일치
- Checksum 검증 통과
- Aggregate Validation 통과

---

## AC-02 Operational Stability

다음 핵심 프로세스가 정상 동작해야 합니다.

- 회원가입
- 로그인
- 주문
- 결제
- 관리자 기능

프로덕션 환경에서 치명적 런타임 오류가 없어야 합니다.

---

## AC-03 Documentation Delivery

다음 문서가 인계 완료되어야 합니다.

- Architecture Overview
- System Runbook
- Recovery Guide
- Change Log

---

## AC-04 Handover Completion

운영 담당자 대상 인수인계가 완료되고,
필요 시 질의응답 세션이 종료되어야 합니다.

---

# 7. Change Management

본 문서에 명시되지 않은 추가 요구사항은 프로젝트 범위에 포함되지 않습니다.

다음 사항은 Change Order 대상입니다.

- 신규 기능 추가
- 일정 변경
- 데이터 범위 확대
- 추가 시스템 연동
- 추가 문서 작성

모든 Change Order는 별도 문서 작성 및 상호 승인 후 진행합니다.

---

# Signatures

본 작업 명세서의 범위와 조건에 상호 동의합니다.

| 구분         | 서명                         |
| ------------ | ---------------------------- |
| 고객사(갑)   | **\*\*\*\***\_\_**\*\*\*\*** |
| ETERNOps(을) | **\*\*\*\***\_\_**\*\*\*\*** |

서명일: 2026-00-00
