const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public profile: for viewing other users
router.get('/public/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('username ownedSkins');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      username: user.username,
      ownedSkins: user.ownedSkins
    });
  } catch (err) {
    console.error("GET /profile/public/:username error:", err);
    res.status(500).json({ error: 'Could not get public profile' });
  }
});

// Private profile: for self
router.get('/', authMiddleware, async (req, res) => {
  try {
    const self = await User.findById(req.userId).select('username ownedSkins');
    res.json({
      username: self.username,
      ownedSkins: self.ownedSkins
    });
  } catch (err) {
    console.error("GET /profile error:", err);
    res.status(500).json({ error: 'Could not get profile data' });
  }
});

// Add skin (only for self)
router.post('/me/add', authMiddleware, async (req, res) => {
  const { path } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user.ownedSkins.includes(path)) {
      user.ownedSkins.push(path);
      await user.save();
      return res.json({ success: true });
    }
    res.json({ success: false, message: 'Already owned' });
  } catch (err) {
    console.error("POST /profile/me/add error:", err);
    res.status(500).json({ error: 'Could not add skin' });
  }
});

module.exports = router;
