const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ error: "Username already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, passwordHash, ownedSkins: [], friends: [] });
    await user.save();

    res.status(201).json({ message: "Account created" });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Log in an existing user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// Search for users by username, excluding the current user
router.get('/users', authMiddleware, async (req, res) => {
  const { q } = req.query;

  try {
    const filter = { _id: { $ne: req.userId } };
    if (q && q.trim() !== '') {
      filter.username = { $regex: q, $options: 'i' };
    }

    const users = await User.find(filter).select('username');
    res.json(users);
  } catch (err) {
    console.error('User search error:', err.message);
    res.status(500).json({ error: 'User search failed' });
  }
});

module.exports = router;
