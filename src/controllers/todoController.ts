import { NextFunction, Request, Response } from "express";
import Todo, { ITodo } from "../models/todoModel";
import { IUser } from "../models/userModel";
import { AppError } from "../middlewares/errorHandler";

//Define Custom Request Interface
interface TodoRequest extends Request {
  user?: IUser;
}
export const createTodo = async (
  req: TodoRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  const userId = req.user?.id;
  try {
    const todo = new Todo({
      title,
      description,
      user: userId,
    });
    await todo.save(); // Adding Data to Todo Collection
    res.status(201).json(todo);
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};

export const getTodos = async (
  req: TodoRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  try {
    const todos: ITodo[] = await Todo.find({ user: userId }); // Finding All todos by UserId
    res.status(200).json(todos);
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const todo: ITodo | null = await Todo.findById(id); // Finding Todo by Id
    if (!todo) {
      next(new AppError("To-do not found", 404));
    }
    res.status(200).json(todo);
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const todo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!todo) {
      return next(new AppError("To-do not found", 404));
    }
    res.status(200).json(todo);
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const todo: ITodo | null = await Todo.findByIdAndDelete(id); // Delete Todo
    if (!todo) {
      return next(new AppError("To-do not found", 404));
    }
    res.status(200).json({ message: "To-do deleted successfully" });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};
