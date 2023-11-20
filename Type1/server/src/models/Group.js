// // models/Group.js
// const mongoose = require('mongoose');

// const groupSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   // Add other fields as needed
// });

// const Group = mongoose.model('Group', groupSchema);

// module.exports = Group;
// /server/src/models/group.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Group', groupSchema);
