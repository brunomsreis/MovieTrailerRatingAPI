import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

interface CustomUser {
    userId: string;
    role: string;

}

interface CustomRequest extends Request {
    user: CustomUser;

}

interface JwtPayload {
    userId: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
        if (!jwtSecret) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, jwtSecret);
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await UserModel.findById((decodedToken as JwtPayload).userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        (req as CustomRequest).user = {
            userId: user._id.toString(),
            role: user.role
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authMiddleware;

