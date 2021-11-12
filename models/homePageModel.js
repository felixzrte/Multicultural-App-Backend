const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'The home page must have a message'],
    max: 64,
  },
  startDate: {
    type: Date,
    required: [true, 'The home page styling must have a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'The home page must have an end date'],
  },
  color1: {
    type: String,
    required: false,
  },
  color2: {
    type: String,
    required: false,
  },
  color3: {
    type: String,
    required: false,
  },
});

const HomePage = mongoose.model('HomePage', homePageSchema);

module.exports = HomePage;
