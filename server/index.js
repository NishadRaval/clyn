import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import our route files
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// --- THIS IS THE FIX ---
// Tell the server to trust your live frontend
app.use(cors({
  origin: [
    'http://localhost:5173',       // For your local testing
    'https://leval-1.vercel.app'  // For your live website
  ],
  credentials: true,
}));
// --- END OF FIX ---

app.use(cookieParser()); // Read cookies

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// --- Mount Routes ---
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('E-commerce Backend API is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});