// /server/src/services/chat.js
const io = require('socket.io')(); // Assuming socket.io is initialized in your main server file

const chatService = {
  // Maintain a list of connected users
  connectedUsers: {},

  // Initialize the chat service
  initialize: () => {
    io.on('connection', (socket) => {
      // Handle user connection
      socket.on('join-chat', (userId, username) => {
        socket.userId = userId;
        chatService.connectedUsers[userId] = { socketId: socket.id, username };

        // Notify other clients about the new user
        io.emit('user-joined', { userId, username });

        // Handle user disconnection
        socket.on('disconnect', () => {
          delete chatService.connectedUsers[userId];
          io.emit('user-left', userId);
        });

        // Handle incoming messages
        socket.on('send-message', (message) => {
          io.emit('receive-message', { userId, username, message });
        });
      });
    });
  },

  // Get the list of connected users
  getConnectedUsers: () => {
    return Object.values(chatService.connectedUsers).map(({ userId, username }) => ({ userId, username }));
  },

  // Get the socket ID for a specific user
  getSocketId: (userId) => {
    return chatService.connectedUsers[userId]?.socketId;
  },
};

module.exports = ChatService;
