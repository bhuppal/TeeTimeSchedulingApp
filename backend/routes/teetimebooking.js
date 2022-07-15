const express = require('express');
const router = express.Router();
const teetimebooking = require('../services/teetimebooking');

router.get('/', async function(req, res, next) {
  try {
    res.json(await teetimebooking.getTeeTimeBookingDetails());
  } catch (err) {
    console.error(`Error while getting tee time booking.`, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await teetimebooking.createTeeTimeBooking(req.body));
  } catch (err) {
    console.error(`Error while posting tee time booking.`, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;