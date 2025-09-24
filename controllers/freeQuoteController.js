// controllers/freeQuoteController.js
const FreeQuote = require('../models/freeQuote');

// Save message and emit via Socket.io
exports.saveMessage = async (req, res) => {
  try {
    const { username, message } = req.body;
    
    // Create and save message
    const chat = new FreeQuote({ 
      name: username,  // Using 'name' field from your schema
      message: message 
    });
    
    const savedMessage = await chat.save();
    
    // Emit to all connected clients via Socket.io
    req.app.get('io').emit('chatMessage', savedMessage);
    
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
};

// Get chat history
exports.getMessages = async (req, res) => {
  try {
    const messages = await FreeQuote.find().sort({ createdAt: 1 }).limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};