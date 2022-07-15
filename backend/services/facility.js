const db = require('./db');
const helper = require('./helper');
const appConfig = require('../app-config');

async function getAllFacility() {  
  const rows = await db.query('SELECT * FROM facility', []);
  const facility = helper.checkForEmptyRecordset(rows);
  return {
    facility
  }
}

async function getFacilityById(facilityId = 0) {
  const rows = await db.query('SELECT * FROM facility WHERE facility_id = $1 ', [facilityId]);
  const facility = helper.checkForEmptyRecordset(rows);
  return {
    facility
  }
}

async function getTeeTimeBookingByFacility({facilityId, teeTimeDate} ) {  
  const rows = await db.query(
    `SELECT teetimebooking_id, facility_id, pgamemberid, firstname, 
      lastname, teetimedate, to_char(teetimetime, 'HH12:MI AM') teetimetime 
      FROM TeeTimeBooking WHERE facility_id = $1 AND  teetimedate = $2`, 
    [facilityId, teeTimeDate]
  );
  const facilityTeeTimeBookingDetails = helper.checkForEmptyRecordset(rows);
  return {
    facilityTeeTimeBookingDetails
  }
}

module.exports = {
  getAllFacility,
  getFacilityById,
  getTeeTimeBookingByFacility
}