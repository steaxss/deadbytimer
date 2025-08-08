import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'

export default defineConfig(({ mode }) => ({
  base: './',                   // ← essentiel pour Electron + file://
  plugins: [
    react(),
    mode === 'production' && obfuscatorPlugin({
      apply: 'build',
      exclude: [/node_modules/],
      options: {
        compact: true,
        selfDefending: false,    // pas d’eval → compatible CSP
        debugProtection: false,
        identifierNamesGenerator: 'hexadecimal',
        transformObjectKeys: true,
        stringArray: true,
        rotateStringArray: true,
        stringArrayThreshold: 0.6,
        stringArrayEncoding: [], // pas d’encodage runtime
        disableConsoleOutput: true,
        simplify: true,
      }
    })
  ].filter(Boolean),
  build: { sourcemap: false }
}))
