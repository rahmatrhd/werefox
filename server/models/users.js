'use strict'

var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  salt: String
})

var userModel = mongoose.model('user', userSchema);


module.exports = userModel