// backend/server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import { userRouter } from './routes/userRoute.js';
import { profileRoutes } from './routes/profileRoute.js';
import { productRouter } from './routes/ProductRoute.js';
import { adminRouter } from './routes/adminRoutes.js';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import passport from './Passport.js';
import session from 'express-session';

dotenv.config();

// Validate environment variables
const requiredEnvVars = ['MONGO_URI', 'CLOUDINARY_API_KEY', 'CLOUDINARY_SECRET_KEY', 'CLOUDINARY_NAME', 'JWT_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SESSION_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
});

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/user', profileRoutes);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
