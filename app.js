const express = require('express');
const cors = require('cors'); //A package to enable CORS on the API server and accept requests from other servers
const morgan = require('morgan'); //A package for logging requests in the terminal
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//const mongo = require('mongodb');
const mongoose = require('mongoose'); //ORM for mongodb
//const assert = require('assert'); //A testing package in node.js

const app = express();

//Routes to handle requests
const userRoutes = require('./api/routes/users');
const productRoutes = require('./api/routes/products');

const connString = 'mongodb+srv://guiame-admin:' + process.env.MONGO_ATLAS_PW + '@guiame-db-kzxkt.mongodb.net/guiame?retryWrites=true';
mongoose.connect(connString, { useNewUrlParser: true });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

//Handle errors for requests that passed the routers
app.use((req, res, next) => {
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
