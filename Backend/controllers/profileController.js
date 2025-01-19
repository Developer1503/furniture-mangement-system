import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserRoles = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    GUEST: 'guest',
};

// Get user profile
const getProfile = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await userModel.findById(userId).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving user profile" });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    const userId = req.user._id;
    const { name, email, role } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (user) {
            user.name = name;
            user.email = email;
            if (req.user.role === UserRoles.ADMIN) {
                user.role = role; // Allow admin to update user role
            }
            await user.save();
            res.json({ msg: "Profile updated successfully" });
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error updating user profile" });
    }
};

// Update user password
const updatePassword = async (req, res) => {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (user && (await user.matchPassword(currentPassword))) {
            user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
            await user.save();
            res.json({ msg: "Password updated successfully" });
        } else {
            res.status(400).json({ msg: "Current password is incorrect" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error updating password" });
    }
};

export { getProfile, updateProfile, updatePassword };
