module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parserOptions: { ecmaVersion: 8 },
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*'],
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'prettier',
                'plugin:prettier/recommended',
            ],
            rules: {
                'linebreak-style': 'off',
                'no-restricted-syntax': ['off'],
                'no-underscore-dangle': 'off',

                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',
                'react/jsx-sort-props': [
                    'error',
                    {
                        ignoreCase: true,
                    },
                ],
                'react/no-array-index-key': 'off',

                '@typescript-eslint/explicit-module-boundary-types': 'off',

                'prettier/prettier': [
                    'error',
                    {
                        endOfLine: 'auto',
                        printWidth: 100,
                        singleQuote: true,
                        tabWidth: 4,
                    },
                ],
            },
        },
    ],
}