// "Try create a book purchasing function that has parameters detail of a book, percentage of the discount, percentage of tax. Then display all the parameters with additional data:
// - Amount of discount
// - Price after discount
// - Amount of tax
// - Price after tax
// Note:
// The function must have at least:
// - Constant variable~
// - Boolean, number, string variable
// - Assignment, addition, addition, subtraction, multiplication, division operator

let bookAmount = 2;
let book = [
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 400000
  },
  {
    title: 'Catching Fire',
    author: 'Suzanne Collins',
    price: 500000
  },
  {
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    price: 600000
  }
];

bookPurchase(book[0], 10, 2);             //function hoisted

function bookPurchase(bookDetail, discount, tax) {

  const discountAmount = bookDetail.price * discount / 100;      //all var use assignment | all var is number | const var
  const discountPrice = bookDetail.price - discountAmount;              //substract
  const taxAmount = discountPrice * tax / 100;                   //multipy & division
  const taxPrice = discountPrice + taxAmount;                           //add 
  let totalPrice = bookAmount >= 1 ? taxPrice * bookAmount : 0;         //boolean

  let bookInfo = (`                                                     
  Title of the book: ${bookDetail.title}
  Author of the book: ${bookDetail.author}
  Price of the book: ${bookDetail.price}
  Amount of discount: ${discountAmount}
  Price after discount: ${discountPrice}
  Amount of tax: ${taxAmount}
  Price after tax: ${taxPrice}
  Total price for ${bookAmount} book(s): ${totalPrice}
  `);                                                                   //string 
  console.log(bookInfo);
}





