/**
 * write a function that returns true if there's duplicate in the array, and false otherwise.
 * SEE EXAMPLE BELLOW!
 *
 *
Example
console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
console.log(containsDuplicate([1, 2, 3, 4])); // Output: false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true

 * Determines if the array contains any duplicate value.

 * @param {number[]} nums - The input array of integers.
 * @return {boolean} Returns true if the array contains any duplicate value, false otherwise.
 */

// function containDuplicate(nums) {
//   const numbers = {}; // Object to store encountered characters

//   for (const numbs of nums) {
//     if (numbers[numbs]) {
//       return true;
//     }
//     numbers[numbs] = true;
//   }

//   return false;
// }

// function containDuplicate(nums) {
//   const numbers = {};
//   let hasDuplicate = false;

//   nums.forEach(function (dupe) {
//     if (numbers[dupe]) {
//       hasDuplicate = true;
//       return;
//     }
//     numbers[dupe] = true;
//   });

//   console.log(numbers)
//   return hasDuplicate;
// }

// console.log(containDuplicate([1, 2, 3, 1])); // Output: true
// console.log(containDuplicate([1, 2, 3, 4])); // Output: false
// console.log(containDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true

// "Completing the logic test :
// - Result for the logic test as expected -> able to differentiate duplicate data in array
// - Explain line by line of code on the logic test
// - Define duplicate data value that specified (Number Based on Logic Test or from Mentor)"

function containDuplicate(nums) {
  const numbers = {};
  let hasDuplicate = false;

  nums.forEach(function (dupe) {
    const key = (typeof dupe) + dupe;
    if (numbers[key]) {
      hasDuplicate = true;
      return;
    }
    numbers[key] = true;
  });

  return hasDuplicate;
}

console.log(containDuplicate(['1', 2, 3, 1])); // Output: true
console.log(containDuplicate([1, 2, 3, 4])); // Output: false
console.log(containDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true
