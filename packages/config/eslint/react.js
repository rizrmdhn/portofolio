import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import base from './base.js'

export default [
  ...base,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: { version: 'detect' },
    },
  },
  reactPlugin.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
]
