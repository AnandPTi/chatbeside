// /server/src/controllers/AuthController.js
const passport = require('passport');
const User = require('../models/User');

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new User({ username });
      await User.register(newUser, password);
      res.status(201).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: (req, res) => {
    res.status(200).json({ message: 'Login successful', user: req.user });
  },

  logout: (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
  },
};

module.exports = AuthController;
