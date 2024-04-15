import express from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';
import * as userController from '../controllers/UserController';

const router = express.Router();

// Rotas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rotas de usuário
router.get('/users', authMiddleware, userController.getUsers);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

export default router;


