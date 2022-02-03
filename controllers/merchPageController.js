/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Merch = require('../models/merchModel');
const APIFeatures = require('../utils/APIFeatures');

//CHANGE ALL OF THIS

// Get All Merchs
exports.getAllMerchs = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Merch.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const merchs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: merchs.length,
      merchs,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Create Merch
exports.createMerch = async (req, res) => {
  try {
    const newMerch = await Merch.create(req.body);

    res.status(201).json({
      status: 'success',
      merch: newMerch,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get Merch
exports.getMerch = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const merch = await Merch.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      merch,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update Merch
exports.updateMerch = async (req, res) => {
  try {
    const merch = await Merch.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      merch,
    });
  } catch (err) {
    res.status(400).json({
      status: 'NEW SAMPLE TEXT',
      message: err,
    });
  }
};

// Delete Merch
exports.deleteMerch = async (req, res) => {
  try {
    await Merch.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'error',
      merch,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
