const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let imageSchema = new Schema({
    __id: mongoose.Schema.Types.ObjectId, 
    filename: { type: String },  
    uploadDate: {type: Date },
    tags: { type: Array },
    metadata:[{
        caption: {type: String},
        city: {type: String},    
        state: {type: String},
        country: {type: String},
        cover_photo: {type: Boolean},
        photo_date: {type: Date },
        album_id: {type: String}
    }],    
    comments: [{
        user: {type: String},
        comment: {type: String},
    }] 
  
  }, {
    collection: 'fs.files'
  })

module.exports = new mongoose.model('Image', imageSchema);