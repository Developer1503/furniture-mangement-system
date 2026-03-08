import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Read .env from the shared Backend folder instead of frontend/
  envDir: path.resolve(__dirname, '../Backend'),
})

