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
    required: [true, 'An item must have a picture'],
  },
  contactEmail: {
    type: String, 
    required: [true, 'An item must have a contact email'],
  },
  contactNumber: {
    type: String, 
    required: false,
  },
  description: {
    type: String, 
    required: [true, 'An item must have a description'],
  },
  numSmall: {
    type: Number, 
    required: false,
  },
  numMedium: {
    type: Number, 
    required: false,
  },
  numLarge: {
    type: Number, 
    required: false,
  },
});

const Merch = mongoose.model('Merch', merchSchema);
module.exports = Merch;
