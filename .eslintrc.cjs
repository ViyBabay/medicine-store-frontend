module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
        'prettier',
        // 'react/react-in-jsx-scope',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    rules: {
        'prefer-const': 'warn',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
                allowConstantExport: true,
            },
        ],
    },
};
