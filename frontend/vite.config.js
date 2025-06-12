import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3001',
      '/friends': 'http://localhost:3001',
      '/profile': 'http://localhost:3001'
    }
  }
});
