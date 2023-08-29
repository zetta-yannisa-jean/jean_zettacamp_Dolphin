/*
Title: Unique Characters

Description:
Write a function named hasUniqueCharacters that takes a string as input and returns true if the string contains all unique characters, and false otherwise. You can assume that the string contains only lowercase alphabets (a-z).

Example:
console.log(hasUniqueCharacters("abcdefg")); // Output: true
console.log(hasUniqueCharacters("hello")); // Output: false
*/

function hasUniqueCharacters(str) {
  const characters = {}; // Object to store encountered characters

  for (const char of str) {
    if (characters[char]) {
      return false;
    }
    characters[char] = true;
  }

  return true; // All characters are unique
}

console.log(hasUniqueCharacters("abcdefg"));
console.log(hasUniqueCharacters("hello"));


