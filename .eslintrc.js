// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-useless-escape': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'handle-callback-err': 0,
    'no-unused-vars': 0, // 不能使用未声明的变量
    'no-unde': 0,
    'no-caller': 0, // 不能使用caller
    'no-new-wrappers': 0, // 不能使用new关键字
    'no-proto': 0,
    'sort-imports': 0,
    'import/first': 0,
    'no-return-await': 0
  }
}
