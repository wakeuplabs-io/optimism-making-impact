const pluginJs = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['**/*.d.ts', 'dist', 'public', '**.config.js'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-prototype-builtins': 'warn',
      '@typescript-eslint/ban-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '(^_)' }],
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
];
