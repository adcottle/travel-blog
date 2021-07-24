const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Trip = new Schema({
  __id: mongoose.Schema.Types.ObjectId, 
  state: { type: Array },
  city: { type: String},
  trip_date: {type: Date },
  tags: { type: Array },
  album_desc: {type: String},
  album_title: {type: String},
  upload_date: {type: Date},
  category: {type: Array,},
  country: {type: String}

}, {
  collection: 'trips'
})

module.exports = mongoose.model('Trip', Trip)