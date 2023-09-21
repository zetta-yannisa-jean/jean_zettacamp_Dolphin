// "Update your book purchasing API with collection & model for book.
// Try to implement an endpoint for the CRUD process of books.

// "Implement MongoDB and mongoose to book purchasing api
// - Able to connect REST Api to mongodb (3)
// - Create collection/model for book (2)"

// "Implement CRUD operation with mongoose and express
// - Implement create operation endpoint (1)
// - Implement read operation endpoint (2)
// - Implement update operation endpoint (1)
// - Implement delete operation endpoint (1)"

const express = require('express');
const jwt = require('jsonwebtoken');
const { profileModel, bookModel } = require('./app');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((data) => data.username === username && data.password === password);

  if (user) {
    try {
      const token = jwt.sign(user, 'thisissecret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error signing JWT:', error);
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({ error: 'Username or password is incorrect' });
  }
});

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'You didnt input the token' });
  }

  jwt.verify(token, 'thisissecret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: err.message });
    }
    req.user = user;
    next();
  });
}

//book purchasing
let takeBook = fs.readFileSync('./book.txt');
let book = JSON.parse(takeBook);
let takeUsers = fs.readFileSync('./users.txt');
let users = JSON.parse(takeUsers);

let creditInfo;
let monthlyPayment;
let purchaseInfo;
let listTermAmount;
let listTerm;
let listTermAsObject;
let totalPrice;
let termToPay;

//function bookPurchase: Calculate the total price for the purchased books
const bookPurchase = async (book, bookIndex, bookAmount, applyCredit, additionalPrice, additionalPriceMonth, termCheck) => {
  const selectedBook = book[bookIndex];
  const disc = 15 / 100;
  const tax = 10 / 100;
  const discountAmount = selectedBook.price * disc;
  const priceAfterDiscount = selectedBook.price - discountAmount;
  const taxAmount = priceAfterDiscount * tax;
  const priceAfterTax = priceAfterDiscount + taxAmount;
  totalPrice = priceAfterTax * bookAmount;
  const creditTerms = await calculateCreditTerms(totalPrice, applyCredit, additionalPrice, additionalPriceMonth, termCheck);
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
      creditInfo: creditTerms,
      listTermAmount,
      listTerm: listTermAsObject,
      termToPay: termToPay
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
  return purchaseInfo;
}

//function calculateCreditTerms
const calculateCreditTerms = async (totalPrice, applyCredit, additionalPrice, additionalPriceMonth, termCheck) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  creditInfo = [];
  dueDate = [];
  monthlyPayment = Math.floor(totalPrice / applyCredit);
  const remains = totalPrice % applyCredit;

  for (let i = 1; i <= applyCredit; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i * 30);
    dueDate.push(currentDate);
    const formatDate = `${dueDate[i - 1].getDate()} ${months[dueDate[i - 1].getMonth()]} ${dueDate[i - 1].getFullYear()}`;
    creditInfo.push({
      month: formatDate,
      year: currentDate.getFullYear(),
      amount: monthlyPayment
    });
  }

  creditInfo[creditInfo.length - 1].amount += remains;

  listTermAmount = [...new Set(creditInfo.map(amount => amount.amount))]

  listTerm = new Map();
  for (const term of creditInfo) {
    listTerm.set(term.month, { amount: term.amount, month: term.month })
  }

  listTermAsObject = {};
  listTerm.forEach((value, key) => {
    listTermAsObject[key] = value;
  });

  termToPay = listTerm.get(termCheck);

  if (!listTermAsObject[termCheck]) {
    termToPay = {};
  }

  if (additionalPriceMonth <= applyCredit && creditInfo[additionalPriceMonth - 1].month) {
    creditInfo[additionalPriceMonth - 1].totalAmount = monthlyPayment + additionalPrice;
  } else {
    throw new Error('Additional price month can not be more than apply credit');
  }

  return creditInfo;
};

//function check body
// const areAllValuesNumbers = (body) => {
//   for (const key in body) {
//     if (body[key] < 0 || typeof body[key] !== 'number') {
//       throw new Error('Request body invalid');
//     }
//   }
// }

