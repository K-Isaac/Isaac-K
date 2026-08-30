import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// NOTE: If deploying to GitHub Pages at https://<user>.github.io/<repo>/,
// set `base: '/<repo>/'` below. Leave as '/' for a custom domain or root deploy.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
