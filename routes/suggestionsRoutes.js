const express = require('express');
const suggestionPageController = require('../controllers/suggestionPageController');

const router = express.Router();

// Get Suggestions

router
  .route('/')
  .get(suggestionPageController.getAllSuggestions)
  .post(suggestionPageController.createSuggestion);

router
  .route('/:id')
  .get(suggestionPageController.getSuggestion)
  .patch(suggestionPageController.updateSuggestion)
  .delete(suggestionPageController.deleteSuggestion);

module.exports = router;