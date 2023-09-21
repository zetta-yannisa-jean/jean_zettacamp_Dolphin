const mongoose = require('mongoose');
const userModel = require('./user.model')

const url = 'mongodb://localhost:27017/';
const database = 'test-database';

const profile = {
  name: 'jean',
  age: 23,
  hobbies: ['sleep', 'watch movies'],
  address: {
    street: 'jln. jembatan merah',
    city: 'sleman',
    province: 'DIY'
  }
};

mongoose.connect(`${url}${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to MongoDB');
    await userModel.create(profile);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });