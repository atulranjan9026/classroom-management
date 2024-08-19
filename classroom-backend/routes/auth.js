const express = require('express');
const router = express.Router();
const User = require('../models/UserModels');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import bcrypt
const bcrypt = require('bcryptjs'); 

router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const result = await User.create(email, password, role);
    res.status(201).json({ message: 'User created', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email across all tables (users, students, teachers)
    const user = await User.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT with user ID and role
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
