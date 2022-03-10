const mongoose = require('mongoose');

//CHANGE ALL THIS
const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The club must have a name'],
      max: 64,
    },
    acronym: {
      type: String,
      required: [true, 'A club must have an acronym'],
      max: 64,
    },
    missionStatement: {
      type: String,
      required: [true, 'A club must have a mission statement'],
      max: 300,
    },
    header: {
      type: String,
      required: [true, 'A club must have a header'],
      max: 300,
    },
    cabinetMembers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    events: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
      },
    ],
    bio: {
      type: String,
      required: [true, 'A club must have a bio'],
      max: 64,
    },
    logoImage: {
      type: String, //name of image
      required: [true, 'A club must have a logo image'],
    },
    bannerImage: {
      type: String, //name of image
      required: false,
    },
    email: {
      type: String,
      required: [true, 'A club requires an email'],
    },
    instagram: {
      type: String,
      required: [true, 'A club requires an instagram'],
    },
    facebook: {
      type: String,
      required: false,
    },
    primaryColor: {
      type: String,
      required: [true, 'A club requires an primary color'],
    },
    seccondaryColor: {
      type: String,
      required: [true, 'A club requires an seccondary color'],
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

clubSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

clubSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cabinetMembers',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
