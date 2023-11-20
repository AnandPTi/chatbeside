// /server/src/models/audiocall.js
const mongoose = require('mongoose');

const audiocallSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // Add more fields as needed
});

module.exports = mongoose.model('Audiocall', audiocallSchema);
