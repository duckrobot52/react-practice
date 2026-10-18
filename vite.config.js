import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages 하위 경로(https://duckrobot52.github.io/react-practice/)용
export default defineConfig({
  base: '/react-practice/',
  plugins: [react()],
})
