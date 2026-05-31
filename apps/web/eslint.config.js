import react from '@portofolio/config/eslint/react'

export default [
  ...react,
  {
    ignores: [
      'dist/**',
      '.cache/**',
      '.turbo/**',
      '.vercel/**',
      '.output/**',
      '.nitro/**',
      'vite.config.ts.*',
      'src/components/ui/**',
    ],
  },
]
