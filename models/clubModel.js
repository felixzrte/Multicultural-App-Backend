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
      required: [true, 'A club must have a banner inage'],
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
    studentImage: {
      type: String,
      required: false,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

clubSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cabinetMembers',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
