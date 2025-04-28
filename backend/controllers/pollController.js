const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all polls
// @route   GET /api/polls
// @access  Public
exports.getPolls = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Poll.countDocuments();

    const query = Poll.find().sort({ createdAt: -1 }).skip(startIndex).limit(limit);
    
    // Execute query
    const polls = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: polls.length,
      pagination,
      data: polls
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single poll
// @route   GET /api/polls/:id
// @access  Public
exports.getPoll = async (req, res, next) => {
  try {
    const poll = await Poll.findById(req.params.id).populate({
      path: 'createdBy',
      select: 'username'
    });

    if (!poll) {
      return next(new ErrorResponse(`Poll not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: poll
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new poll
// @route   POST /api/polls
// @access  Private (Admin)
exports.createPoll = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // Check if options are provided
    if (!req.body.options || !Array.isArray(req.body.options) || req.body.options.length < 2) {
      return next(new ErrorResponse('Please add at least two options', 400));
    }

    // Format options as objects with text property
    // req.body.options = req.body.options.map(option => ({ text: option }));

    const poll = await Poll.create(req.body);

    res.status(201).json({
      success: true,
      data: poll
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update poll
// @route   PUT /api/polls/:id
// @access  Private (Admin)
exports.updatePoll = async (req, res, next) => {
  try {
    let poll = await Poll.findById(req.params.id);

    if (!poll) {
      return next(new ErrorResponse(`Poll not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is poll owner or admin
    if (poll.createdBy.toString() !== req.user.id && !req.user.isAdmin) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this poll`, 401));
    }

    // Don't allow updates if votes exist
    const hasVotes = await Vote.findOne({ poll: req.params.id });
    if (hasVotes) {
      return next(new ErrorResponse('Cannot update poll after voting has started', 400));
    }

    // Format options if provided
    if (req.body.options) {
      if (!Array.isArray(req.body.options) || req.body.options.length < 2) {
        return next(new ErrorResponse('Please add at least two options', 400));
      }
      req.body.options = req.body.options.map(option => ({ text: option }));
    }

    poll = await Poll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: poll
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete poll
// @route   DELETE /api/polls/:id
// @access  Private (Admin)
exports.deletePoll = async (req, res, next) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return next(new ErrorResponse(`Poll not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is poll owner or admin
    if (poll.createdBy.toString() !== req.user.id && !req.user.isAdmin) {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this poll`, 401));
    }

    // First remove all votes for this poll
    await Vote.deleteMany({ poll: req.params.id });
    
    // Then remove the poll
    await poll.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get polls created by logged in user
// @route   GET /api/polls/user
// @access  Private
exports.getUserPolls = async (req, res, next) => {
  try {
    const polls = await Poll.find({ createdBy: req.user.id });

    res.status(200).json({
      success: true,
      count: polls.length,
      data: polls
    });
  } catch (err) {
    next(err);
  }
};