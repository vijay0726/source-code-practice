/** 解释器 */

const acorn = require('acorn')
const Visitor = require('./visitor')
const Interpreter = require('./interpreter')

/**
 * 解释器入口
 * @param {*} code 
 * @param {*} ecmaVersion 
 * @returns 
 */
module.exports = (code, ecmaVersion = '2020') => {
  // code -> ast
  const ast = acorn.parse(code, { ecmaVersion, sourceType: "script", })
  console.log('ast: ', ast)
  const visitor = new Visitor()
  const interpreter = new Interpreter(visitor)
  return interpreter.interpreter(ast)

}