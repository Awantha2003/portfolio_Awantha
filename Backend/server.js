import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static image files (e.g., uploaded project images)
const __dirname = path.resolve(); // Required to use __dirname with ES modules
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('🌐 Portfolio Backend API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
