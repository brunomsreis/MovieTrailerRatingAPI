import { Request, Response } from 'express';
import Comment from '../models/CommentModel';

const addComment = async (req: Request, res: Response) => {
  try {
    const { userId, movieId, text } = req.body;
    const comment = new Comment({ userId, movieId, text });
    await comment.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { addComment };
