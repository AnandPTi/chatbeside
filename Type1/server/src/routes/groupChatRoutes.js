// routes/groupChatRoutes.js
const express = require('express');
const router = express.Router();
const GroupChatController = require('../controllers/GroupChatController');

router.get('/groups', GroupChatController.getGroups);
router.post('/groups', GroupChatController.createGroup);

module.exports = router;
