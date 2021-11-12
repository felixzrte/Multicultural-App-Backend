/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Event = require('../models/homePageModel');
const APIFeatures = require('../utils/APIFeatures');

// Get All home page
exports.getAllHomePages = async (req, res) => {
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
      data: {
        events,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Create home page
exports.createHomePage = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get home page
exports.getHomePage = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const event = await Event.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update home page
exports.updateHomePage = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: event,
    });

    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Delete home page
exports.deleteHomePage = async (req, res) => {
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
