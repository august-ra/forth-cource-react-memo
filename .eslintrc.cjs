module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'react-app',
    'react-app/jest',
  ],
  ignorePatterns: [ 'dist', '.eslintrc.cjs' ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    '@stylistic/js',
    'react-refresh',
  ],
  rules: {
    '@stylistic/js/arrow-parens': [ 'error', 'always' ],
    '@stylistic/js/arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
    '@stylistic/js/comma-dangle': [ 'error', 'always-multiline' ],
    '@stylistic/js/function-call-spacing': [ 'error', 'never' ],
    '@stylistic/js/indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    '@stylistic/js/key-spacing': [ 'error', { 'align': 'value' } ],
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/object-curly-spacing': [ 'error', 'always' ],
    '@stylistic/js/operator-linebreak': [ 'error', 'before', {
      'overrides': {
        '=': 'ignore',
        '+=': 'ignore',
        '-=': 'ignore',
        '*=': 'ignore',
        '/=': 'ignore',
        '%=': 'ignore',
      }
    } ],
    '@stylistic/js/rest-spread-spacing': [ 'error', 'never' ],
    '@stylistic/js/semi': [ 'error', 'never', { 'beforeStatementContinuationChars': 'never' } ],
    'camelcase': [ 'error', { 'allow': [ '^unit_' ] } ],
    'eqeqeq': [ 'error', 'always' ],
    'no-unused-vars': [ 'error' ],
  },
}
