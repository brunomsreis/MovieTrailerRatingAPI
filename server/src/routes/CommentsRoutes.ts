// src/routes/commentRoutes.ts

import express from 'express';
import commentController from '../controllers/CommentsController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();



router.post('/comments', authMiddleware, commentController.addComment);

export default router;
