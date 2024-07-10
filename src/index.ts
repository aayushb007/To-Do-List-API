import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import dbConnect from './config/db';

const app = express();

// Load environment variables
dotenv.config();

dbConnect();

app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

