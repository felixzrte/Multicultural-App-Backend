const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, 'The hosting club must have a name'],
    enum: {
      values: [
        'La Alianza Latina',
        'Asian Student Association',
        'Carribbean Student Association',
        'Black Student Union',
        'African Student Union',
        'ISA MuKappa',
        'Multicultural Council',
      ],
      message:
        'Club must be either: La Alianza Latina, Asian Student Association, Carribbean Student Association, Black Student Union, African Student Union, ISA MuKappa, Multicultural Council',
    },
  },
  eventName: {
    type: String,
    required: [true, 'An event must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A Event must have less or equal than 40 characters'],
  },
  slug: String,
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
  secretEvent: {
    type: Boolean,
    default: false,
  },
});

// DOCUMENT Middleware: runs before .save() and .create()
eventSchema.pre('save', function (next) {
  this.slug = slugify(this.eventName, { lower: true });
  next();
});

/* eventSchema.post('save', (doc, next) => {
  console.log(doc);
  next();
}); */

// QUERY MIDDLEWARE
eventSchema.pre(/^find/, function (next) {
  this.find({ secretEvent: { $ne: true } });

  this.start = Date.now();
  next();
});

eventSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
