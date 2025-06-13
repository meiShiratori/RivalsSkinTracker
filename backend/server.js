require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { ValidRoutes } = require('./shared/ValidRoutes');

const PORT = process.env.PORT || 3000;
const STATIC_DIR = path.resolve(__dirname, process.env.STATIC_DIR);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_DIR));

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const friendsRoutes = require('./routes/friends');

app.use(ValidRoutes.AUTH, authRoutes);
app.use(ValidRoutes.PROFILE, profileRoutes);
app.use(ValidRoutes.FRIENDS, friendsRoutes);

Object.values(ValidRoutes).forEach(route => {
  if (
    route === ValidRoutes.AUTH ||
    route === ValidRoutes.PROFILE ||
    route === ValidRoutes.FRIENDS
  ) return;

  app.get(route, (req, res) => {
    const indexPath = path.join(STATIC_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(500).send('index.html not found');
    }
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

