// routes/videoCallRoutes.js
const express = require('express');
const router = express.Router();
const VideoCallController = require('../controllers/VideoCallController');

router.post('/initiateCall', VideoCallController.initiateCall);
router.post('/endCall', VideoCallController.endCall);

module.exports = router;
