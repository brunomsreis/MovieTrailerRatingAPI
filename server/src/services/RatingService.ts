// src/services/RatingService.ts

import { IRating } from '../models/RatingModel';
import Rating from '../models/RatingModel';

class RatingService {
  async addRating(userId: string, movieId: string, rating: number): Promise<{ message: string; rating?: IRating }> {
    try {
      const existingRating = await Rating.findOne({ userId, movieId });
      if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
        return { message: 'Rating updated successfully', rating: existingRating };
      } else {
        const newRating = new Rating({ userId, movieId, rating });
        await newRating.save();
        return { message: 'Rating added successfully', rating: newRating };
      }
    } catch (error) {
      console.error(error);
      throw new Error('Server error');
    }
  }
}

export default new RatingService();
