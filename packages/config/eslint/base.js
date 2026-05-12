import { tanstackConfig } from '@tanstack/eslint-config'
import prettier from 'eslint-config-prettier'

const tsPlugin = tanstackConfig.find((c) => c.plugins?.['@typescript-eslint'])?.plugins?.['@typescript-eslint']
const importPlugin = tanstackConfig.find((c) => c.plugins?.['import'])?.plugins?.['import']

/** @type {import('typescript-eslint').ConfigArray} */
export default [
  ...tanstackConfig,
  prettier,
  {
    plugins: {
      ...(tsPlugin ? { '@typescript-eslint': tsPlugin } : {}),
      ...(importPlugin ? { import: importPlugin } : {}),
    },
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
