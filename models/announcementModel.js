const mongoose = require('mongoose');

//CHANGE ALL THIS
const announcementSchema = new mongoose.Schema({
  announcementTitle: {
    type: String,
    required: [true, 'The announcement must have a title'],
    max: 64,
  },
  announcementContents: {
    type: String,
    required: [true, 'The announcement must have contents'],
    max: 64,
  },
  startDate: {
    type: Date,
    required: [true, 'An announcement must have a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'An announcement must have a end date'],
  },
  deletedStatus: {
    type: Boolean, 
    required: [true, 'An item must have a deleted status'],
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;