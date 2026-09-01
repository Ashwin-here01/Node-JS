const math = require("./Math");
const me = require("./Multiple_Export");
// const {sumFn, subFn} = require("./Math"); // Destructuring

console.log(math.add(2,5));
console.log(math.sub(2,5));

// console.log(sumFn(1, 2));
// console.log(subFn(2, 1));

console.log(me);
console.log(me.add(10, 20));
console.log(me.sub(10, 20));