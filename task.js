// Based on the due date that was generated on JS Day 5, update the function to calculate the amount of payment for each month using array function. Then display the data as an array of objects that have values due date of payment and amount of payment, be careful the total amount of payment must be the same as total price of books purchased.

// "Understand and create function with object in JavaScript
// - Calculate the amount of payment for each month
// - Display the result as array of object"
// "Implementation conditional statement and array function :
// - Calculate term using array function
// - Total amount of payment must be the same as total price of books purchased"

let book = [
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 400000,
    stock: 4
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

bookPurchase(book[0], 10, 5, book[0].stock, 5, 6);

function bookPurchase(bookDetail, discount, tax, stock, bookAmount, applyCredit) {
  
  //mulai hitung harga
  const discountAmount = bookDetail.price * discount / 100;
  const discountPrice = bookDetail.price - discountAmount;
  const taxAmount = discountPrice * tax / 100;
  const taxPrice = discountPrice + taxAmount;
  //selesai hitung harga

  //menampilkan harga
  console.log(`
  Title of the book: ${bookDetail.title}
  Author of the book: ${bookDetail.author}
  Price of the book: ${bookDetail.price}
  Amount of discount: ${discountAmount}
  Price after discount: ${discountPrice}
  Amount of tax: ${taxAmount}
  Price after tax: ${taxPrice}`);
 
  //mulai hitung harga berdasarkan stok dan book amount
  let purchaseInfo; //variabel kosong untuk hasil akhir
  let totalPrice;
  let arrTotalPrice =[];
  if (bookAmount == 0) { //pengkondisian jumlah buku dibeli = 0
    purchaseInfo = console.log(`
    You don't purchase any book.
    You still can purchase this book, Available stock: ${stock}`);
  } else { //pengkondisian buku dibeli lebih dari 0
    for (let i = 0; i < bookAmount; i++) { //perulangan ketika book amount bernilai
      if (stock <= 0) {
        purchaseInfo = console.log(`Sorry, there is not enough stock for ${bookDetail.title}. Available stock: ${stock}`);
        break;
      }

      totalPrice = taxPrice * (i + 1);
      arrTotalPrice.push(totalPrice);
            
      console.log(`
      Total price for ${i + 1} book(s): ${totalPrice}`);
      stock--;

      if (stock > 0) { //pengkondisian ketika book amount lebih kecil dari stock, stok bersisa
        purchaseInfo = console.log(`
        You still can purchase this book.
        Available stock: ${stock}`);

      } else { //pengkondisian ketika book amount lebih besar dari stok, stok tidak mencukupi
        purchaseInfo = console.log(`
        You cannot purchase this book again.
        Available stock: ${stock}`);
        break;
      }
    }
  }

  // arrTotalPrice.push(totalPrice); //untuk map

  //mulai hitung bulan credit
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dueDate = [];
  const creditTerm = [];

  for (let i = 1; i <= applyCredit; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i * 30);
    dueDate.push(currentDate);
    const formatDate = `${dueDate[i - 1].getDate()} ${months[dueDate[i - 1].getMonth()]} ${dueDate[i - 1].getFullYear()}`;
    // const creditInfo = (`For ${i} month(s) credit, due date will be on ${formatDate}`);

    // let pricePerMonth = totalPrice / applyCredit;
    // let pricePerMonth = arrTotalPrice[arrTotalPrice.length-1] / applyCredit;
    // let pricePerMonth = arrTotalPrice.map((price,index)=> index===arrTotalPrice.length-1? price/applyCredit : price);
    
    let pricePerMonth = arrTotalPrice.slice(-1)[0]/applyCredit;
    const creditInfo = {
      term : `Month ${i}`,
      due : `Due date will be on ${formatDate}`,
      price : `Total price per month: ${pricePerMonth}`,
      paid : `Total price should already paid : ${pricePerMonth * i}`
    }
    creditTerm.push(creditInfo);
  }
  //selesai hitung bulan credit
  console.log(`
  You are chosing the ${applyCredit} month(s) credit term.
  You can see the credit term below:`);
  console.log(creditTerm);

  return purchaseInfo;
}
