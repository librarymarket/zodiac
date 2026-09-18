import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tsdoc from 'eslint-plugin-tsdoc';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@stylistic': stylistic,
      tsdoc,
    },
    rules: {
      complexity: ['error', 5],
      '@stylistic/indent': ['error', 2],
      '@stylistic/padded-blocks': ['error', { classes: 'always' }],
      '@stylistic/lines-between-class-members': ['error', 'always'],
      '@stylistic/semi': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'public-static-field',
              'public-instance-field',
              'public-constructor',
              'private-static-field',
              'private-instance-field',
              'private-constructor',
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method',
            ],
            order: 'alphabetically',
          },
        },
      ],
      'tsdoc/syntax': 'warn',
    },
  },
);
