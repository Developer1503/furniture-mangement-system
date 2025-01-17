import express from 'express';
import { getProfile, updateProfile, updatePassword } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const profileRoutes = express.Router();

profileRoutes.route('/profile').get(protect, getProfile).put(protect, updateProfile);
profileRoutes.route('/profile/password').put(protect, updatePassword);

export default profileRoutes;
