import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import productRoutes from './routes/productRoute.js';
import cors from 'cors';

// configure .env
dotenv.config();
const PORT = process.env.PORT;

// configure database
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// rest apis
app.get('/', (req, res) => {
  res.send('<h1>Welcome To Eshop</h1>');
});

// run server
app.listen(PORT, () => {
  console.log(
    `server is running on mode ${process.env.DEV_MODE} on port ${PORT} `
  );
});
