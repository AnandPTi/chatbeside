// controllers/ChatbotController.js
const ChatbotService = require('../services/ChatbotService');

const ChatbotController = {
  sendMessage: async (req, res) => {
    try {
      const { userInput } = req.body;
      const botResponse = await ChatbotService.sendMessage(userInput);
      res.json({ botResponse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ChatbotController;

