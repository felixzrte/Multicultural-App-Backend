const mongoose = require('mongoose');

//CHANGE ALL THIS
const merchSchema = new mongoose.Schema({
  merchItemName: {
    type: String,
    required: [true, 'The item must have a name'],
    max: 64,
  },
  merchItemPrice: {
    type: String,
    required: [true, 'An item must have a price'],
    max: 300,
  },
  pic: {
    type: String,
    required: True,
  },
  contactEmail: {
    type: String, 
    required: True,
  },
  contactNumber: {
    type: String, 
    required: True,
  },
  description: {
    type: String, 
    required: True,
  },
  numSmall: {
    type: String, 
    required: False,
  },
  numMedium: {
    type: String, 
    required: False,
  },
  numLarge: {
    type: String, 
    required: False,
  },
});

const Merch = mongoose.model('Merch', merchSchema);
module.exports = Merch;
