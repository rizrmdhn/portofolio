import base from '@portofolio/config/eslint/base'

export default [
  ...base,
  {
    files: ['tests/**/*.ts'],
    languageOptions: { parserOptions: { project: './tests/tsconfig.json' } },
  },
]
