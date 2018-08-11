const express = require('express');
const app = express();
const morgan = require('morgan'); //A package for logging requests in the terminal
const bodyParser = require('body-parser');
//const mongo = require('mongodb');
const mongoose = require('mongoose'); //ORM for mongodb
//const assert = require('assert'); //A testing package in node.js

//Routes to handle requests
const userRoutes = require('./api/routes/users');

const connString = 'mongodb+srv://guiame-admin:' + process.env.MONGO_ATLAS_PW + '@guiame-db-kzxkt.mongodb.net/guiame?retryWrites=true';
mongoose.connect(connString, { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);


//Handle errors for requests that passed the routers
app.use((req, res, next) => { //error handler function
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
