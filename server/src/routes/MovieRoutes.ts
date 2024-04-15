// movieRoutes.ts
import express from 'express';
import movieController from '../controllers/MovieController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/movies', authMiddleware, movieController.getAllMovies);
router.get('/movies/search', authMiddleware, movieController.searchMovies);
router.post('/movies', authMiddleware, movieController.addMovie);
router.put('/movies/:id', authMiddleware, movieController.updateMovie);
router.delete('/movies/:id', authMiddleware, movieController.deleteMovie);

export default router;
