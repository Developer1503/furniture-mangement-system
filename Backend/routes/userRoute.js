// Backend/routes/userRoute.js
import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import passport from 'passport';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin/login', adminLogin);

// Google OAuth routes
userRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:5173/profile');
});

// Protected route example
userRouter.get('/admin/profile', protect, authorize(['admin']), (req, res) => {
  res.send('Admin Profile');
});

// Update user role endpoint
userRouter.put('/admin/users/:userId/role', protect, authorize(['admin']), async (req, res) => {
  const { role } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.userId, { role }, { new: true });
    if (user) {
      res.status(200).json({ message: 'User role updated successfully', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role' });
  }
});

export { userRouter };
