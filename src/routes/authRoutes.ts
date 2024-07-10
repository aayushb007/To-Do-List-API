import { Router } from 'express';
import { signUp, logIn } from '../controllers/authController';

const router = Router();
//Routes for Signup and Login
router.post('/signup', signUp);
router.post('/login', logIn);

export default router;