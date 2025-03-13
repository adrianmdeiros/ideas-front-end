/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  plugins: [react()],
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
    'process.env.VITE_SUAPI_BASE_URL': JSON.stringify(process.env.VITE_SUAPI_BASE_URL)
  }
})
