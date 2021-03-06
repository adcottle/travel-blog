const upload = require("../middlewares/gridfs");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const chalk = require('chalk');
Grid.mongo = mongoose.mongo;
ObjectID = require('mongodb').ObjectID

const Image = require('../model/Image');
const Users = require('../model/User');


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
    chalk.blueBright(
      "[!]GridFS stream opened successfully"
    )
  );
});


//root path 
router.get('/', (req, res) => {
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
router.post('/upload', upload.single('file'), (req, res) => {
  res.json(req.file);``
  //res.json({ "file": req.file.originalname });
});


// Get single file image
router.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exist'
      });
    }
    else {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    }
  });
});

//Get single file json
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if files exist
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    };
    //file exist
    return res.json(file)
  });
});


//Get single file json from _id
router.get('/favorite-image/:id', (req, res) => {
  const ObjectId = require('mongodb').ObjectId;
  const id = ObjectId(req.params.id); // convert to ObjectId
  gfs.files.findOne({ _id: id }, (err, file) => {
    //check if files exist
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    };
    //file exist
    return res.json(file)
  });
});

//GET: Fetches all the files in the the collection as JSON
router.route('/files').get((req, res, next) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length == 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    };
    //file exist
    return res.json(files)
  });
});


//Get album's cover photo
router.route('/cover/:album_id').get((req, res, next) => {
  gfs.files.find({ "metadata.cover_photo": "on", "metadata.album_id": req.params.album_id }).limit(1).toArray((err, files) => {
    if (!files || files.length == 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    };
    //file exist
    return res.json(files)
  });
});



//Delete a file
router.delete('delete/file/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'fs' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.redirect('/array');
  });
});

//GET: Fetches all the lastest as JSON
router.route('/latest-posts')
  .get((req, res, next) => {
    gfs.files.find({ "metadata.cover_photo": "on" }).sort('uploadDate', -1).limit(3).toArray((err, files) => {
      if (!files || files.length == 0) {
        return res.status(404).json({
          err: "No files exist"
        });
      };
      //file exist
      return res.json(files)
    });
  });


//GET: Fetches all images of specified album as JSON
// router.route('/view-album/:id').get((req, res) => {
//   Image.find({ "metadata.album_id": req.params.id }).sort('-uploadDate').exec((error, data) => {
//     if (error) {
//       return res.status(404).json({
//                 err: "No files exist"
//               });
//             };
//             //file exist
//             return res.json(data)
//           });
//         });

router.route('/view-album/:id')
  .get((req, res, next) => {
    gfs.files.find({ "metadata.album_id": req.params.id }).sort('uploadDate', -1).toArray((err, files) => {
      if (!files || files.length == 0) {
        return res.status(404).json({
          err: "No files exist"
        });
      };
      //file exist
      return res.json(files)
    });
  });


//Get specific image comments
router.route('/image-comments/:id').get((req, res) => {
  Image.find({ _id: req.params.id })
    .sort('-uploadDate')
    .select('comments').lean().exec((err, collection) => {
      if (err) {
        // console.log(err);
        console.log('in err')
      } else {
        var findIDs = [];
        var commObj = [];
        for (let i = 0; i < collection.length; i++) {
          commObj.push(collection[i].comments);
        }
        commObj.forEach(io => {
          if (io == undefined) {
            var io = (typeof io === 'undefined') ? null : io;
            findIDs.push(io);
          }
          else {
            for (let j = 0; j < io.length; j++) {
              findIDs.push(io[j].user)
            }
          }
        }) //end commObj findIDs  
        Users.find({ "_id": findIDs }, '_id firstName lastName', (err, collection2) => {
          var newObj = [];
          if (err) {
            console.log('in err');
            console.log(err);
          } else {
            var mobj = {};
            commObj.forEach(el => {
              if (el == undefined) {
                var el = (typeof el === 'undefined') ? null : el;
                newObj.push(el);
              } else {
                for (let x = 0; x < el.length; x++) {
                  // console.log(chalk.greenBright(el[x].user));              
                  // console.log(chalk.yellowBright(el[x].comment));                
                  for (let y = 0; y < collection2.length; y++) {
                    if (el[x].user == collection2[y]._id) {
                      // console.log(collection2[y].firstName, collection2[y].lastName, el[x].comment);
                      mobj = { cid: el[x]._id, uid: el[x].user, firstName: collection2[y].firstName, lastName: collection2[y].lastName, comment: el[x].comment };
                      newObj.push(mobj)
                    }
                  }
                }
              }
            });//end commObj.foreach 
            // console.log(newObj)
            var finalResults = []; const res1 = []; const res2 = [];
            newObj.map(itm2 => {
              // itm2 is the object to replace itm1 with if _id matches cid
              if (itm2) {
                res2.push(itm2);
              }
            });
            collection.forEach(main => {
              if (main.comments == undefined) {
                //console.log(main);
                finalResults.push({ ...main, comments: null });
              } else {
                // itm1 is the comment object(_id, user, comment)
                var pech = main.comments.map(itm1 => itm1);
                //filter out duplicates
                //var unique = res2.filter((v, i, a) => a.indexOf(v) === i);
                var commWithName = pech.map(obj => res2.find(o => o.cid === obj._id) || obj);                
                finalResults.push({ ...main, comments: commWithName })
              }
            });
            return res.json(finalResults)
          }
        });
      }
    });
});

// Add Comments to image
router.route('/add-comment/:id').put((req, res, next) => {
  // console.log(chalk.greenBright(req.params.id));
  // console.log(chalk.yellowBright(req.body.user));
  // console.log(chalk.blueBright(req.body.comment));
  Image.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      comments: [{
        user: req.body.user,
        comment: req.body.comment
      }
      ]//'inserted Array containing the list of object'
    }
  }, { upsert: true, new: true }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      // console.log(chalk.cyanBright('Data updated successfully'));
    };
  });
});

// Add tags to image
router.route('/add-tags/:id').put((req, res, next) => {
  // console.log(chalk.greenBright(req.params.id));
  // console.log(chalk.yellowBright(req.body));
  // console.log(chalk.blueBright(req.body.comment));
  Image.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      tags: [req.body]//'inserted Array containing the list of object'
    }
  }, { upsert: true, new: true }, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data)
      // console.log(chalk.cyanBright('Data updated successfully'));
    };
  });
});


//Let only user who made comment delete
router.route('/delete-comment/:img_id/:com_id').delete((req, res, next) => {
  // Find only one document matching the id
  Image.findOneAndUpdate({ _id: req.params.img_id },
    { $pull: { comments: { _id: req.params.com_id } } },
    { new: true }
  )
    .select('comments')
    .then(data => {
      res.json(data)
    })
    .catch(err => console.log(err));
});



module.exports = router;

