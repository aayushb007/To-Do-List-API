import { Router } from 'express';
import { createTodo, getTodos, getTodo, updateTodo, deleteTodo } from '../controllers/todoController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

//Routes for CREATE,GET,GET BY ID,EDIT and DELETE Todo
router.post('/todos', authenticate, createTodo);
router.get('/todos', authenticate, getTodos);
router.get('/todos/:id', authenticate, getTodo);
router.put('/todos/:id', authenticate, updateTodo);
router.delete('/todos/:id', authenticate, deleteTodo);

export default router;