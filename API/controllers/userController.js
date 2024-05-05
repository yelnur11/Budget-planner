const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const controller = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send('Email and password are required.');
      }
      const newUser = await User.create({ email, passwordHash: password });
      res.status(201).json({
        message: 'User successfully registered.',
        userId: newUser._id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.checkPassword(password, user.passwordHash))) {
        return res.status(401).send('Incorrect credentials.');
      }
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({
        message: 'Authentication successful.',
        token
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = controller;