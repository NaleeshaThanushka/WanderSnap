// controllers/userController.js
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password (plaintext for now - hash in production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', userId: user._id, email: user.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
