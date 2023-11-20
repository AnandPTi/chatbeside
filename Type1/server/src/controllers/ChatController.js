// /server/src/controllers/ChatController.js
const Message = require('../models/message');

const ChatController = {
  sendMessage: async (req, res) => {
    try {
      const { userId, content } = req.body;
      const newMessage = new Message({ sender: userId, content });
      await newMessage.save();
      res.status(201).json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getMessages: async (req, res) => {
    try {
      const messages = await Message.find().populate('sender', 'username');
      res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = ChatController;
