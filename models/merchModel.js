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
    required: false,
  },
  contactEmail: {
    type: String, //name of image
    required: false,
  },
  contactNumber: {
    type: String, //name of image
    required: false,
  },
  description: {
    type: String, //name of image
    required: false,
  },
});

const Merch = mongoose.model('Merch', merchSchema);
module.exports = Merch;
