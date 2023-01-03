module.exports = {
  root: true,
  extends: ['standard', 'plugin:vue/essential', 'plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['html', 'standard', 'vue'],
  env: {
    browser: true
  },
  rules: {
    'vue/multi-word-component-names':0,
    'no-mixed-spaces-and-tabs': 0,
    'generator-star-spacing': 'off',
    indent: ['error', 2],
    'no-tabs': 0,
    'brace-style': ['error', '1tbs'],
    'no-console': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    'no-undef': 'error',
    'space-in-parens': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': ['error', 'always'],
    quotes: ['error', 'single'],
    'space-before-blocks': ['error', 'always'],
    'no-empty': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'vue/no-unused-components': ['warn', { ignoreWhenBindingPresent: true }]
  }
}
