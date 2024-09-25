// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'; // Utility function to generate JWT

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password, isEmployee } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = new User({
    name,
    email,
    isEmployee,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const createdUser = await user.save();
  res.status(201).json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isEmployee: createdUser.isEmployee,
    token: generateToken(createdUser._id)
  });
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isEmployee: user.isEmployee,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

export default router;
