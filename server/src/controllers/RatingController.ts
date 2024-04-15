import { Request, Response } from 'express';
import Rating from '../models/RatingModel';

const addRating = async (req: Request, res: Response) => {
  try {
    const { userId, movieId, rating } = req.body;

    const existingRating = await Rating.findOne({ userId, movieId });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      res.status(200).json({ message: 'Rating updated successfully', rating: existingRating });
    } else {
      const newRating = new Rating({ userId, movieId, rating });
      await newRating.save();
      res.status(201).json({ message: 'Rating added successfully', rating: newRating });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { addRating };