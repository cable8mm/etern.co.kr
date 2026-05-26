# Next State Studio — Technical Audit Master Checklist

본 문서는 Technical Assessment 수행 시 사용하는 내부 마스터 체크리스트입니다.

모든 프로젝트는 고객 환경에 맞게 필요한 트랙만 선택하여 수행합니다.

---

# 0. Asset & Access Audit

## Ownership Verification

### Source Code

- [ ] Git 저장소 접근 가능
- [ ] Git 히스토리 확인 가능
- [ ] 브랜치 전략 확인 가능

### Infrastructure

- [ ] AWS Root 또는 관리자 권한 확보
- [ ] 호스팅 관리자 접근 가능
- [ ] SSH 접근 가능

### Domain & DNS

- [ ] DNS 제어권 확인
- [ ] SSL 인증서 관리 위치 확인

### External Services

- [ ] PG 관리자 계정 확인
- [ ] SNS 로그인 콘솔 접근 가능
- [ ] 이메일 발송 서비스 접근 가능
- [ ] 앱스토어 계정 접근 가능

---

# 1. Architecture Audit

## System Understanding

- [ ] 전체 시스템 구조도 존재
- [ ] 서비스 컴포넌트 식별 가능
- [ ] 외부 연동 시스템 파악 가능

## Dependency Mapping

- [ ] 서비스 간 의존성 확인
- [ ] 데이터 흐름 식별
- [ ] 운영 프로세스 확인

---

# 2. Documentation Audit

## Knowledge Transfer Readiness

- [ ] 아키텍처 문서 존재
- [ ] 운영 매뉴얼 존재
- [ ] 배포 가이드 존재
- [ ] 장애 대응 문서 존재
- [ ] 신규 개발자 온보딩 가능 수준 확인

---

# 3. Source Code Audit

## Runtime

- [ ] Runtime 버전 확인
- [ ] EOL 여부 확인
- [ ] 업그레이드 가능성 평가

## Framework

- [ ] 프레임워크 버전 확인
- [ ] 지원 종료 여부 확인
- [ ] 커뮤니티 활성도 확인

## Dependency

- [ ] Composer 의존성 분석
- [ ] NPM 의존성 분석
- [ ] 알려진 취약점 확인

## Code Quality

- [ ] 네이밍 규칙 일관성
- [ ] 구조적 결합도 평가
- [ ] 중복 코드 식별
- [ ] 테스트 코드 존재 여부

## Secrets

- [ ] API Key 하드코딩 여부
- [ ] DB Password 하드코딩 여부
- [ ] 환경 변수 분리 여부

---

# 4. Infrastructure Audit

## Architecture

- [ ] 단일 장애점(SPOF) 존재 여부
- [ ] Auto Scaling 구성 여부
- [ ] 고가용성(HA) 구성 여부

## Environment Parity

- [ ] Local 존재
- [ ] Staging 존재
- [ ] Production 존재

## Deployment

- [ ] 수동 배포 여부
- [ ] CI/CD 구성 여부
- [ ] Rollback 가능 여부

## Cost Efficiency

- [ ] 리소스 과다 사용 여부
- [ ] 유휴 인스턴스 존재 여부
- [ ] 스토리지 낭비 여부

---

# 5. Security Audit

## Infrastructure Security

- [ ] 불필요한 포트 공개 여부
- [ ] 보안 그룹 정책 점검
- [ ] 방화벽 정책 점검

## Application Security

- [ ] 인증 체계 검토
- [ ] 권한 검증 로직 확인
- [ ] 관리자 페이지 보호 상태

## Vulnerability Review

- [ ] 알려진 CVE 존재 여부
- [ ] EOL 소프트웨어 존재 여부
- [ ] 취약 라이브러리 존재 여부

---

# 6. Observability Audit

## Logging

- [ ] 중앙 로그 존재
- [ ] 에러 로그 수집 가능
- [ ] 로그 보존 정책 존재

## Monitoring

- [ ] 시스템 모니터링 존재
- [ ] 애플리케이션 모니터링 존재
- [ ] 비용 모니터링 존재

## Alerting

- [ ] 장애 알림 구성
- [ ] 운영자 통보 체계 존재

---

# 7. Data Safety Audit

## Backup

- [ ] 자동 백업 수행
- [ ] 백업 주기 확인
- [ ] 백업 보관 정책 확인

## Backup Isolation

- [ ] 운영 환경 외부 저장
- [ ] 암호화 여부 확인

## Recovery

- [ ] 복구 테스트 이력 존재
- [ ] 복구 절차 문서 존재

## Database

- [ ] 인덱스 최적화 상태
- [ ] 장기 성장성 평가
- [ ] 데이터 무결성 검증

---

# 8. Recovery Readiness Audit

## Disaster Recovery

- [ ] 복구 책임자 존재
- [ ] 복구 프로세스 존재
- [ ] 복구 문서 존재

## Rollback Readiness

- [ ] 배포 롤백 가능
- [ ] DB 롤백 가능
- [ ] 긴급 복구 절차 존재

## Business Continuity

- [ ] 장애 시 우회 운영 가능
- [ ] 핵심 비즈니스 프로세스 지속 가능

---

# 9. Migration Track

## Platform Migration

- [ ] 데이터 스키마 차이 분석
- [ ] 기능 차이 분석
- [ ] 운영 프로세스 차이 분석

## User Data

- [ ] 회원 정보 이관 가능
- [ ] 비밀번호 전략 정의
- [ ] 포인트 매핑 가능

## Historical Data

- [ ] 주문 데이터 범위 정의
- [ ] 로그 데이터 범위 정의

---

# 10. WordPress Track

## Plugin Audit

- [ ] 중복 플러그인 식별
- [ ] 단종 플러그인 식별
- [ ] 취약 플러그인 식별

## Performance

- [ ] 캐싱 상태 점검
- [ ] 이미지 최적화 상태
- [ ] DB 병목 점검

## Theme Review

- [ ] 커스텀 코드 분석
- [ ] WP_Query 최적화 상태

---

# 11. Mobile App Track

## Store Compliance

- [ ] Android Target SDK
- [ ] iOS Deployment Target
- [ ] 정책 위반 여부

## Build Environment

- [ ] 재현 가능한 빌드 가능
- [ ] CI/CD 구축 가능성

## Third Party Dependencies

- [ ] 결제 SDK
- [ ] 푸시 SDK
- [ ] 로그인 SDK

## Release Readiness

- [ ] 스토어 재배포 가능
- [ ] 인증서 관리 상태
- [ ] 서명 키 보관 상태

---

# Final Assessment

Overall Risk

- [ ] Critical
- [ ] High
- [ ] Medium
- [ ] Low

Recommended Direction

- [ ] Stabilization
- [ ] Modernization
- [ ] Migration
- [ ] Optimization
- [ ] Partial Rebuild

Notes

________________________________

________________________________

________________________________
