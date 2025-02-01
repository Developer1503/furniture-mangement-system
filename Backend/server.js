// Backend/server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import profileRoutes from './routes/profileRoute.js';
import productRouter from './routes/ProductRoute.js';
import adminRouter from './routes/adminRoutes.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

console.log('Environment Variables:', process.env); // Print all environment variables
console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line to check if MONGO_URI is loaded

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/user', profileRoutes);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
