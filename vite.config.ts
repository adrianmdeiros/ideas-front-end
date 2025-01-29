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
  plugins: [react()]
})
