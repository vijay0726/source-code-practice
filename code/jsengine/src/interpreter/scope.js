/**
 * 作用域及作用域链
 */

const Variable = require('./variable')

class Scope {
  /**
   *
   * @param {*} type 作用域类型
   * @param {*} parent 父级作用域
   */
  constructor(type, parent) {
    this.parent = parent
    this.type = type
    this.targetScope = new Map() // 当前作用域
  }

  /**
   * 判断变量是否已存在
   * @param {string} rawName 变量名
   * @returns
   */
  hasDefinition(rawName) {
    return this.search(rawName)
  }

  /**
   * 作用域链实现，向上查找标识符
   * @param {*} rawName 
   * @returns
   */
  search(rawName) {
    if (this.targetScope.get(rawName)) {
      return this.targetScope.get(rawName)
    } else if (this.parent) {
      return this.parent.search(rawName)
    }
    return null
  }

  /**
   * 变量声明方法，变量已定义则抛出语法错误异常
   * @param {*} kind 变量类型
   * @param {*} rawName 变量名
   * @param {*} value 变量值
   * @returns
   */
  declare(kind, rawName, value) {
    if (this.hasDefinition(rawName)) {
      console.error(
        `Uncaught SyntaxError: Identifier '${rawName}' has already been declared`
      );
      return
    }

    return {
      [Variable.Kind.VAR]: () => this.defineVar(rawName, value),
      [Variable.Kind.LET]: () => this.defineLet(rawName, value),
      [Variable.Kind.CONST]: () => this.defineConst(rawName, value),
    }[kind]()
  }

  /**
   * 定义 var 类型的变量
   * @param {*} rawName 
   * @param {*} value 
   */
  defineVar(rawName, value) {
    let scope = this
    // 如果不是全局作用域且不是函数作用域，则一直向上找到全局/函数作用域
    // 这里就是常说的Hoisting（变量提升）
    while (scope.parent && scope.type !== Scope.type.FUNCTION) {
      scope = scope.parent
    }
    scope.targetScope.set(rawName, new Variable(Variable.Kind.VAR, value))
  }

  /**
   * let 声明在当前作用域中
   */
  defineLet(rawName, value) {
    this.targetScope.set(rawName, new Variable(Variable.Kind.LET, value))
  }

  /**
   * const 声明在当前作用域中
   * @param {*} rawName 
   * @param {*} value 
   */
  defineConst(rawName, value) {
    this.targetScope.set(rawName, new Variable(Variable.Kind.CONST, value))
  }
}


Scope.Type = {
  GLOBAL: 'global',
  FUNCTION: 'function',
  BLOCK: 'block',
}

module.exports = Scope