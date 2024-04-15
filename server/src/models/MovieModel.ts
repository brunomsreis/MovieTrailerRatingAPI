// src/models/MovieModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  releaseDate: Date;
  trailerLink: string;
  poster: string;
  genres: string[];
}

const MovieSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  trailerLink: { type: String, required: true },
  poster: {
    type: String, required: true, validate: {
      validator: function (value: string) {
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Invalid poster URL'
    }
  },
  genres: [{ type: String, required: true }],
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
