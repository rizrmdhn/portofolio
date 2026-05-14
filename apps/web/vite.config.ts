import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { nitro } from 'nitro/vite'
import { defineConfig, type Plugin } from 'vite'

function inlineTtfPlugin(): Plugin {
  return {
    name: 'inline-ttf',
    enforce: 'pre',
    load(id) {
      if (!id.endsWith('.ttf')) return
      const buffer = readFileSync(id)
      const base64 = buffer.toString('base64')
      return `export default "data:font/truetype;base64,${base64}"`
    },
  }
}

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
    inlineTtfPlugin(),
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: 'vercel',
      traceDeps: ['@node-rs/argon2', '@react-pdf/renderer'],
    }),
    viteReact(),
  ],
})
