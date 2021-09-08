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
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})




// Add User Favorites
router.route('/add-favorites/:id/:img_id').put((req, res, next) => {
   
    console.log(res.params);

    userSchema.findByIdAndUpdate(req.params.id, {
        $addToSet: {
            favorites : [ {
                      _id: req.params.img_id
                    }
                 ]//'inserted Array containing the list of object'
        }
    }, (error, data) => {
        if (error) {
          console.log(error);
          return next(error);          
        } else {            
            console.log(req.params.id);
          res.json(data)
          console.log('Image added to favorites')
        }
      })
    })

// Get Single User's Favorites

router.route('/my-favorites/:id').get((req, res, next) => {
    userSchema.findById(req.params.id, 'favorites', (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

router.route('/delete-favorite/:id/:img_id').delete((req,res,next) => {
    // Find only one document matching the
    console.log('made it to route')
    userSchema.findOneAndUpdate({_id: req.params.id}, {$pull: 
        {favorites: {_id: req.params.img_id}}});
    res.end();
});



module.exports = router;