// /server/src/services/chatbot.js
const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');

const app = express();
app.use(bodyParser.json());

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = '123456'; // You can use any unique ID for the session

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const chatbotService = {
  // Handle incoming messages and generate responses
  handleChat: async (req, res) => {
    const { message, userId } = req.body;

    // Send the user's message to Dialogflow
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US',
        },
      },
      queryParams: {
        payload: {
          userId,
        },
      },
    };

    try {
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      const chatbotResponse = result.fulfillmentText;

      // Send the chatbot's response back to the client
      res.json({ chatbotResponse });
    } catch (error) {
      console.error('Error handling chat:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

// Define the route for handling chat messages
app.post('/chat', chatbotService.handleChat);

module.exports = app;
