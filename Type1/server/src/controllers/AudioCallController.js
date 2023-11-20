// /server/src/controllers/AudioCallController.js
const User = require('../models/user');
const AudioCall = require('../models/audiocall');

const AudioCallController = {
  initiateCall: async (req, res) => {
    try {
      const { callerId, receiverId } = req.body;
      const audioCall = new AudioCall({ participants: [callerId, receiverId] });
      await audioCall.save();
      res.status(200).json({ message: 'Call initiated successfully', audioCall });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  endCall: async (req, res) => {
    try {
      const { callId } = req.params;
      await AudioCall.findByIdAndDelete(callId);
      res.status(200).json({ message: 'Call ended successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AudioCallController;
