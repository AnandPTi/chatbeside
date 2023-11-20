// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

router.get('/messages', ChatController.getMessages);
router.post('/messages', ChatController.sendMessage);

module.exports = router;
