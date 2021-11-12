/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const HomePage = require('../models/homePageModel');
const APIFeatures = require('../utils/APIFeatures');

// Get All home page
exports.getAllHomePages = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(HomePage.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const homePage = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: homePage.length,
      data: {
        homePage,
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
    const newHomePage = await HomePage.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        homePage: newHomePage,
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
    const homePage = await HomePage.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        homePage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update Home Page
exports.updateHomePage = async (req, res) => {
  try {
    const homePage = await HomePage.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      homePage,
    });
  } catch (err) {
    res.status(400).json({
      status: 'NEW SAMPLE TEXT',
      message: err,
    });
  }
};

// Delete home page
exports.deleteHomePage = async (req, res) => {
  try {
    await HomePage.findByIdAndDelete(req.params.id);
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
