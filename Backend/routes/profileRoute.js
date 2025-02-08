// backend/routes/profileRoute.js
import express from 'express';
import { getProfile, updateProfile, updatePassword } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const profileRoutes = express.Router();

profileRoutes.route('/profile')
  .get(protect, getProfile)
  .put(protect, upload.single('profilePicture'), updateProfile);

profileRoutes.route('/profile/password').put(protect, updatePassword);

export { profileRoutes };
