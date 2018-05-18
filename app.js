const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup express app

const app = express();

//log requests to console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Setup a default catch-all route that sends back a welcome message in JSON format

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: "Welcome to the habit tracker API"
}));

module.exports = app;