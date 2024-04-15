// src/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'User' | 'Admin';
}

const UserSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['User', 'Admin'], default: 'User' }
});

export default mongoose.model<IUser>('User', UserSchema);