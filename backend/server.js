import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

// configure .env
dotenv.config();
const PORT = process.env.PORT;

// configure database
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

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
