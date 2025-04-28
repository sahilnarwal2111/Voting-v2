const express = require('express');
const { check } = require('express-validator');
const {
  getPolls,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll,
  getUserPolls
} = require('../controllers/pollController');

const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/', getPolls);
router.get('/:id', getPoll);

// Protected routes
router.get('/user/polls', protect, getUserPolls);

// Protected and authorized routes (admin only)
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('options', 'At least two options are required').isArray({ min: 2 }),
    check('endDate', 'End date is required').not().isEmpty()
  ],
  validate,
  protect,
  authorize('admin'),
  createPoll
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  updatePoll
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  deletePoll
);

module.exports = router;