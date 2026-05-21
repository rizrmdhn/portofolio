import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { cpSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
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

function copySharpNativePlugin(): Plugin {
  return {
    name: 'copy-sharp-native',
    apply: 'build',
    closeBundle() {
      const serverDir = resolve('.output/server')
      if (!existsSync(serverDir)) return

      const destModules = join(serverDir, 'node_modules')
      mkdirSync(destModules, { recursive: true })

      const imgSrc = resolve('../../node_modules/@img')
      if (existsSync(imgSrc)) {
        cpSync(imgSrc, join(destModules, '@img'), { recursive: true, dereference: true })
      }

      const sharpSrc = resolve('../../node_modules/sharp')
      if (existsSync(sharpSrc) && !existsSync(join(destModules, 'sharp'))) {
        cpSync(sharpSrc, join(destModules, 'sharp'), { recursive: true, dereference: true })
      }
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
    copySharpNativePlugin(),
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: 'node-server',
      traceDeps: ['@node-rs/argon2', '@react-pdf/renderer'],
    }),
    viteReact(),
  ],
})
