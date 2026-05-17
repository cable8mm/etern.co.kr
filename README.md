# FastCode 홈페이지 🚀

모던하고 확장 가능하며 반응형으로 제작된 B2B 테크 스타트업 홈페이지입니다. 글래스모피즘(Glassmorphism), 동적인 스크롤 애니메이션, 다크 네이비와 오렌지의 풍부한 컬러 팔레트를 활용하여 프리미엄 엔터프라이즈급 느낌을 제공하도록 구축되었습니다.

## ✨ 주요 기능

- **모던 UI/UX**: B2B 테크 스타트업에 맞춘 프리미엄 디자인.
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 모든 기기에서 완벽한 경험 제공.
- **글래스모피즘 & 애니메이션**: `framer-motion`을 활용한 부드러운 스크롤 효과와 반투명 블러 컴포넌트 적용.
- **개발자 경험(DX)**: Vite, ESLint, Prettier 및 최신 Tailwind CSS v4로 완벽하게 구성된 환경.

## 🛠 기술 스택

- **프레임워크**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **스타일링**: [Tailwind CSS v4](https://tailwindcss.com/)
- **애니메이션**: [Framer Motion](https://www.framer.com/motion/)
- **아이콘**: [Lucide React](https://lucide.dev/)
- **포맷팅 & 린트**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **테스트**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

## 🚀 시작하기

### 사전 요구 사항

- Node.js (v18 이상 권장)
- npm 또는 yarn
- _선택 사항:_ [Laravel Herd](https://herd.laravel.com/) 또는 [Laravel Valet](https://laravel.com/docs/valet)

### 설치 방법

1. 레포지토리를 클론합니다:

   ```bash
   git clone https://github.com/cable8mm/etern.co.kr.git
   cd etern.co.kr
   ```

2. 패키지를 설치합니다:

   ```bash
   npm install
   ```

3. 개발 서버를 실행합니다:

   **방법 1:** 표준 개발 방식 (기본값 - 별도 설정 필요 없음)
   Laravel Herd나 Valet을 사용하지 않는 경우, 기본 Vite 서버를 실행하면 됩니다:

   ```bash
   npm run dev
   ```

   브라우저를 열고 <http://localhost:5173> 에 접속합니다.

   **방법 2:** Laravel Herd / Valet 연동 (선택 사항)

   macOS에서 Herd 또는 Valet을 사용하고 있으며, HTTPS 기반의 로컬 `.test` 도메인(<https://etern.co.kr.test>)으로 원활하게 개발하고 싶다면, 스마트 자동화 스크립트를 통해 Nginx 리버스 프록시 설정과 Vite 서버 동기화를 한 번에 처리할 수 있습니다.

4. 먼저 로컬 도메인을 연결하고 보안(HTTPS) 설정을 완료합니다:

   ```bash
   herd link && herd secure
   # Valet 사용 시: valet link && valet secure
   ```

5. 스크립트에 실행 권한을 부여합니다 (최초 1회만 필요):

   ```bash
   chmod +x herd.sh
   ```

6. 자동화 스크립트를 실행합니다. Nginx를 업데이트하고 로컬 웹 서버를 재시작한 뒤 Vite를 함께 실행합니다:

   ```bash
   # 기본 포트 5173으로 실행
   npm run herd

   # 만약 5173 포트가 사용 중이라면 커스텀 포트 지정
   ./herd.sh start 3000
   ```

   브라우저를 열고 <https://etern.co.kr.test> 에 접속합니다.

7. **종료하기:** 터미널에서 `Ctrl + C`를 누르기만 하면 됩니다. 스크립트가 종료 신호를 가로채 커스텀 Nginx 프록시 블록을 제거하고 Herd/Valet을 원래 상태로 자동 복구합니다.

## 📜 사용 가능한 스크립트 (Scripts)

- `npm run dev` - 로컬 개발 서버를 시작합니다.
- `npm run herd` - `./herd.sh start`의 단축 명령어로, Nginx 설정을 동기화하고 5173 포트에서 Vite를 실행합니다.
- `./herd.sh start [port]` - 커스텀 Nginx 리버스 프록시 및 캐시 무효화 규칙을 Herd/Valet에 주입하고, 웹 서버를 재시작한 뒤 지정된 포트에서 Vite를 실행합니다.
- `./herd.sh stop` - 커스텀 Nginx 프록시 블록을 수동으로 제거하여 Herd/Valet을 기본값으로 복구하고 웹 서버를 재시작합니다.
- `npm run build` - 프로덕션 환경을 위해 `dist` 폴더에 앱을 빌드합니다.
- `npm run preview` - 프로덕션 빌드 결과물을 로컬에서 미리보기합니다.
- `npm run lint` - ESLint를 실행하여 코드 품질 및 포맷팅 문제를 검사합니다.
- `npm run lint:fix` - 린트 및 포맷팅 문제를 자동으로 수정합니다.
- `npm run format` - Prettier를 실행하여 코드베이스의 모든 파일(JSON, CSS, Markdown, JS 등)을 포맷팅합니다.
- `npm run test` - Vitest를 사용하여 단위 테스트를 1회 실행합니다 (CI 환경에 적합).
- `npm run test:watch` - 코드가 변경될 때마다 테스트를 자동으로 다시 실행하는 Watch 모드로 테스트를 구동합니다.

## 🤝 기여하기 (Contributing)

기여, 이슈 등록 및 기능 요청은 언제나 환영합니다!
자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md) 파일을 확인해 주세요.

## 📄 라이선스 (License)

이 프로젝트는 [MIT](LICENSE) 라이선스 하에 배포됩니다.
