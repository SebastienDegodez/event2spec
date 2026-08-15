// The project owns this file. The skill only contributes the layer rules,
// which are appended to the existing setup.
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import cleanArchitecture from './eslint/clean-architecture.js'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'eslint/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...cleanArchitecture({ root: 'src' }),
]
