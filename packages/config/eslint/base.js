import { tanstackConfig } from '@tanstack/eslint-config'
import prettier from 'eslint-config-prettier'

/** @type {import('typescript-eslint').ConfigArray} */
export default [
  ...tanstackConfig,
  prettier,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'import/order': 'off',
    },
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.cache/**', '**/.turbo/**', '**/*.config.js', '**/*.config.ts'],
  },
]
