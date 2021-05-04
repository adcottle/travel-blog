const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Trip = new Schema({
  _id: {
    type: Number
  },
  state: {
    type: String
  },
  year: {
    type: Number
  },
  tags: {
    type: Array
  }
}, {
  collection: 'trips'
})

module.exports = mongoose.model('Trip', Trip)