const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Meta = new Schema({
  photo_id: {type: String},
  photo_date: {type: Date },
  caption: {type: String},
  state: { type: String }, 
  city: { type: String },
  country: {type: String},
  favorites: {type: Array,}
}, {
  collection: 'metadata'
})

module.exports = mongoose.model('Meta', Meta)