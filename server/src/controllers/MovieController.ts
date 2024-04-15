import { Request, Response } from 'express';
import Movie from '../models/MovieModel';
import Rating from '../models/RatingModel';
import Comment from '../models/CommentModel';

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().populate('comments').populate('ratings');
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addMovie = async (req: Request, res: Response) => {
  try {
    const { title, releaseDate, trailerLink, poster, genres } = req.body;
    const newMovie = new Movie({ title, releaseDate, trailerLink, poster, genres });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, releaseDate, trailerLink, poster, genres } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, releaseDate, trailerLink, poster, genres }, { new: true });
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    await Comment.deleteMany({ movieId: id });
    await Rating.deleteMany({ movieId: id });
    res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const searchMovies = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string; // Conversão de tipo para garantir que query seja uma string
    const movies = await Movie.find({ title: query });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { getAllMovies, addMovie, updateMovie, deleteMovie, searchMovies };
