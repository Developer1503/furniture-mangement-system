// Backend/server.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import profileRoutes from './routes/profileRoute.js'; // Ensure this path is correct

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Update this to match your frontend URL
  credentials: true,
}));

app.use('/api/user', userRouter);
app.use('/api/user', profileRoutes); // Ensure this path is correct

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
