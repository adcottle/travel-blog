const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file,error) => {
        const match = ["image/png", "image/jpeg"];       
        if (match.indexOf(file.mimetype) === -1) {
            const filename = file.originalname;
            // const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "fs",
            // filename: `${Date.now()}-any-name-${file.originalname}`,
            filename: file.originalname,
            metadata: { caption: req.body.caption, 
                        city: req.body.city, 
                        state: req.body.state, 
                        country: req.body.country,
                        photo_date: req.body.photo_date,
                        album_id: req.body.album_id
                    }
        };        
    },
    
});



module.exports = multer({ storage });

