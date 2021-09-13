const express = require("express");
router = express.Router();
const userSchema = require("../model/User");


// Get Users
router.route('/').get((req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single User
router.route('/user-profile/:id').get((req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
            
        } else {
            res.json(data)            
        }
    })
})

// Add User Favorites
router.route('/add-favorites/:id/:img_id').put((req, res, next) => {      
    userSchema.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            favorites : [ {
                      _id: req.params.img_id
                    }
                 ]//'inserted Array containing the list of object'
        }
    }, { upsert: true, new: true },(error, data) => {
        if (error) {
          console.log(error);
          return next(error);          
        } else {    
          res.json(data)
        }
      })
    })

// Get Single User's Favorites

router.route('/my-favorites/:id').get((req, res, next) => {
    userSchema.findById(req.params.id, 'favorites',  (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

router.route('/delete-favorite/:id/:img_id').delete((req,res,next) => {
    // Find only one document matching the
    userSchema.findOneAndUpdate({_id: req.params.id}, 
        { $pull: { favorites: { _id: req.params.img_id } } },
        { new: true }
    )
    .then(f => {
        //console.log(f);
         res.json(f)})
    
    .catch(err => console.log(err));
});



module.exports = router;