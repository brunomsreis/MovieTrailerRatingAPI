// src/models/Rating.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  rating: number;
}

const RatingSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Types.ObjectId, ref: 'Movie', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

export default mongoose.model<IRating>('Rating', RatingSchema);