const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, 'The hosting club must have a name'],
    max: 64,
  },
  eventName: {
    type: String,
    required: [true, 'An event must have a name'],
    max: 64,
  },
  date: {
    type: Date,
    required: [true, 'An event must have a date'],
  },
  desc: {
    type: String,
    required: [true, 'An event must have a description'],
    max: 300,
  },
  location: {
    type: String,
    required: [true, 'An event must have a location'],
    max: 64,
  },
  attendence: {
    type: String,
    required: false,
  },
  bannerImage: {
    type: String, //name of image
    required: false,
    //add a default banner image to return here? maybe the MC logo?
  },
  favorite: {
    type: String,
    required: false,
  },
  extraNotes: {
    type: String,
    required: false,
    max: 300,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
