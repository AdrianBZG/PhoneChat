// ./models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    description: String,
    latitude: String,
    longitude: String,
    creator: String,
    participants: [Number],
    date: Date
});

module.exports = mongoose.model('Event', EventSchema);

