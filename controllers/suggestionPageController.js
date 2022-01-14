/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Suggestion = require('../models/suggestionModel');
const APIFeatures = require('../utils/APIFeatures');

//CHANGE ALL OF THIS

// Get All suggestions
exports.getAllSuggestions = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Suggestion.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const suggestions = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: suggestions.length,
      data: {
        suggestions,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Create suggestion
exports.createSuggestion = async (req, res) => {
  try {
    const newSuggestion = await Suggestion.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        suggestion: newSuggestion,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Get suggestion
exports.getSuggestion = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        suggestion,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update suggestion
exports.updateSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      suggestion,
    });
  } catch (err) {
    res.status(400).json({
      status: 'NEW SAMPLE TEXT',
      message: err,
    });
  }
};

// Delete suggestion
exports.deleteSuggestion = async (req, res) => {
  try {
    await Suggestion.findByIdAndDelete(req.params.id);
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
