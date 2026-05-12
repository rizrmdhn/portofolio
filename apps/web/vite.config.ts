import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3001,
  },
  preview: {
    port: 3001,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      tslib: 'tslib/tslib.es6.mjs',
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: 'vercel',
      traceDeps: ['@node-rs/argon2', '@react-pdf/renderer'],
    }),
    viteReact(),
  ],
})
