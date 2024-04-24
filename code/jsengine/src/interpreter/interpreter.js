const Scope = require("./scope");

class Interpreter {
  constructor(visitor) {
    this.visitor = visitor;
    this.scope = Interpreter.createScope()
  }

  interpreter(node) {
    this.visitor.visitNode(node, this.scope)
  }

  static createScope() {
    return new Scope(Scope.Type.GLOBAL)
  }
}

module.exports = Interpreter;