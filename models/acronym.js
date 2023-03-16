
const mongoose = require('mongoose');

const AcronymSchema = mongoose.Schema(
  {
    acronym: {
      type: String,
      required: true,
    },
    definition: { 
        type: String, 
        required: true 
    },
  }
);

module.exports = mongoose.model('Acronym', AcronymSchema);


