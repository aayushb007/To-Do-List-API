import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import { AppError } from "./errorHandler";

interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // If there is no any token provided in header
  if (!token) {
    return next(new AppError("No token provided", 401));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("Invalid token", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};
