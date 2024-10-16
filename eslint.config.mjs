// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import markdown from 'eslint-plugin-markdown';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown',
    rules: {
      'no-inline-html': 'off',
      'no-unused-expressions': 'off',
      'no-undef': 'off',
    },
  },
);
