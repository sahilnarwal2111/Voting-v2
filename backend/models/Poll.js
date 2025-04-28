const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  options: [
    {
      text: {
        type: String,
        required: [true, 'Please add option text'],
        trim: true,
        maxlength: [100, 'Option text cannot be more than 100 characters']
      },
      count: {
        type: Number,
        default: 0
      }
    }
  ],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to check if poll is active
PollSchema.methods.isCurrentlyActive = function() {
  const now = new Date();
  return now >= this.startDate && now <= this.endDate && this.isActive;
};

// Middleware to set isActive based on dates
PollSchema.pre('save', function(next) {
  const now = new Date();
  if (now > this.endDate) {
    this.isActive = false;
  }
  next();
});

module.exports = mongoose.model('Poll', PollSchema);