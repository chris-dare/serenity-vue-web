module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extra-boolean-cast': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // Force this rules for auto fix
    'space-before-function-paren': 0,
    quotes: [2, 'single', 'avoid-escape'],
    semi: [2, 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    camelcase: 'off',
    'promise/no-nesting': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
}
