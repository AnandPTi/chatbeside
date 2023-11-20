// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/ChatbotController');

router.post('/sendMessage', ChatbotController.sendMessage);

module.exports = router;
