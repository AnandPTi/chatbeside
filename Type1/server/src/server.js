// /server/src/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
// Add other route imports as needed

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
// Use other routes as needed

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat events
  socket.on('message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle WebRTC signaling events (offer, answer, ice candidate)
  socket.on('offer', (offer) => {
    // Broadcast the offer to all connected clients
    io.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    // Broadcast the answer to all connected clients
    io.emit('answer', answer);
  });

  socket.on('ice-candidate', (iceCandidate) => {
    // Broadcast the ice candidate to all connected clients
    io.emit('ice-candidate', iceCandidate);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
