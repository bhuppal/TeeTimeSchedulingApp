const express = require('express');
const path = require('path');
const cors = require('cors');

let indexRouter = require('./routes/index');
let facilityRouter = require('./routes/facility');
let teetimebookingRouter = require('./routes/teetimebooking');

const port = 5100;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/v1/', indexRouter);
app.use('/v1/facility', facilityRouter);
app.use('/v1/teetimebooking', teetimebookingRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));