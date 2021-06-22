require('dotenv/config');
const express = require('express');
const upload = require("./middlewares/gridfs");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const fs  = require('fs');
const Grid = require('gridfs-stream');

// Express settings
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

//Express APIs
const trips = require('./routes/trip.routes')
const users = require('./routes/auth.routes')


//MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// // Serve static resources
// app.use('/public', express.static('public'));

app.use('/trips', trips)
app.use('/users', users)

app.set('view engine','ejs');

//mongodb uri
const mongouri = process.env.DB;
const connection = mongoose.createConnection(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });

let gfs;
const bucket_name = "fs"

connection.once('open', () => {
    // Init stream
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection(bucket_name);
})

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

// Define PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server started on port ${port}`));
