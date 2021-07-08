const upload = require("../middlewares/gridfs");
const express = require("express");
const router = express.Router();
const fs  = require('fs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const chalk = require('chalk');
Grid.mongo = mongoose.mongo;


const conn = mongoose.createConnection(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

conn.on("error", () => {
  console.log(chalk.red("[-] Error occurred from the database"));
});

let gfs;

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


//post file
router.post('/upload', upload.single('file'), (req, res,error) =>{
    console.log(req.file.originalname);
    res.json({ "file": req.file.originalname });
    // console.log(error)
});


//show all files
// router.get('/files', (req,res) =>{
// gfs.files.find().toArray((err, files) =>{
//   if(!files || files.length === 0) {
//       return res.status(404).json({
//       err: "No file exist"
//       });
//   }
//   return res.json(files);
// });
// });

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


//  router.get('/array', (req, res) => {
//     gfs.files.find().toArray( (err, items) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('An error occurred', err);
//         }
//         else {
//             res.render('array', { items: items });
//         }
//     });
// });


router.get('/array', (req, res) => {
    gfs.files.find().toArray((err, files) => { 
    //   Check if files
      if (!files || files.length === 0) {
        res.render('array', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
            console.log(file.filename)
          } else {
            file.isImage = false;
          }
        });
        res.render('array', { files: files });
      }
    });
  });


module.exports = router;