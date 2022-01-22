const mongoose = require('mongoose');

//CHANGE ALL THIS
const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must attach your name to the suggestion.'],
    max: 64,
  },
  suggestion: {
    type: String,
    required: [true, 'You must enter a suggestion.'],
    max: 500,
  }
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);
module.exports = Suggestion;