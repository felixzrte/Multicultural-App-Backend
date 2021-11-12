/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Event = require('../models/eventModel');
const APIFeatures = require('../utils/APIFeatures');

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
exports.getAllEvents = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      event: newEvent,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      event,
    });
  } catch (err) {
    res.status(400).json({
      status: 'NEW SAMPLE TEXT',
      message: err,
    });
  }
};

// Get Event
exports.getEvent = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const event = await Event.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      event,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};


// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
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
