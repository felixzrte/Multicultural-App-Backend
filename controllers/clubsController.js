/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Club = require('../models/clubModel');
const APIFeatures = require('../utils/APIFeatures');

//CHANGE ALL OF THIS

// Get All Clubs
exports.getAllClubs = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Club.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const clubs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: clubs.length,
      clubs,
  
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Create club
exports.createClub = async (req, res) => {
  try {
    const newClub = await Club.create(req.body);

    res.status(201).json({
      status: 'success',
      clubs,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get Club
exports.getClub = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const club = await Club.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      clubs,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update Club
exports.updateClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      club,
    });
  } catch (err) {
    res.status(400).json({
      status: 'NEW SAMPLE TEXT',
      message: err,
    });
  }
};

// Delete Club
exports.deleteClub = async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
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
