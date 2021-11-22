/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Event = require('../models/eventModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');

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

  res.status(200).json({
    status: 'success',
    event,
  });
});

// Get Event
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  res.status(200).json({
    status: 'success',
    event,
  });
});

// Delete Event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'error',
    data: null,
  });
});
