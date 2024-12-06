import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/model-builder/',  
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})