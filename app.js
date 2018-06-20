const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// setup express app

const app = express();

//  setting up auth0
const jwt = require('express-jwt');
const rsaValidation = require('auth0-api-jwt-rsa-validation');

const jwtCheck = jwt({
    secret: rsaValidation(),
    audience: 'http://localhost:5432',
    issuer: "https://unicorn-robot.auth0.com/",
    algorithms: ['RS256']
}); 

app.use(jwtCheck); 

//log requests to console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Setup a default catch-all route that sends back a welcome message in JSON format

require('./server/routes')(app);

app.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({message: 'Missing or invalid token'});
    }
});

app.get('*', (req, res) => res.status(200).send({
    message: "Welcome to the habit tracker API"
}));

module.exports = app;