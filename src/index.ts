import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dbConnect from "./config/db";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import logger from "./middlewares/loggerMiddleware";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

dotenv.config(); // Load environment variables

dbConnect(); //For Connection with DB

app.use(bodyParser.json()); //Middleware for parses incoming requests with JSON payloads

app.use(logger); //Middleware for request logging

//Define API Routes
app.use("/api", authRoutes);
app.use("/api", todoRoutes);

app.use(errorHandler); //Error Handler Middleware

//During testing, the server doesn't start automatically.
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
export default app;
