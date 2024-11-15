import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // 배포 경로 설정
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // 코드 스플리팅 설정
      },
    },
  },
});