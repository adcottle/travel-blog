// const upload = require("../middlewares/gridfs");
// const express = require("express");
// const router = express.Router();
// const fs  = require('fs');
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const mongouri = process.env.DB

// const conn = mongoose.createConnection(mongouri,{ useNewUrlParser: true,useUnifiedTopology: true } );

// //gridfs variable
// let gfs;

// conn.once('open', ()=> {
// gfs = Grid(conn.db,mongoose.mongo);
// gfs.collection('fs');
// });


// //root path 
// router.get('/',(req,res)=>{
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('./home.html', null, function (error, data) {
//         if (error) {
//             res.writeHead(404);
//             res.write('Oops! Unable to load main page.');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// });


// //post file
// // router.post('/upload', upload.single('file'), (req, res) =>{
// //     console.log(req.file.originalname);
// // res.json({ "file": req.file.originalname });
// // });

// router.post('/upload', (req, res, next) => {
//     upload(req, res, function (err) {
//       if (err) {
//         // This is a good practice when you want to handle your errors differently
  
//         return
//       }
  
//       // Everything went fine 
//       console.log(req.file.originalname);
//         res.json({ "file": req.file.originalname });
//     })
//   })


// //show all files
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

// //search files by original name
// router.get('/file/:filename', (req,res) =>{
//     gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
//         if(!file || file.length === 0) {
//             return res.status(404).json({
//             err: 'No file exist'
//             });
//         }
//             else{
//             const readstream = gfs.createReadStream(file.filename);
//             readstream.pipe(res);
//             }
//     });
// });


// module.exports = router;