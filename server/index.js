import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/utils/dbconnection.js';
import dishRoutes from './src/routes/foodRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/dishes', dishRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
