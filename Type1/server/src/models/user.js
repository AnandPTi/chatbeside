// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // Add other fields as needed
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
// /server/src/models/user.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String, // Password will be handled by Passport
  // Add more fields as needed
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
