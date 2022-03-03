/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Event = require('../models/eventModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.aliasLalEvents = (req, res, next) => {
  // alias middlewares
  req.query.clubName = 'La Alianza Latina';
  // Add more querys here
  next();
};

exports.aliasCsaEvents = (req, res, next) => {
  req.query.clubName = 'Caribbean Student Association';
  next();
};

// Get All Events
exports.getAllEvents = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const events = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: events.length,
    events,
  });
});

// Create Event
exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);

  res.status(201).json({
    status: 'success',
    event: newEvent,
  });
});

// Update Event
exports.updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    event,
  });
});

// Get Event
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate('bookings');
  // Tour.findOne({ _id: req.params.id })

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    event,
  });
});

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, {deletedStatus: true}, {new: true});
    res.status(204).json({
      status: 'error',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};