// Criteria for Today:

// Implement asynchronous function
// - Create new function using asynchronous function
// - Able to calculate terms of credit
// - Display response of calculation for each terms in postman

// Implement calling asynchronous function using await
// - Have new parameter for additional price
// - Call the function using await keyword
// - Display response of calculation for each terms in postman

const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello world')
// });

app.use(express.json());

//basic authentication 
const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const userPass = authHeader.split(' ')[1];
  const credentials = Buffer.from(userPass, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username === 'admin' && password === 'password') {
    next();
  } else {
    res.status(401).send({ error: 'You are not authorized' });
  }
};

//book purchasing
const book = [
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 400000,
    stock: 10,
  },
  {
    title: 'Catching Fire',
    author: 'Suzanne Collins',
    price: 500000,
    stock: 15,
  },
  {
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    price: 600000,
    stock: 8,
  },
];

let dueDates;
let monthlyPayment;
let purchaseInfo;

app.post('/purchase', basicAuth, async (req, res) => {    //purchase endpoint
  async function calculateCreditTerms(totalPrice, applyCredit, additionalPrice, additionalPriceMonth) {  //async function of calculate the credit term
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    dueDates = [];
    monthlyPayment = (totalPrice / applyCredit);

    for (let i = 1; i <= applyCredit; i++) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + i);
      dueDates.push({
        month: months[currentDate.getMonth()],
        year: currentDate.getFullYear(),
        amount: monthlyPayment
      });
    }

    try {
      if (additionalPriceMonth <= applyCredit && dueDates[additionalPriceMonth - 1].month) {
        dueDates[additionalPriceMonth - 1].totalAmount = monthlyPayment + additionalPrice;
      } else {
        throw new Error('Additional price month can not be more than apply credit');
      }
    } catch (error) {
      console.error('Error during purchase:', error);
      return res.send({ error: error.message });
    }
    return dueDates;
  }

  try {
    function areAllValuesNumbers(body) {
      for (const key in body) {
        if (typeof body[key] !== 'number') {
          throw new Error('Request body have to be number');
        }
      }
    }

    areAllValuesNumbers();

    let { bookIndex, bookAmount, applyCredit, additionalPrice, additionalPriceMonth } = req.body;

    if (bookIndex === undefined || bookAmount === undefined || applyCredit === undefined || additionalPrice === undefined || additionalPriceMonth === undefined) {
      throw new Error('Required parameters are missing');
    }

    const selectedBook = book[bookIndex];

    // Check if the bookIndex is valid
    if (bookIndex < 0 || bookIndex >= book.length) {
      return res.status(400).send({ error: 'There is no book with this title' });
    }

    // Check if there is enough stock for the selected book
    if (selectedBook.stock < bookAmount) {
      return res.status(400).send({
        error: `Sorry, there is not enough stock for ${selectedBook.title}. Available stock: ${selectedBook.stock}`
      });
    }

    // Calculate the total price for the purchased books
    const disc = 10 / 100;
    const tax = 5 / 100;
    const discountAmount = selectedBook.price * disc;
    const priceAfterDiscount = selectedBook.price - discountAmount;
    const taxAmount = priceAfterDiscount * tax;
    const priceAfterTax = priceAfterDiscount + taxAmount;
    let totalPrice = priceAfterTax * bookAmount;
    const creditTerms = await calculateCreditTerms(totalPrice, applyCredit, additionalPrice, additionalPriceMonth);
    let remainingStock = `You purchased ${bookAmount} book(s). Remaining stock is ${selectedBook.stock - bookAmount} book(s).`;

    if (applyCredit) {

      purchaseInfo = {
        bookTitle: selectedBook.title,
        bookAuthor: selectedBook.author,
        price: selectedBook.price,
        discountAmount,
        priceAfterDiscount,
        taxAmount,
        priceAfterTax,
        additionalPrice,
        totalPrice,
        stock: selectedBook.stock,
        remainingStock,
        dueDates: creditTerms,
      };
    } else {
      totalPrice += additionalPrice;
      purchaseInfo = {
        bookTitle: selectedBook.title,
        bookAuthor: selectedBook.author,
        price: selectedBook.price,
        discountAmount,
        priceAfterDiscount,
        taxAmount,
        priceAfterTax,
        additionalPrice,
        totalPrice,
        stock: selectedBook.stock,
        remainingStock
      };
    }

    // selectedBook.stock -= bookAmount;
    return res.send(purchaseInfo);
  } catch (error) {
    console.error('Error during purchase:', error);
    return res.status(400).send({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
