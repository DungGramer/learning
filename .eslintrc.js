module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 0,
    'no-console': 'warn',
    'comma-dangle': 0,
    'prettier/prettier': 'error',

    '@typescript-eslint/no-unused-vars': 'error',
    // to enforce using type for object type definitions, can be type or interface
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
};
