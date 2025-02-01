import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserRoles = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

// Route for user registration
const registerUser = async (req, res) => {
  const { name, email, password, phone, profilePicture, username, role } = req.body;

  if (!username) {
    return res.status(400).json({ msg: "Username is required" });
  }

  try {
    const userExists = await userModel.findOne({ email });
    const usernameExists = await userModel.findOne({ username });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (usernameExists) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const user = new userModel({
      name,
      email,
      password,
      phone,
      profilePicture,
      username,
      role: role || UserRoles.CUSTOMER, // Default role to 'customer' if not provided
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ msg: "Error registering user" });
  }
};

// Route for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password))) {
      user.lastLogin = new Date();
      await user.save();
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error logging in" });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (user && (await user.matchPassword(password)) && user.role === UserRoles.ADMIN) {
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error logging in" });
  }
};

export { loginUser, registerUser, adminLogin };
