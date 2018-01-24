const express = require('express');
const app = express()
const path = require("path")
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport")

app.use(session({ 
    secret: "expresspasskey",
    resave: false,
    saveUninitialized: false,
 }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB stuff
require('./server/utils/mongoose');

//Start customized middleware
require('./server/utils/middleware')(app)

// Route and route logic
require('./server/utils/routes')(app)


app.listen(1337, function () {
    console.log('Running on the 4200 port!');
})