const { time } = require('console');
const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema(
  {
    club: {
      type: mongoose.Schema.ObjectId,
      ref: 'Club',
      required: [true, 'An event must have a club'],
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
    image: {
      type: String, 
      required: [true, 'An event must have an image'],
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
    // secretEvent: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'club',
    select: 'name -cabinetMembers',
  });
  next();
});

// Virtual populate
eventSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'event',
  localField: '_id',
});

// DOCUMENT Middleware: runs before .save() and .create()
eventSchema.pre('save', function (next) {
  this.slug = slugify(this.eventName, { lower: true });
  next();
});

// QUERY MIDDLEWARE
// eventSchema.pre(/^find/, function (next) {
//   this.find({ secretEvent: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

eventSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} miliseconds`);
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
