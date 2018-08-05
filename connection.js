const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/guiame-db');

mongoose.connection.once('open', function() {
  console.log('Connection to database was successful!');
}).on('error', function(error){
  console.log('Connection error', error);
});
