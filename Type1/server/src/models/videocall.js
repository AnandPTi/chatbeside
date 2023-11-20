// /server/src/models/videocall.js
const mongoose = require('mongoose');

const videocallSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // Add more fields as needed
});

module.exports = mongoose.model('Videocall', videocallSchema);
