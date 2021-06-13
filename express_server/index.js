require('dotenv/config');
const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const fs  = require('fs');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


app.use(express.json());

app.set('view engine','ejs');

//mongodb uri
const mongouri = process.env.DB;
const connection = mongoose.createConnection(mongouri, { useNewUrlParser: true,useUnifiedTopology: true });

let gfs;
const bucket_name = "fs"

connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection(bucket_name);
})
var storage = new GridFsStorage({
    url: mongouri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
        //   const filename = buf.toString('hex') + path.extname(file.originalname);
        const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'fs'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });



//root path 
app.get('/',(req,res)=>{
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
app.post('/upload', upload.single('file'), (req, res) =>{
    console.log(req.file.originalname);
res.json({ "file": req.file.originalname });
});


//show all files
app.get('/files', (req,res) =>{
gfs.files.find().toArray((err, files) =>{
  if(!files || files.length === 0) {
      return res.status(404).json({
      err: "No file exist"
      });
  }
  return res.json(files);
});
});

    //search files by original name
    app.get('/file/:filename', (req,res) =>{
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

const port=3000;

app.listen(port, () => console.log('Server started on port ' + port));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dbConfig = require('./database/db');

// // Express APIs
// const trip = require('./routes/trip.routes')
// const users = require('./routes/auth.routes')


// // Express APIs
// const api = require('./routes/auth.routes');

// // MongoDB conection
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Database connected')
// },
//     error => {
//         console.log("Database can't be connected: " + error)
//     }
// )

// // Remvoe MongoDB warning error
// mongoose.set('useCreateIndex', true);


// // Express settings
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: false
// }));
// app.use(cors());

// // Serve static resources
// app.use('/public', express.static('public'));

// app.use('/trip', trip)
// app.use('/users', users)

// // Define PORT
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

// // Express error handling
// app.use((req, res, next) => {
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });