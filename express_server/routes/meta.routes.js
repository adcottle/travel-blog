const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

let Meta = require('../model/Meta');


// Get metadata from all media
router.route('/').get((req, res) => {
    Meta.find((error, data) => {
    if (error) {
      return next(error)
    } else {      
      res.json(data)
    }
  })
})

// Get specific Trip
router.route('/meta/:_id').get((req, res) => {
    Meta.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update a Trip
router.route('/update-meta/:_id').put((req, res, next) => {
    Meta.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);      
    } else {
      res.json(data)
      console.log('Trip updated successfully!')
    }
  })
})

// Delete a Trip
router.route('/delete-meta/:_id').delete((req, res, next) => {
    Meta.findByIdAndRemove(req.params._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.post("/add-meta",
    [
        check('photo_id')
            .not()
            .isEmpty()               
    ],
    (req, res, next) => { 
        const errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        else {
            
                const trip = new Trip({
                    photo_id: req.body.photo_id,
                    caption: req.body.caption,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    favorites: req.body.tags,
                    
                });
                Meta.save().then((response) => {
                    console.log(response)
                    res.status(201).json({
                        message: "trip successfully created!",
                        result: response
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: error
                        
                    });
                });
            
        }
    });



module.exports = router;