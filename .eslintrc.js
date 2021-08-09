module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-empty': 1,
    'react/prop-types': 0,
    'react/jsx-key': 0,
    'react/display-name': 0, // Disable temporarily
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': [
      2,
      { 'ts-ignore': 'allow-with-description' },
    ],
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-explicit-any': 2,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
