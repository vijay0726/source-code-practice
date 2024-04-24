/**
 * 解释器中的变量对象
 */

class Variable {
  /**
   * 
   * @param {*} kind 变量类型
   * @param {*} value 变量值
   */
  constructor(kind, value) {
    this.kind = kind
    this._value = value
  }

  get value() {
    return this._value
  }

  set value(val) {
    this._value = val
  }
}

Variable.Kind = {
  VAR: 'var',
  LET: 'let',
  CONST: 'const'
}

module.exports = Variable