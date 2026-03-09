const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  wallet: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
