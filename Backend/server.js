import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
