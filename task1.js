// 1. Form variable JavaScript day 1
// - Use comparison operator with 2 variables from task number 1, display true if the name of books have same name otherwise display false
// 2. Create new 2 variables to contain price of your favourite books
// - Compare the variables which one have the highest price
// - Find the average price from those 2 variables using arithmetic operator
// - Create new variable to use ternary operator to determine the value of variable, if the average price more than 500000 set value with string “Expensive” if less or equal set “Cheap”
let favBook1;
const favBook2 = 'Catching Fire';

favBook1 = 'Maps';

let myFavBooks = `My most favorite book is ${favBook2} and my least favorite book is ${favBook1}.`;
console.log(myFavBooks);

//task 1
// let titleCompare = favBook1 === favBook2;
let titleCompare = favBook1 === favBook2 ? 'The books have same title.' : 'The books have different title.';
console.log(titleCompare);

//task 2
const firstBookPrice = 500000;
const secondBookPrice = 600000;

const highestPrice = (firstBookPrice >= secondBookPrice) * firstBookPrice + (secondBookPrice > firstBookPrice) * secondBookPrice; //part a

// const averagePrice = (firstBookPrice + secondBookPrice) / 2; //part b
let bookPrice = [500000, 600000];
const averagePrice = (bookPrice[0] + bookPrice[1]) / bookPrice.length;

let isExpensive = averagePrice > 500000 ? 'Expensive' : 'Cheap'; //part c

console.log(`The highest price between the two books is Rp${highestPrice}.`);
console.log(`The average price from the two books is Rp${averagePrice} and it is ${isExpensive}.`);

let objAuthor = {
  name: 'Suzzane Collins'
};
objAuthor.nationality = 'American';
console.log(`The author from my favorite book named ${objAuthor.name} and she is an ${objAuthor.nationality}.`);

let author = ['Suzzane Collins', 'Radin Azkia'];
author.push(
  {
    author_num: 3,
    author_name: 'J.K. Rowling'
  });
console.log(`I've read books from author : ${author[0]}, ${author[1]}, and ${author[2].author_name}.`)

console.log(objAuthor);
console.log(author);

// let isAvailable = true;
// isAvailable = isAvailable ? 'available' : 'not available';

// let genre = ['Science Fiction', 'Romance'];
// let publicationYear = [2009, 2016];
// const pubYearDifference = publicationYear[1] - publicationYear[0];

// let mostFavBookDesc = `${author[0]}'s ${favBook2} is ${genre[0]} novel published in ${publicationYear[0]}. This book is ${isAvailable} on almost any e-commerce.`;
// let leastFavBookDesc = `${author[1]}'s ${favBook1} is ${genre[1]} novel published in ${publicationYear[1]}. This book is ${isAvailable} on almost any e-commerce.`;
// let yearDifference = `${favBook1} release ${pubYearDifference} years later from when ${favBook2} released.`;

// let hgSeries = [
//   { series: 'first', title: 'The Hunger Games' },
//   { series: 'second', title: 'The Hunger Games: Catching Fire' },
//   { series: 'third', title: 'The Hunger Games: Mockingjay' },
//   { series: 'fourth', title: 'The Hunger Games: The Ballad of Songbirds & Snakes' },
// ];
// let preSeries = `The ${hgSeries[3].series} series of The Hunger Games called "${hgSeries[3].title}"`;

// console.log(mostFavBookDesc);
// console.log(leastFavBookDesc);
// console.log(yearDifference);
// console.log(preSeries);