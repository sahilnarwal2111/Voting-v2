const express = require('express');
const { check } = require('express-validator');
const {
  castVote,
  checkVote,
  getUserVotes,
  getPollResults
} = require('../controllers/voteController');

const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/results/:pollId', getPollResults);

// Protected routes
router.post(
  '/',
  [
    check('pollId', 'Poll ID is required').not().isEmpty(),
    check('optionId', 'Option ID is required').not().isEmpty()
  ],
  validate,
  protect,
  castVote
);

router.get('/check/:pollId', protect, checkVote);
router.get('/user', protect, getUserVotes);

module.exports = router;