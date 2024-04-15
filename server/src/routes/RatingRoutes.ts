// ratingRoutes.ts
import express from 'express';
import ratingController from '../controllers/RatingController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add-rating', authMiddleware, ratingController.addRating);

export default router;
