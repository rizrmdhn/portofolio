import react from '@portofolio/config/eslint/react'

export default [
  ...react,
  {
    files: ['src/components/ui/**'],
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'off',
    },
  },
  {
    ignores: ['dist/**', '.cache/**', '.turbo/**', 'vite.config.ts.*'],
  },
]
