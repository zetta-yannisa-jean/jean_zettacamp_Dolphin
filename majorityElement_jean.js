/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */

// "Completing the logic test : 
// - Result for the logic test as expected -> able to define majority data in array 
// - Explain line by line of code on the logic test
// - Define majority data value that specified (Number Based on Logic Test or from Mentor)"

function majorityElement(nums) {
  const numFrequency = {};                          // objek kosong untuk menyimpan elemen baru yang ditemukan
  
  // menghitung frekuensi setiap elemen dari parameter nums
  for (const num of nums) {
      if (numFrequency[num]) {                      //ketika ditemukan properti dengan key bernama number di dalam objek numFreq
          numFrequency[num]++;                      // value dari properti teresbut ditambah 1.
      } else {
          numFrequency[num] = 1;                    //jika tidak ditemukan, akan dibuat properti baru dengan key bernama number yang sedang diakses, dan diberi nilai 1.
      }
  }
  
  console.log(numFrequency)
  // mencari elemen dengan frekuensi kemunculan tertinggi
  let majority = nums[0];                             // inisialiasi elemen pertama sebagai mayoritas sementara
  let maxFrequency = numFrequency[nums[0]];         // inisialisasi frekuensi elemen pertama pada
 

  for (const prop in numFrequency) {                //meloop properti objek numFrequency
      if (numFrequency[prop] > maxFrequency) {     //jika nilai properti objek
          majority = prop;                         // men-set 
          maxFrequency = numFrequency[prop];
      }
  }
  // const isFrequencyOne = Object.values(numFrequency).every(freq => freq === 1);
  // if (isFrequencyOne) {
  //   return null;
  // }
  return majority;
}

console.log(majorityElement([3, 2, 3,2,-1,-1,-1])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 
console.log(majorityElement(['a','a','b','b','b'])); // Output: 2 

// console.log(majorityElement([2, 2, 3, 3, 1,1,1]));
// console.log(majorityElement([1, 2, 3]));
// console.log(majorityElement([2, 2, 1, 1, 1, 1, 2, 2]));

