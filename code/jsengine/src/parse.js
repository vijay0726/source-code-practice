/** 语法分析器 */

const acorn = require('acorn')

const parse = (code) => {
  return acorn.parse(code)
}

module.exports = parse