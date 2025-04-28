const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  option: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  votedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String
});

// Ensure one vote per user per poll
VoteSchema.index({ poll: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);