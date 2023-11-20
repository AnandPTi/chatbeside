// /server/src/services/videocall.js
const io = require('socket.io')(); // Assuming socket.io is initialized in your main server file
const { ExpressPeerServer } = require('peer');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, { debug: true });

app.use('/peerjs', peerServer);

const videoCallService = {
  // Maintain a list of connected peers
  connectedPeers: {},

  // Initialize the video call service
  initialize: () => {
    io.on('connection', (socket) => {
      // Handle peer connection
      socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        videoCallService.connectedPeers[userId] = socket.id;

        // Notify other clients about the new user
        socket.to(roomId).broadcast.emit('user-connected', userId);

        // Handle peer disconnection
        socket.on('disconnect', () => {
          socket.to(roomId).broadcast.emit('user-disconnected', userId);
          delete videoCallService.connectedPeers[userId];
        });

        // Handle peer video stream
        socket.on('stream', (stream) => {
          socket.to(roomId).broadcast.emit('user-stream', { userId, stream });
        });
      });
    });
  },

  // Get the list of connected peers
  getConnectedPeers: () => {
    return Object.keys(videoCallService.connectedPeers);
  },

  // Get the peer ID for a specific user
  getPeerId: (userId) => {
    return videoCallService.connectedPeers[userId];
  },
};

module.exports = VideoCallService;
