import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change this if your GitHub repo name is different.
// e.g. if your repo is https://github.com/<user>/plant-app, base should be '/plant-app/'
export default defineConfig({
  plugins: [react()],
  base: '/plant-app/',
  css: {
    // Don't inherit any postcss config from parent directories
    postcss: { plugins: [] },
  },
})
