// /server/src/controllers/GroupChatController.js
const Group = require('../models/Group');
const Message = require('../models/message');

const GroupChatController = {
  createGroup: async (req, res) => {
    try {
      const { name, members } = req.body;
      const newGroup = new Group({ name, members });
      await newGroup.save();
      res.status(201).json({ message: 'Group created successfully', newGroup });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  sendMessageToGroup: async (req, res) => {
    try {
      const { groupId, userId, content } = req.body;
      const newMessage = new Message({ sender: userId, content });
      await newMessage.save();
      const group = await Group.findByIdAndUpdate(groupId, { $push: { messages: newMessage._id } }, { new: true });
      res.status(200).json({ message: 'Message sent to group successfully', group });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = GroupChatController;
