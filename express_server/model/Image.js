var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    _id: String,
    filename: String,    
    metadata:
    {       
        caption: String,       
        city: String,
        state: String,        
        country: String,
        photo_date: Date,
        cover_photo: String,
        album_id: String,
        
    },
    favorites: {
        user_id: String
    }
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('Image', imageSchema);
