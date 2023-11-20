// /server/src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    passport.authenticate('local')(req, res, () => {
      res.status(201).json({ message: 'Registration successful', user });
    });
  });
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
