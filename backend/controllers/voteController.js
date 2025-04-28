const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const ErrorResponse = require('../utils/errorResponse');
const mongoose = require('mongoose');

// @desc    Cast a vote
// @route   POST /api/votes
// @access  Private
exports.castVote = async (req, res, next) => {
  try {
    const { pollId, optionId } = req.body;

    // Check if poll exists
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return next(new ErrorResponse(`Poll not found with id of ${pollId}`, 404));
    }

    // Check if poll is active
    if (!poll.isCurrentlyActive()) {
      return next(new ErrorResponse('This poll is not currently active', 400));
    }

    // Verify option exists in the poll
    const optionExists = poll.options.some(option => 
      option._id.toString() === optionId
    );
    
    if (!optionExists) {
      return next(new ErrorResponse('Invalid option selected', 400));
    }

    // Check if user has already voted in this poll
    const existingVote = await Vote.findOne({
      poll: pollId,
      user: req.user.id
    });

    if (existingVote) {
      return next(new ErrorResponse('You have already voted in this poll', 400));
    }

    // Create vote record
    const vote = await Vote.create({
      poll: pollId,
      user: req.user.id,
      option: optionId,
      ipAddress: req.ip
    });

    // Increment the vote count for the selected option
    await Poll.findOneAndUpdate(
      { _id: pollId, 'options._id': optionId },
      { $inc: { 'options.$.count': 1 } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: vote
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Check if user has voted in a poll
// @route   GET /api/votes/check/:pollId
// @access  Private
exports.checkVote = async (req, res, next) => {
  try {
    const vote = await Vote.findOne({
      poll: req.params.pollId,
      user: req.user.id
    });

    res.status(200).json({
      success: true,
      hasVoted: !!vote,
      vote: vote
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get votes for user
// @route   GET /api/votes/user
// @access  Private
exports.getUserVotes = async (req, res, next) => {
  try {
    const votes = await Vote.find({
      user: req.user.id
    }).populate({
      path: 'poll',
      select: 'title options'
    });

    res.status(200).json({
      success: true,
      count: votes.length,
      data: votes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get poll results
// @route   GET /api/votes/results/:pollId
// @access  Public
exports.getPollResults = async (req, res, next) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    
    if (!poll) {
      return next(new ErrorResponse(`Poll not found with id of ${req.params.pollId}`, 404));
    }

    const totalVotes = poll.options.reduce((sum, option) => sum + option.count, 0);
    
    // Calculate percentages for each option
    const results = poll.options.map(option => ({
      option: option.text,
      count: option.count,
      percentage: totalVotes > 0 ? (option.count / totalVotes * 100).toFixed(1) : 0
    }));

    res.status(200).json({
      success: true,
      data: {
        pollId: poll._id,
        title: poll.title,
        totalVotes,
        results
      }
    });
  } catch (err) {
    next(err);
  }
};