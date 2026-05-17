import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 호스트 바인딩 및 포트 제한 해제는 herd.sh 스크립트 인자가 담당하므로
    // 기본 설정만 깔끔하게 유지합니다.
    strictPort: true,
  },
});
