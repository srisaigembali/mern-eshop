import express from 'express';
import dotenv from 'dotenv';

// configure .env
dotenv.config();
const PORT = process.env.PORT;

// rest object
const app = express();

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
