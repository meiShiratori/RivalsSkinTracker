const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get current user's friends
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends', 'username email');
    res.json({ friends: user.friends });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch friends list' });
  }
});

// Add friend by username
router.post('/add', authMiddleware, async (req, res) => {
  const { friendUsername } = req.body;

  try {
    const user = await User.findById(req.userId);
    const friend = await User.findOne({ username: friendUsername });

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Already friends' });
    }

    user.friends.push(friend._id);
    await user.save();

    res.json({ message: 'Friend added' });
  } catch (err) {
    res.status(500).json({ error: 'Could not add friend' });
  }
});

// Remove friend
router.post('/remove', authMiddleware, async (req, res) => {
  const { friendUsername } = req.body;

  try {
    const user = await User.findById(req.userId);
    const friend = await User.findOne({ username: friendUsername });

    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.friends = user.friends.filter(id => id.toString() !== friend._id.toString());
    await user.save();

    res.json({ message: 'Friend removed' });
  } catch (err) {
    res.status(500).json({ error: 'Could not remove friend' });
  }
});

module.exports = router;
