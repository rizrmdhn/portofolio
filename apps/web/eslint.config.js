import react from '@portofolio/config/eslint/react'

export default [
  ...react,
  {
    ignores: ['dist/**', '.cache/**', '.turbo/**', 'vite.config.ts.*'],
  },
]
