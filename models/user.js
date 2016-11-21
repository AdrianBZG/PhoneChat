// ./models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    userName: String,
    firstName: String,
    lastName: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);
