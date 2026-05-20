- 프로젝트 영문: key livesquare
- 프로젝트 제목: 라이브스퀘어
- 과거 제작 연도: 2018
- 복원 완료 연도: 2023
- Original stack: PHP 7.1 / Laravel 5.3 / Bootstrap 3
- Problem: Laravel 버전 지원 종료함
- Recovery: 최신 버전으로 코드 리팩토링 하고 Bootstrap 코드를 Tailwindcss로 변경
- Outcome: Laravel 최신 버전 이용이 가능해 졌고, 최신 어드민(Nova)으로 변경
- 현재 상태: 복원 완료
- 이미지 파일명: assets/livesquare-screenshot.png
- 한 줄 요약: 7년 전 유튜브 채널 영상 콘텐츠를 모아보는 서비스.
- 복구 노트 내용:
  1. 디자인 복원
     - 과거 디자인을 최대한 유지하면서, 반응형을 지원하도록 개선했습니다.
     - Bootstrap 3 에서 Laravel 10 의 기본 프레임워크인 Tailwindcss로 변경했습니다.
  2. 프레임워크 변경
     - Laravel 5.3 에서 Laravel 10 로 변경하면서 전체 코드를 리펙토링 했습니다.
     - Admin 에서 사용 된 CakePHP 2 를 Laravel Nova로 변경했습니다.
  3. 배포 자동화
     - FTP를 이용한 수동 배포 환경에서 Github Actions를 이용한 자동 배포 환경으로 변경했습니다.
     - 이를 통해 서버 오픈과 배포하는 환경을 구축했습니다.
  4. Issue와 PR 을 이용한 버전 관리
     - 소스 코드 변경 이력을 Github의 Issue와 PR을 통해 관리합니다.
     - 이를 통해 소스 코드 변경 이력을 추적하고, 변경 이력을 되돌릴 수 있습니다.
