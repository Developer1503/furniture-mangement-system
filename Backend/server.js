import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import profileRoutes from './routes/profileRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());

// Update CORS configuration to allow requests from the frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your frontend URL
  credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/user', profileRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
