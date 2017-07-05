'use strict';

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  title: {type: String, required: true, minlength: 1},
  description: {type: String, required: true, minlength: 1},
  location: {type: String, required: true, minlength: 1},
  eventImageURI: {type: String, required: true, minlength: 1},
});

module.exports = mongoose.model('event', eventSchema);
