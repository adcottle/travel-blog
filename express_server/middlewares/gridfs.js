const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const Gridfs = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

//mongodb uri
const mongouri = process.env.DB

const conn = mongoose.createConnection(mongouri,{ useNewUrlParser: true,useUnifiedTopology: true } );

//gridfs variable
let gfs;

conn.once('open', ()=> {
gfs = Grid(conn.db,mongoose.mongo);
gfs.collection('fs');
});

//create file storage
const storage = new Gridfs({
url:mongouri,
file:(req,file) =>{
   return new Promise((resolve,reject) =>{
   crypto.randomBytes(16, (err, buf)=>{
  if(err) {
      return reject(err);
  }
  //const filename = buf.toString('hex') + path.extname(file.originalname);
  const filename = file.originalname;
  const fileinfo = {
      filename:filename,
      bucketName:'fs'
       };
       resolve(fileinfo);
     });
   });
  }
});
// const upload = multer({ storage} );