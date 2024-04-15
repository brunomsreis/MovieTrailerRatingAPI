// src/services/CommentService.ts

import { IComment } from '../models/CommentModel';
import Comment from '../models/CommentModel';

class CommentService {
    async addComment(userId: string, movieId: string, text: string): Promise<{ message: string; comment?: IComment }> {
        try {
            const comment = new Comment({ userId, movieId, text });
            await comment.save();
            return { message: 'Comment added successfully', comment };
        } catch (error) {
            console.error(error);
            throw new Error('Server error');
        }
    }
}

export default new CommentService();
