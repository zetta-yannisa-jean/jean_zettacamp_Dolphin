// Update your book purchasing function to have parameter amount of stock & amount of purchased book.Then calculate total price & display the result.

//   Note:
// The function must have at least:
// for loop iteration
// break when amount of book is already out of stock
// Display text if amount of book after purchasing can be purchased again or not

let book = [
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 400000,
    stock: 10
  },
  {
    title: 'Catching Fire',
    author: 'Suzanne Collins',
    price: 500000,
    stock: 15
  },
  {
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    price: 600000,
    stock: 8
  }
];

function bookPurchase(bookDetail, discount, tax, stock, bookAmount) {
  const discountAmount = bookDetail.price * discount / 100;
  const discountPrice = bookDetail.price - discountAmount;
  const taxAmount = discountPrice * tax / 100;
  const taxPrice = discountPrice + taxAmount;

  let bookInfo = console.log(`
  Title of the book: ${bookDetail.title}
  Author of the book: ${bookDetail.author}
  Price of the book: ${bookDetail.price}
  Amount of discount: ${discountAmount}
  Price after discount: ${discountPrice}
  Amount of tax: ${taxAmount}
  Price after tax: ${taxPrice}`);

  for (let i = 0; i < bookAmount; i++) {
    let remainingStock = stock - i;
    if (remainingStock <= 0) {
      console.log(`Sorry, there is not enough stock for ${bookDetail.title}. Available stock: ${stock}`);
      break;
    }

    let totalPrice = taxPrice;

    console.log(`
      Total price for ${i + 1} book(s): ${totalPrice * (i + 1)}
      Remaining stock for ${bookDetail.title}: ${remainingStock - 1}
    `);
  }
}

bookPurchase(book[0], 10, 5, book[0].stock, 11);

