/**
 *
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 */

function isPrime(n) {
  if (n < 2) {
    return false;         //angka prima mulai dari 2
  } else {
    for (let i = 2; i < n; i++) { //inisialiasi var i sebagai pembagi
      if (n % i == 0) {           //mengecek apakah n dapat dibagi nilai selain dirinya sendiri
        return false;
      }
    }
    return true;
  }
}

console.log(isPrime(3));
console.log(isPrime(43));
// function isPrime(n) {
//   let modNumber = 0;
//   for (let i = 1; i <= n; i++) {
//     if (n % i == 0) {
//       modNumber++
//     }
//     console.log(`Iterasi ke - ${ i }, modNumber: ${ modNumber }`);
//   }
//   if (modNumber == 2) {
//     return 'Prima'
//   } else {
//     return 'Bukan prima'
//   }
// }

// console.log(isPrime(3));
// console.log(isPrime(43));




// function isPrime(n) {
//   let a = n <= 1;
//   let b = n == 2;
//   let mod2 = n % 2 != 0 ? 'prima' : 'bukan prima';
//   let modNumber = n%

//   console.log(a);
//   console.log(b);
//   return (a && b) ? 'benar' : 'salah';
// }

// console.log(isPrime(10));
// console.log(isPrime(43));

// function isPrime(number) {
//   if (number <= 1) {
//     return false;
//   }

//   if (number <= 3) {
//     return true;
//   }

//   if (number % 2 === 0 || number % 3 === 0) {
//     return false;
//   }

//   if (number === 2 || number === 3) {
//     return true;
//   }

//   return checkPrime(number, 5);
// }

// function checkPrime(number, i) {
//   if (i * i > number) {
//     return true;
//   }

//   if (number % i === 0 || number % (i + 2) === 0) {
//     return false;
//   }

//   return checkPrime(number, i + 6);
// }

// console.log(isPrime(10));
// console.log(isPrime(43));
