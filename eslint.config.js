import js from '@eslint/js'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, stylistic,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    }
  },
  {
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      //'no-trailing-spaces': 'error',  ///Esta regla no permite espacios al final de una linea, pero quita los espacios al inicio tambien
      'space-infix-ops': 'error',
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'switch-colon-spacing': ['error', { after: true, before: false }],
      'comma-spacing': ['error', { before: false, after: true }],
      'semi-spacing': ['error', { before: false, after: true }],
      'no-use-before-define': 'error',
      'no-const-assign': 'error',
      'no-unreachable': 'error',
      'no-redeclare': 'error',
      'no-constant-condition': 'warn',
      curly: 'warn',
      'no-shadow': 'warn',
      'no-duplicate-imports': 'warn',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn'
    }
  },
  globalIgnores(['./dist/'])
])
