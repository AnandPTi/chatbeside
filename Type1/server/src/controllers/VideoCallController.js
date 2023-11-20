// /server/src/controllers/VideoCallController.js
const User = require('../models/user');
const VideoCall = require('../models/videocall');

const VideoCallController = {
  initiateCall: async (req, res) => {
    try {
      const { callerId, receiverId } = req.body;
      const videoCall = new VideoCall({ participants: [callerId, receiverId] });
      await videoCall.save();
      res.status(200).json({ message: 'Call initiated successfully', videoCall });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  endCall: async (req, res) => {
    try {
      const { callId } = req.params;
      await VideoCall.findByIdAndDelete(callId);
      res.status(200).json({ message: 'Call ended successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = VideoCallController;
