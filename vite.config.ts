import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.ts',
        onstart(options) {
          console.log('Electron main process built')
        },
        vite: {
          build: {
            sourcemap: process.env.NODE_ENV === 'development',
            minify: process.env.NODE_ENV !== 'development',
            outDir: 'dist-electron',
            lib: {
              entry: 'electron/main.ts',
              formats: ['cjs'],
              fileName: () => 'main.js'
            },
            rollupOptions: {
              external: ['electron', 'electron-store']
            }
          }
        }
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          console.log('Electron preload script built')
        },
        vite: {
          build: {
            sourcemap: process.env.NODE_ENV === 'development',
            minify: process.env.NODE_ENV !== 'development',
            outDir: 'dist-electron',
            lib: {
              entry: 'electron/preload.ts',
              formats: ['cjs'],
              fileName: () => 'preload.js'
            },
            rollupOptions: {
              external: ['electron']
            }
          }
        }
      }
    ]),
    renderer()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/stores': resolve(__dirname, 'src/stores'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/utils': resolve(__dirname, 'src/utils')
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        overlay: resolve(__dirname, 'overlay.html')
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      port: 5174
    }
  }
})