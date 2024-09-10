module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2.79' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'semi': ['error', 'always'],
    'react/prop-types': 'off',
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
    'indent': ['error', 2, { SwitchCase: 1 }], // 2 espacios para la indentación, 1 nivel para los cases de switch
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'quotes': ['error', 'single', { avoidEscape: true }], // Usar comillas simples
    'eol-last': ['error', 'always'],
  },
};