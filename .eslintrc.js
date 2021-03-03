module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/airbnb',
  ],
  globals: {
    $: true,
    Chartist: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['public/*'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-multi-assign': 'off',
    'no-restricted-globals': 'off',
    'max-len': 'off',
    camelcase: 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'no-sequences': 'off',
    'func-names': 'off',
    // vuex
    // use this instead
    // 'no-shadow': ['error', { allow: ['state'] }],
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off',
    'no-restricted-imports': 'off',
    'prefer-destructuring': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'import/no-cycle': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'array-callback-return': 'off',
    'implicit-arrow-linebreak': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
