const db = require('./db');
const helper = require('./helper');
const appConfig = require('../app-config');

async function getTeeTimeBookingDetails(page = 1) {  
  const rows = await db.query(
    'SELECT * FROM TeeTimeBooking', 
    []
  );
  const teeTimeBooking = helper.checkForEmptyRecordset(rows);
  return {
    teeTimeBooking
  }
}

 const validateCreate = (teeTimeBookingDetails) => {
  let messages = [];

  if (!teeTimeBookingDetails) {
    messages.push('No object is provided');
  }

  if (!teeTimeBookingDetails.teeTimeTime) {
    messages.push('Tee Time is empty');
  }

  if (!teeTimeBookingDetails.facilityId) {
    messages.push('Facility Id is empty');
  }

  if (teeTimeBookingDetails.pgaMemberId && teeTimeBookingDetails.pgaMemberId.length > 8) {
    messages.push('PGA Member Id should not greater than 8');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  }
}

const createTeeTimeBooking = async (teeTimeBookingDetails) => {
//console.log(teeTimeBookingDetails) ;
validateCreate(teeTimeBookingDetails);

const result = await db.query(
    `INSERT INTO TeeTimeBooking(facility_id, pgaMemberId, firstName, 
      lastName, teeTimeDate, teeTimeTime) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [teeTimeBookingDetails.facilityId, 
      teeTimeBookingDetails.pgaMemberId,
      teeTimeBookingDetails.firstName,
      teeTimeBookingDetails.lastName,
      teeTimeBookingDetails.teeTimeDate,
      teeTimeBookingDetails.teeTimeTime]
  );
  let message = 'Error in creating quote';

  if (result.length) {
    message = 'Tee Time booking created successfully.';
  }

  return {message};
}

module.exports = {
  getTeeTimeBookingDetails,
  createTeeTimeBooking
}