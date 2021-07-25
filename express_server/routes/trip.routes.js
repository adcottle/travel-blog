const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');

let Trip = require('../model/Trip');


// Get all Trips
router.route('/').get((req, res) => {
    Trip.find((error, data) => {
    if (error) {
      return next(error)
    } else {      
      res.json(data)
    }
  })
})

// Get specific Trip
router.route('/trip/:_id').get((req, res) => {
    Trip.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update a Trip
router.route('/update-trip/:_id').put((req, res, next) => {
    Trip.findByIdAndUpdate(req.params._id, {
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
router.route('/delete-trip/:_id').delete((req, res, next) => {
    Trip.findByIdAndRemove(req.params._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.post("/add-trip",
    [
        check('album_title')
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
                    album_title: req.body.album_title,
                    album_desc: req.body.album_desc,
                    city: req.body.city,
                    state: req.body.state,
                    tags: req.body.tags,
                    trip_date: req.body.trip_date,
                    category: req.body.category,
                    upload_date: req.body.upload_date
                });
                trip.save().then((response) => {
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