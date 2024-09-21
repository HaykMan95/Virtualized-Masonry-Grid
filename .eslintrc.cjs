module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import'],
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['Pages', './src/Pages'],
                    ['Components', './src/Components'],
                    ['Hooks', './src/Hooks'],
                    ['API', './src/API'],
                    ['Types', './src/Types'],
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'import/order': [
            'error',
            {
                groups: [
                    'external',
                    'builtin',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'node_modules/**',
                        group: 'external',
                        position: 'after',
                    },
                    {
                        pattern: 'Components/**',
                        group: 'internal',
                        position: 'before',
                    },
                    {
                        pattern: './styles/**',
                        group: 'sibling',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
}
