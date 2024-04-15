import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { NextFunction } from 'express';

interface CustomUser {
    userId: string;
    role: string;
}

interface CustomRequest extends Request {
    user: CustomUser;
}

const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '');

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getUsers = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error); 
    }
};

const updateUser = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user || (req.user.role !== 'admin' && req.user.userId !== req.params.id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user || (req.user.role !== 'admin' && req.user.userId !== req.params.id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export default { register, login, getUsers, updateUser, deleteUser };
