import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import {defineConfig} from 'eslint/config';
import googleConfig from 'eslint-config-google';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.min.js'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {js},
    extends: ['js/recommended', googleConfig],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {globals: globals.browser},
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    rules: {
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'max-len': [
        'error',
        {
          code: 100,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
        },
      ],
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: 'import', next: '*'},
        {blankLine: 'any', prev: 'import', next: 'import'},
      ],
    },
  },
]);
