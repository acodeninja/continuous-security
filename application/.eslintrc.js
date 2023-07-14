module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: [
    'tests/fixtures/*',
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'quote-props': [
      'error',
      'as-needed',
    ],
    'max-len': [
      'error',
      {code: 100},
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_'},
    ],
  },
};
