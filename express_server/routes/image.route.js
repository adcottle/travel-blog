const upload = require("../middlewares/gridfs");
const express = require("express");
const router = express.Router();
const fs  = require('fs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const chalk = require('chalk');
Grid.mongo = mongoose.mongo;
const { check, validationResult } = require('express-validator');


const conn = mongoose.createConnection(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

conn.on("error", () => {
  console.log(chalk.red("[-] Error occurred from the database"));
});

let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs"
  });
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection("fs");
  console.log(
    chalk.yellow(
      "[!] The database connection opened successfully in GridFS service"
    )
  );
});


//root path 
router.get('/',(req,res)=>{
  res.writeHead(200, {
      'Content-Type': 'text/html'
  });
  fs.readFile('./home.html', null, function (error, data) {
      if (error) {
          res.writeHead(404);
          res.write('Oops! Unable to load main page.');
      } else {
          res.write(data);
      }
      res.end();
  });
});



// //post file

// //post file
router.post('/upload', upload.single('file'), (req, res) =>{
  // console.log(req.file)
res.json({ "file": req.file.originalname });
});



// search files by original name
  router.get('/file/:filename', (req,res) =>{
    gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
        if(!file || file.length === 0) {
            return res.status(404).json({
           err: 'No file exist'
            });
        }
          else{
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          }
    });
});

/*
GET: Fetches all the files in the the collection as JSON
*/
router.route('/files')
.get((req, res, next) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files available'
            });
        }
        
        files.map(file => {
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                file.isImage = true;
                // console.log(files)
            } else {
                file.isImage = false;
            }
        });

        res.status(200).json({
            success: true,
            files,
        });
    });
});

//Get single file json
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      //check if files exist
      if (!file || file.length == 0) {
          return res.status(404).json({
              err: "No files exist"
          })
      }
      //file exist
      return res.json(file)
  })
})



  //Delete a file
  router.delete('delete/file/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'fs' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.redirect('/array');
    });
  });

/*
GET: Fetches all the lastest as JSON
*/
router.route('/latest-posts')
.get((req, res, next) => {
    gfs.files.find({"metadata.cover_photo": "on"}).sort('uploadDate', -1).limit(3).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files available'
            });
        }
        
        files.map(file => {
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                file.isImage = true;
                // console.log(files)
            } else {
                file.isImage = false;
            }
        });

        res.status(200).json({
            success: true,
            files,
        });
    });
});   

/*
GET: Fetches all images of specified album as JSON
*/
router.route('/view-album/:id')
.get((req, res, next) => {
  gfs.files.find({"metadata.album_id": req.params.id}).sort('uploadDate', -1).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files available'
            });
        }
        
        files.map(file => {
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                file.isImage = true;
                // console.log(files)
            } else {
                file.isImage = false;
            }
        });

        res.status(200).json({
            success: true,
            files,
        });
    });
});  




module.exports = router;

//GETS ACTUAL IMAGES -- NO LONGER NECESSARY SINCE JUST GETTING METADATA

// router.get('/array', (req, res) => {
//   gfs.files.find().toArray((err, files) => { 
//   //   Check if files
//     if (!files || files.length === 0) {
//       res.render('array', { files: false });
//     } else {
//       files.map(file => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('array', { files: files });
//     }
//   });
// });


// ///Query to get 3 latest images
// router.get('/query', (req, res) => {
//   gfs.files.find({"metadata.cover_photo": "on"}).sort('upload_date', -1).limit(3).toArray((err, files) => { 
//     if (err) {
//       return res.status(404).json({ err: err });
//     }
//   //   Check if files
//     if (!files || files.length === 0) {
//       // res.render('array', { files: false });
//     } else {
//       files.map(file => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('array', { files: files });
//     }
    
//   });
// });