// const asyncFunction = async () => {
//   for (let i = 1; i <= 5; i++) {
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         fs.readFile('./text.txt', { encoding: 'binary' }, (err, data) => {
//           if (err) {
//             reject({
//               status: 400,
//               message: `${err.path} isn't found`
//             });
//           } else {
//             console.log(data); // Log the file contents
//             resolve(data);
//           }
//         })
//       }, 2000)
//     });
//   }
// };

// const asyncFunction = async () => {
//   for (let i = 1; i <= 5; i++) {
//     await new Promise((resolve, reject) => {
//       fs.readFile('./text.txt', { encoding: 'binary' }, (err, data) => {
//         if (err) {
//           reject({
//             status: 400,
//             message: `${err.path} isn't found`
//           });
//         } else {
//           console.log(data); // Log the file contents
//           resolve(data);
//         }
//       });
//     });
//     await new Promise(resolve => setTimeout(resolve, 2000));
//   }
// };

// const asyncFunction = async () => {
//   for (let i = 1; i <= 5; i++) {
//     console.log(`This is looping ${i}`);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//   }
// };

// const asyncFunction = async () => {
//   for (let i = 1; i <= 5; i++) {
//     try {
//       const data = await fs.promises.readFile('./text.txt', { encoding: 'binary' });
//       // Lakukan sesuatu dengan 'data' yang dibaca dari berkas di sini
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }

//     await new Promise((resolve) => setTimeout(resolve, 2000));
//   }
// };

// app.get('/await', async (req, res) => {
//   try {
//     console.log('Calling endpoint await');
//     await asyncFunction(); // Call the new asynchronous function with await
//     console.log('Endpoint await completed');
//     res.send('Endpoint await completed');
//   } catch (error) {
//     console.error('Error during looping:', error);
//     return res.status(400).send({ error: error.message });
//   }
// });

// app.get('/unawait', (req, res) => {
//   try {
//     console.log('Calling endpoint without await');
//     asyncFunction(); // Call the new asynchronous function without await
//     console.log('Endpoint without await completed');
//     res.send('Endpoint without await completed');
//   } catch (error) {
//     console.error('Error during looping:', error);
//     return res.status(400).send({ error: error.message });
//   }
// });

// app.get('/endpoint2', (req, res) => {
//   console.log('Calling endpoint 2');
//   asyncFunction()
//     .then(() => {
//       console.log('Endpoint 2 completed');
//       res.send('Endpoint 2 completed');
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       return res.status(400).send({ error: error.message });
//     });
// });

app.post('/purchase', verifyToken, async (req, res) => { //purchase endpoint
  try {
    let { bookIndex, bookAmount, applyCredit, additionalPrice, additionalPriceMonth, termCheck } = req.body;
    // areAllValuesNumbers(req.body);

    if (bookIndex === undefined || bookAmount === undefined || applyCredit === undefined || additionalPrice === undefined || additionalPriceMonth === undefined) {
      throw new Error('Required parameters are missing');
    }
    // Check if the bookIndex is valid
    if (bookIndex < 0 || bookIndex >= book.length) {
      throw new Error('There is no book with this title');
    }

    const selectedBook = book[bookIndex];
    // Check if there is enough stock for the selected book
    if (selectedBook.stock < bookAmount) {
      throw new Error(`Sorry, there is not enough stock for ${selectedBook.title}. Available stock: ${selectedBook.stock}`);
    }

    let purchase = await bookPurchase(book, bookIndex, bookAmount, applyCredit, additionalPrice, additionalPriceMonth, termCheck);

    res.status(200).send({
      message: purchase
    })

  } catch (error) {
    console.error('Error during purchase:', error);
    return res.status(400).send({ error: error.message });
  }
});

app.post('/create', async (req, res) => {
  try {
    const { title, author, stock, price, userId } = req.body;
    const books = new bookModel({ title, author, price, stock, owner: userId });
    await books.save();
    await books.populate('owner', 'name-_id').execPopulate();
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('An error occurred:', error);
  }
});

app.post('/createMany', async (req, res) => {
  try {
    const bookArray = req.body; //req.body is an array of book objects

    // Create an array to store the created books
    const createdBooks = [];

    // Loop through the bookArray and create each book
    for (const bookData of bookArray) {
      const { title, author, stock, price, userId } = bookData;
      const book = new bookModel({ title, author, price, stock, owner: userId });
      await book.save();
      await book.populate('owner', 'name-_id').execPopulate();
      createdBooks.push(book);
    }
    res.status(201).json(createdBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('An error occurred:', error);
  }
});


app.get('/read', async (req, res) => { //find all
  try {
    const books = await bookModel.find({}).populate('owner', 'name-_id');
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('An error occurred:', error);
  }
});

app.post('/read/:id', async (req, res) => { //find one by id
  try {
    const books = await bookModel.findById(req.params.id).populate('owner', 'name-_id');
    res.status(201).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error('An error occurred:', error);
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const { title, author, stock, price, userId } = req.body;
    const books = await bookModel.findByIdAndUpdate(
      req.params.id,
      { title, author, stock, price, owner: userId },
      { new: true }).populate('owner', 'name-_id')
    if (!books) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const books = await bookModel.findByIdAndRemove(req.params.id);
    if (!books) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete item' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});