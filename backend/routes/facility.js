const express = require('express');
const router = express.Router();
const facility = require('../services/facility');


router.get('/', async function(req, res, next) {
  try {
    res.json(await facility.getAllFacility());
  } catch (err) {
    console.error(`Error while getting facility `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});


router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;
    res.json(await facility.getFacilityById(id));
  } catch (err) {
    console.error(`Error while getting facility.`, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

router.post('/:id/teetimebooking', async function(req, res, next) {
  try {
    res.json(await facility.getTeeTimeBookingByFacility(req.body));
  } catch (err) {
    console.error(`Error while getting facility.`, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;