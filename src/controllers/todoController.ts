import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/todoModel';
import { IUser } from '../models/userModel';

//Define Custom Request Type
interface TodoRequest extends Request {
    user?: IUser;
}
export const createTodo = async (req: TodoRequest, res: Response) => {
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
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req: TodoRequest, res: Response) => {
  const userId = req.user?.id;
  try {
    const todos: ITodo[] = await Todo.find({ user: userId }); // Finding All todos by UserId
    res.status(200).json(todos);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo: ITodo | null = await Todo.findById(id);  // Finding Todo by it's Id
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }
    res.status(200).json(todo);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const todo: ITodo | null = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    ); // Edit Todo 
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }
    res.status(200).json(todo);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo: ITodo | null = await Todo.findByIdAndDelete(id); // Delete Todo 
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }
    res.status(200).json({ message: 'To-do deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
