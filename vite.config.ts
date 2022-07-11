import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'src/public',
    // emptyOutDir: false,
    manifest: 'vite-manifest.json',
    rollupOptions: {
        input: 'src/pages/index.tsx'
    }
  }
})
