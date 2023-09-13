// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send(bookPurchase(book[0], 10, 5, book[0].stock, 4, 5))
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// "Setup and install Express.js
// Able to run and can listen for request in specific port"

// "Able to implement REST Api with express.js
// - Create api endpoint for purchasing book
// - Utilitize input from body payload as parameter
// - Implement return a response from the api endpoint"

// "Able to make a simple authentication functionality for the api
// - Implement basic authentication
// - Block purchasing book functionality if not authenticated"""

// Transform your your book purchasing function tor REST API with Basic Authentication

const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello world')
})
// Middleware for parsing JSON requests
app.use(express.json());

// Middleware for basic authentication
const basicAuth = (req, res, next) => {

  const authHeader = req.headers.authorization; //get the authorization header that was sent by the client
  const userPass = authHeader.split(' ')[1]; //auth = "Basic <encoded username:password>" get userpass via split and access index 1
  const credentials = Buffer.from(userPass, 'base64').toString('ascii'); //decode userpass to "username:password"

  const [username, password] = credentials.split(':'); //get username and password

  if (username === 'admin' && password === 'password') {
    next(); // Authentication succeeded
  } else {
    res.status(401).send({ error: 'Your not authorized' });
  }
};

//book data
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
let purchaseInfo;

const checkParams = (req, res, next) => {
  const requiredParams = ['bookIndex', 'bookAmount'];
  const missingParams = [];

  for (const param of requiredParams) {
    if (!req.body[param]) {
      missingParams.push(param);
    }
  }
  // console.log(missingParams);
  if (missingParams.length > 0) {
    return res.status(400).send({ error: `Inputted data need to be filled: ${missingParams.join(', ')}` })
  }
  next();
};

// Define the purchase endpoint
app.post('/purchase', basicAuth, checkParams, (req, res) => {
  // Retrieve input data from the request body
  let { bookIndex, bookAmount, applyCredit } = req.body;
  // Retrieve the selected book
  const selectedBook = book[bookIndex];

  // if (bookAmount == 0) {//pengkondisian jumlah buku dibeli = 0
  //   return res.status(400).json({ error: `You don't purchase any book. You still can purchase this book, Available stock: ${selectedBook.stock}` });
  // }

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
  const discountPrice = selectedBook.price - discountAmount;
  const taxAmount = discountPrice * tax;
  const taxPrice = discountPrice + taxAmount;
  const totalPrice = taxPrice * bookAmount;

  // Check if the user wants to apply credit
  if (applyCredit) {
    // Calculate due dates for credit payments
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dueDates = [];
    const monthlyPayment = totalPrice / applyCredit;

    for (let i = 1; i <= applyCredit; i++) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + i);
      dueDates.push({
        month: months[currentDate.getMonth()],
        year: currentDate.getFullYear(),
        amount: monthlyPayment,
      });
    }

    purchaseInfo = {
      bookTitle: selectedBook.title,
      bookAuthor: selectedBook.author,
      price: selectedBook.price,
      discountAmount,
      discountPrice,
      taxAmount,
      taxPrice,
      totalPrice,
      dueDates,
    };

  } else {
    // No credit applied
    purchaseInfo = {
      bookTitle: selectedBook.title,
      bookAuthor: selectedBook.author,
      price: selectedBook.price,
      discountAmount,
      discountPrice,
      taxAmount,
      taxPrice,
      totalPrice,
    };
  }
  return res.send(purchaseInfo);
  // // Update the stock of the purchased book
  // selectedBook.stock -= bookAmount;
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






//
// // if (selectedBook && selectedBook.stock !== undefined) {
// //   // Sekarang aman untuk mengakses properti 'stock'
// // } else {
// //   // Handle kasus ketika objek tidak ada atau 'stock' tidak terdefinisi
// //   // Misalnya, kirimkan respons kesalahan kepada klien
// //   return res.status(404).json({ error: 'Book not found' });
// // }
