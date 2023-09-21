const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/test-database`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(async () => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  hobbies: [{
    type: String
  }],
  address: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    province: {
      type: String
    }
  }
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
});

const profileModel = mongoose.model('Profile', profileSchema);
const bookModel = mongoose.model('Book', bookSchema);
module.exports = { profileModel, bookModel };
