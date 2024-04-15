// src/routes/userRoutes.ts

import express from 'express';
import { registerUser, loginUser } from '../controllers/UserController';

const router = express.Router();

// Rota para registro de usuário
router.post('/register', registerUser);

// Rota para login de usuário
router.post('/login', loginUser);


export default router;
