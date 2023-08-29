/**
 *
 * Write a function max_of_two(a, b) that takes in two integers, a and b, and returns the maximum of the two numbers without using any arrays or built-in functions like max().
 *
 */
function maxOfTwo(a, b) {
  return a > b ? a : b;
}

console.log(maxOfTwo(10, 5));
console.log(maxOfTwo(45, 66));

//ex. 2
// function maxOfTwo(a, b) {
//   return a === b ? 'nilai yang anda masukkan sama' : a > b ? a : b;
// }

// console.log(maxOfTwo(5, 5));
// console.log(maxOfTwo(45, 66));

//ex 3
// let maxOfTwo = function (a, b) {
//   if (a > b) {
//     console.log('a');
//     return a;
//   } else {
//     console.log('b');
//     return b;
//   }
// }

// console.log(maxOfTwo(10, 5));
// console.log(maxOfTwo(45, 66));

// function getParameterName(value, parameterMap) {
//   for (const paramName in parameterMap) {
//     if (parameterMap.hasOwnProperty(paramName) && parameterMap[paramName] === value) {
//       return paramName;
//     }
//   }
//   return null; // Return null if the value is not found in the parameterMap
// }

// const parameterMap = {
//   a: 10,
//   b: 20,
//   c: 30
// };

// const valueToFind = 20;

// const paramName = getParameterName(valueToFind, parameterMap);

// if (paramName !== null) {
//   console.log(`The value ${valueToFind} corresponds to parameter ${paramName}`);
// } else {
//   console.log(`Value ${valueToFind} not found in the parameter map`);
// }

