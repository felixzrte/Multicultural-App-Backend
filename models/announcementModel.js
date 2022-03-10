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
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

announcementSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
