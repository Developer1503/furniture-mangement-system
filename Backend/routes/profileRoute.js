// Backend/routes/profileRoute.js
import express from 'express';
import { getProfile, updateProfile, updatePassword } from '../controllers/profileController.js'; // Ensure this path is correct
import { protect } from '../middleware/authMiddleware.js';

const profileRoutes = express.Router(); // Renamed to profileRoutes

profileRoutes.route('/profile').get(protect, getProfile).put(protect, updateProfile);
profileRoutes.route('/profile/password').put(protect, updatePassword);

export default profileRoutes; // Ensure the export matches the new name
