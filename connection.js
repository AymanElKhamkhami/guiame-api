const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/guiame-db');

mongoose.connection.once('open', function() {
  console.log('Connection to database was successful!');
}).on('error', function(error){
  console.log('Connection error', error);
});
