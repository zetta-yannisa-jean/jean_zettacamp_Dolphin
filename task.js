// Update your book purchasing function to add parameter for the total duration of credit (indicating the credit term length in months) and calculate the due date for each month Starting from the next month when you work on this code using array function in javascript and display the results as an array of strings.

// Update your book purchasing function to determine how many term of credit to purchase a book and displayed it as array of object
// Note:
// Only determine the due for each term of payment, start with next month from this current month when do you work on this code

// "Create iterable and array function in JavaScript
// - Calculate the due date for each month starting from the next month"
// "Implementation array function :
// - Only determine the due for each term of payment, start with next month from this current month when do you work on this code
// - Use array function"s

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

  //mulai hitung bulan credit
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dueDate = [];
  const creditTerm = [];

  for (let i = 1; i <= applyCredit; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i * 30);
    dueDate.push(currentDate);
    const formatDate = `${dueDate[i - 1].getDate()} ${months[dueDate[i - 1].getMonth()]} ${dueDate[i - 1].getFullYear()}`;
    const creditInfo = (`For ${i} month(s) credit, due date will be on ${formatDate}`);
    creditTerm.push(creditInfo);
  }
  //selesai hitung bulan credit

  console.log(`
  You are chosing the ${applyCredit} month(s) credit term.
  You can see the credit term below:`);
  console.log(creditTerm);

  //mulai hitung harga berdasarkan stok dan book amount
  let purchaseInfo; //variabel kosong untuk hasil akhir
  let totalPrice;

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

      let totalPrice = taxPrice * (i + 1);
      console.log(`
      Total price for ${i + 1} book(s): ${totalPrice}`);
      stock--;

      if (stock > 0) { //pengkondisian ketika book amount lebih kecil dari stock, stok bersisa
        purchaseInfo = console.log(`
        You still can purchase this book, Available stock: ${stock}`);

      } else { //pengkondisian ketika book amount lebih besar dari stok, stok tidak mencukupi
        purchaseInfo = console.log(`
        You cannot purchase this book again, Available stock: ${stock}`);
        break;
      }
    }
  }
  // let pricePerMonth = totalPrice / applyCredit;
  // console.log(`
  // The amount you have pay every month is: ${pricePerMonth}`);
  return purchaseInfo;
}


// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // const currentDate = new Date();
  // let dueDay = currentDate.getDate();
  // let dueMonth = currentDate.getMonth();
  // let dueYear = currentDate.getFullYear();

  // const result = [];
  // const creditTerm = [];

  // for (let i = 1; i <= applyCredit; i++) {
  //   dueDay = new Date(currentDate);
  //   dueDay.setDate(currentDate.getDate() + i * 30);
  //   result.push(dueDay);

  //   // dueMonth = (dueMonth + 1) % 12; // Melakukan penambahan dan memodulus 12 untuk mengatur indeks bulan
  //   // if (dueMonth === 0) {
  //   //   dueYear++; // Menambah tahun jika bulan mencapai Desember
  //   // }
  //   const dueMonths = (`For ${i} month(s) credit, due date will be on ${result[i - 1]}`);
  //   creditTerm.push(dueMonths);
  // }

  
  // let i = 1;
  // for (const _ of months) {
  //   const monthIndex = (currentDate.getMonth() + i) % 12;
  //   const dueMonths = {
  //     name: 'Term ' + i + ' month(s)',
  //     due: months[monthIndex]
  //   };
  //   creditTerm.push(dueMonths);

  //   i++;
  //   if (i >= 7) {
  //     break;
  //   }
  // }