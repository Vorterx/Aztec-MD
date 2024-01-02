const mongoose = require('mongoose');
const brainshop = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  preferences: {
    workType: {
      type: String,
      default: "false",
    },
    isBotOn: {
      type: Boolean,
      default: true,
    },    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatBot = mongoose.model("ChatBot", brainshop);

module.exports = ChatBot;
  
