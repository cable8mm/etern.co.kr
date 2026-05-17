import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true, // 👈 국핵심: Nginx(Herd)가 이 서버를 찾을 수 있게 문을 열어둡니다.
      port: parseInt(env.VITE_PORT) || 5173,
      strictPort: true,
      allowedHosts: true,
    },
  };
});
