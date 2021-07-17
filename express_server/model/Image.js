var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    filename: String,
    tripID: Number,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('Image', imageSchema);