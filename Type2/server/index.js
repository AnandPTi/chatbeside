const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const MONGO_URI='mongodb+srv://<cluster name>:<password>@chat.gpn55gb.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
// io.on("connection", (socket) => {
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//     socket.join(userId); // Join a room with user's ID
//   });

//   socket.on("send-msg", (data) => {
//     if (data.to.startsWith("group:")) {
//       // Handle group messages
//       io.to(data.to).emit("msg-recieve", data.msg);
//     } else {
//       // Handle one-to-one messages
//       const sendUserSocket = onlineUsers.get(data.to);
//       if (sendUserSocket) {
//         socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//       }
//     }
//   });

//   // Additional logic for handling group creation and management
//   socket.on("create-group", (groupInfo) => {
//     const groupId = `group:${groupInfo.groupId}`;
//     socket.join(groupId);
//     // Additional logic to store group information if needed
//   });
});

