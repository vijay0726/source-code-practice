// const obj = {
//   text: { a: 1 },
// };

// function effect(params) {
//   let obj2 = { ...params };
//   obj2.text.a = 2;
//   console.log(obj);
// }

// effect(obj);

// const deps = new Set()

// deps.add('a', 1)
// deps.add('b', 1)

// console.log(deps, deps.size)

// deps.delete('a')

// console.log(deps, deps.size)

// deps.delete('b')
// console.log(deps, deps.size)

/* 测试代理Set */
const s = new Set([1, 2, 3]);
const p = new Proxy(s, {
  get(target, key, receiver) {
    console.log("receiver: ", receiver);
    console.log("target: ", target);
    console.log("target === receiver ", target === receiver);
    /**
     *
     * Reflect.get(target, key, receiver) 绑定receiver，可以避免 对象属性中互相依赖的问题
     * 例如：
     * {
     *   bar: 1,
     *   get foo() {
     *     return this.bar
     *   }
     * }
     * @explain
     * 然而这里可以确定Set,Map 的size属性不会依赖当前对象的其他属性，而Proxy对象无法调用size属性，所以这里直接返回target即可
     */
    return Reflect.get(target, key, target);
  },
});

console.log(p.size);


// const obj = {
//   forEach : () => {
//     this.forEach((value, key, target) => {

//     })
//   }
// }
