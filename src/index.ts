import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import dbConnect from './config/db';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

// Load environment variables
dotenv.config();

//For Connection with DB 
dbConnect();

//Middleware for parses incoming requests with JSON payloads
app.use(bodyParser.json());

//Define API Routes
app.use('/api', authRoutes);
app.use('/api', todoRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

