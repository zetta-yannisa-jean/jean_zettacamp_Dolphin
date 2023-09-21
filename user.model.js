const mongoose = require('mongoose');

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

module.exports = mongoose.model('Profile', profileSchema);