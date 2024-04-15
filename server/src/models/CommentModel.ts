// src/models/Comment.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  text: string;
}

const CommentSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Types.ObjectId, ref: 'Movie', required: true },
  text: { type: String, required: true },
});

export default mongoose.model<IComment>('Comment', CommentSchema);