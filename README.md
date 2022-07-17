# TeeTimeSchedulingApp
Create a daily tee time scheduling application for your local golf course to replace their call-in process for reserving tee times. The facility offers tee times every 10 minutes between 9:00 AM - 12:00 PM. To keep things simple, assume the facility begins each day with an open schedule and only allows for same-day bookings.

Live website hosted:
https://golfteetime.azurewebsites.net/

Light mode:
![image](https://user-images.githubusercontent.com/4120729/179426691-426103f8-34b1-4739-ae26-30ac011d6555.png)

Dark mode:
![image](https://user-images.githubusercontent.com/4120729/179426699-72471ea7-51b6-45f3-a65f-605b1ccd2800.png)

![image](https://user-images.githubusercontent.com/4120729/179426770-d36ab13b-edde-4890-97c0-fa564bc8b8f0.png)


Funcationlities:
1) On the home page, We list all the facility details
2) Golf Player can pick any facility to do tee time booking
3) Once the player selected the date and time, we store in the database

# TeeTimeSchedulingApp project
This project is divided into 3 parts:
  1) Main
  2) Backend
  3) Frontend

# Main
The main contains the postgres database and docker compose files to run the app.
Postgres DB:
DB_HOST: db
DB_PORT: 5432
DB_USER: postgres
DB_PASSWORD: postgres
DB_NAME: postgres

The initial DB script stored in the file path - ./main/postgresdb/dbScriptInitialSetup.sql
    

# Backend
Backend app contains all the API route to serve the tee time shedule app services. The data comes from the Postgres DB.
App port - 5100
API Routes:
http://localhost:5100/v1 - GET - health check
http://localhost:5100/v1/facility - GET -List all the facilities
http://localhost:5100/v1/facility/1 - GET -List the facility whose id is "1".
http://localhost:5100/v1/teetimebooking - POST - To do booking Tee Time schedule for a facility
Payload details:
Header:
"Content-Type", "application/json"
Body:
{
    "facilityId": "1",
    "teeTimeDate": "July 14,2022",
    "teeTimeTime": "10:20:00",
    "firstName": "Alan",
    "lastName": "Jones",
    "pgaMemberId": "0028426"
}

Response:
{
    "message": "Tee Time booking created successfully."
}

http://localhost:5100/v1/facility/1/teetimebooking - POST - To retrive booking details by facility and date
Payload details:
Header:
"Content-Type", "application/json"
Body:
{
    "facilityId": "1",
    "teeTimeDate": "2022-07-16T04:00:00.000Z"
}


{
    "facilityTeeTimeBookingDetails": [
        {
            "teetimebooking_id": 42,
            "facility_id": 1,
            "pgamemberid": "1234567",
            "firstname": "Bhuppal",
            "lastname": "Kumar",
            "teetimedate": "2022-07-15T04:00:00.000Z",
            "teetimetime": "09:40 AM"
        },
        {
            "teetimebooking_id": 43,
            "facility_id": 1,
            "pgamemberid": "2222",
            "firstname": "Alan",
            "lastname": "Willy",
            "teetimedate": "2022-07-15T04:00:00.000Z",
            "teetimetime": "10:10 AM"
        }
    ]
}


