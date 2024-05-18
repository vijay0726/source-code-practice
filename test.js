// const obj = {
//   text: { a: 1 },
// };

// function effect(params) {
//   let obj2 = { ...params };
//   obj2.text.a = 2;
//   console.log(obj);
// }

// effect(obj);

const deps = new Set()

deps.add('a', 1)
deps.add('b', 1)

console.log(deps, deps.size)

deps.delete('a')

console.log(deps, deps.size)

deps.delete('b')
console.log(deps, deps.size)
