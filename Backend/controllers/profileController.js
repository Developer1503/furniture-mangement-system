import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';

const UserRoles = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

// Get user profile
const getProfile = async (req, res) => {
  const userId = req.user.id || req.user._id;
  try {
    const user = await userModel.findById(userId);
    if (user) {
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ msg: "Error retrieving user profile" });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { name, email, phone, location, language } = req.body;
  let profilePicture = req.user.profilePicture || req.user.profile_picture;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    profilePicture = result.secure_url;
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { name, email, phone, location, language, profilePicture },
      { new: true }
    );
    res.json({ msg: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Error updating profile" });
  }
};

// Update user password
const updatePassword = async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await userModel.findById(userId);
    if (user && (await user.matchPassword(currentPassword))) {
      const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
      await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
      res.json({ msg: "Password updated successfully" });
    } else {
      res.status(400).json({ msg: "Current password is incorrect" });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ msg: "Error updating password" });
  }
};

export { getProfile, updateProfile, updatePassword };
