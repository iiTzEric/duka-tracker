const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config( { path: `${__dirname}/.env` } );

// validate that the environment variables are set
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI environment variable is not set.');
  process.exit(1);
}
if (!process.env.PORT) {
  console.error('Error: PORT environment variable is not set.');
  process.exit(1);
}

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});