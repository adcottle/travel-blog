var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    filename: String,
    // photo_id: String,
    caption: String,
//     photo_date: Date,
//     state: String, 
//   city: String,
//   country: String,
//   favorites: Array,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);
