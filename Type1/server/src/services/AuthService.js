// /server/src/services/auth.js
const User = require('../models/User'); // Assuming the User model is defined in a separate file
const passport = require('passport');

const authService = {
  register: async (username, password) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const newUser = new User({ username });
      newUser.setPassword(password);
      await newUser.save();

      return { message: 'Registration successful', user: newUser };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (req, username, password) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (err || !user) {
          reject(new Error('Login failed'));
        }

        req.login(user, (err) => {
          if (err) {
            reject(new Error('Login failed'));
          }

          resolve({ message: 'Login successful', user });
        });
      })({ body: { username, password } });
    });
  },

  // Add other authentication-related methods as needed
};

module.exports = AuthService;
