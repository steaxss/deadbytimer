import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => ({
  // chemins relatifs en production (file:// dans Electron)
  base: mode === 'development' ? '/' : './',
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // évite de livrer les maps (légère "opacité" en plus)
    rollupOptions: {
      // 👇 MPA: on construit index.html ET overlay.html
      input: {
        index: resolve(__dirname, 'index.html'),
        overlay: resolve(__dirname, 'overlay.html'),
      },
    },
  },
}))
