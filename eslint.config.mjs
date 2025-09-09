// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    {ignores: ['**/local', 'eslint.config.mjs', 'playwright-report']},
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            '@stylistic': stylistic,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        rules: {
            // to make life easier
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-dynamic-delete': 'off',
            // stylistic
            '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            // to check formatting
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/semi': 'error',
            '@stylistic/object-curly-spacing': ['error'],
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/block-spacing': ['error', 'never'],
            '@stylistic/brace-style': 'error',
            '@stylistic/eol-last': 'error',
        },
    }
);
