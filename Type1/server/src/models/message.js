// // models/Message.js
// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   // Add other fields as needed
// });

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;
// /server/src/models/message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Message', messageSchema);
