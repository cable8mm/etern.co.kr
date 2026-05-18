import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [react(), tailwindcss()],

    // 1. 배포(빌드)할 때만 GitHub Pages 용 베이스 경로('/`레포이름`/')를 적용하고,
    //    개발(serve) 때는 루트('/')를 바라보게 합니다.
    // base: isBuild ? '/etern.co.kr/' : '/',
    // 2. custom domain을 사용한다면 빌드할 때도 루트('/')를 바라보게 합니다.
    base: '/',

    // 2. 개발 서버 설정은 로컬 개발(serve) 때만 활성화되도록 합니다.
    //    빌드할 때는 이 프록시/호스트 설정들이 배포 결과물에 영향을 주지 않습니다.
    server: isBuild
      ? {}
      : {
          host: true, // Nginx(Herd)가 이 서버를 찾을 수 있게 문을 열어둡니다.
          strictPort: true,
          allowedHosts: true,
        },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  };
});
