const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  projectDescription: { type: String, required: true },
  documentUrl: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);
