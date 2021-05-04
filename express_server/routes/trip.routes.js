const express = require('express');
const app = express();

const tripRoute = express.Router();
let Trip = require('../model/Trip');

// Add Trip
tripRoute.route('/add-trip').post((req, res, next) => {
    Trip.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Trips
tripRoute.route('/').get((req, res) => {
    Trip.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get specific Trip
tripRoute.route('/trip/:_id').get((req, res) => {
    Trip.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update a Trip
tripRoute.route('/update-trip/:_id').put((req, res, next) => {
    Trip.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Trip updated successfully!')
    }
  })
})

// Delete a Trip
tripRoute.route('/delete-trip/:_id').delete((req, res, next) => {
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

module.exports = tripRoute;