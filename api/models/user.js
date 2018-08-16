const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  surename: String,
  email: String,
  age: Number,
  password: String
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
