**GETS ACTUAL IMAGES -- NO LONGER NECESSARY SINCE JUST GETTING METADATA**  

```js
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
        } else {
          file.isImage = false;
        }
      });
      res.render('array', { files: files });
    }
  });
});


///Query to get 3 latest images
router.get('/query', (req, res) => {
  gfs.files.find({"metadata.cover_photo": "on"}).sort('upload_date', -1).limit(3).toArray((err, files) => { 
    if (err) {
      return res.status(404).json({ err: err });
    }
  //   Check if files
    if (!files || files.length === 0) {
      // res.render('array', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('array', { files: files });
    }

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


router.get('/favorite-image/',  (req, res) => { 
	//console.log(req.params.id)
  const ObjectId = require('mongodb').ObjectId;
  var g = req.params.id.split(',');
	let mid = g.map(function(el){String(el);ObjectId(el); return el});
	//console.log(mid);
  gfs.files.find(
     
     {_id: {$in: mid}}).toArray ((err, files) => { 
		// check if files exist
    console.log('here');
		if (!files || files.length == 0) {
      console.log('fail')
		  return res.status(404).json({
			err: "No files exist"
		  });
		};
		//file exist
		// console.log(res.json(files));
    console.log('success')
		return res.json(files)
	  });
	});

  //How to return only specific fields
  router.route('/album-images/:id')
  .get((req, res, next) => {
    gfs.files.find({ "metadata.album_id": req.params.id }).toArray((err, files) => {
      var fn = [];
      files.forEach(element => {      
        fn.push(element._id);     
      });   
      if (!files || files.length == 0) {
        return res.status(404).json({
          err: "No files exist"
        });
      };
      //file exist
      return res.json(fn)
    });
  });
  ```