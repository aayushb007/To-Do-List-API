import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import { AppError } from '../middlewares/errorHandler';

export const signUp = async (req: Request, res: Response,next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};

export const logIn = async (req: Request, res: Response,next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ username });
    //If credentials are invalid then throw the error 
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};
