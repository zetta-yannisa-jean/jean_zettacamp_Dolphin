let favBook1;
const favBook2 = 'Catching Fire';

favBook1 = 'Maps';

myFavBooks = `My most favorite book is ${favBook2} and my least favorite book is ${favBook1}.`;
console.log(myFavBooks);

let author = ['Suzzane Collins', 'Radin Azkia'];
let isAvailable = true;
isAvailable = isAvailable ? 'available' : 'not available';

let genre = ['Science Fiction', 'Romance'];
let publicationYear = [2009, 2016];
const pubYearDifference = publicationYear[1] - publicationYear[0];

let mostFavBookDesc = `${author[0]}'s ${favBook2} is ${genre[0]} novel published in ${publicationYear[0]}. This book is ${isAvailable} on almost any e-commerce.`;
let leastFavBookDesc = `${author[1]}'s ${favBook1} is ${genre[1]} novel published in ${publicationYear[1]}. This book is ${isAvailable} on almost any e-commerce.`;
let yearDifference = `${favBook1} release ${pubYearDifference} years later from when ${favBook2} released.`;

let hgSeries = [
  { series: 'first', title: 'The Hunger Games' },
  { series: 'second', title: 'The Hunger Games: Catching Fire' },
  { series: 'third', title: 'The Hunger Games: Mockingjay' },
  { series: 'fourth', title: 'The Hunger Games: The Ballad of Songbirds & Snakes' },
];
let preSeries = `The ${hgSeries[3].series} series of The Hunger Games called "${hgSeries[3].title}"`;

console.log(mostFavBookDesc);
console.log(leastFavBookDesc);
console.log(yearDifference);
console.log(preSeries);