import { IUser } from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

interface AuthPayload {
    userId: string;
    email: string;
}

class UserService {
    async registerUser(username: string, email: string, password: string): Promise<{ message: string; user?: IUser }> {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return { message: 'Email already exists' };
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            const savedUser = await newUser.save();

            return { message: 'User registered successfully', user: savedUser };
        } catch (error) {
            console.error(error);
            throw new Error('Server error');
        }
    }

    async updateUser(id: string, name: string, email: string, password?: string): Promise<{ message: string; user?: IUser }> {
        try {
            let updatedUser: IUser | null;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedUser = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });
            } else {
                updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
            }

            if (!updatedUser) {
                return { message: 'User not found' };
            }

            return { message: 'User updated successfully', user: updatedUser };
        } catch (error) {
            console.error(error);
            throw new Error('Server error');
        }
    }

    async getUsers(): Promise<IUser[]> {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            console.error(error);
            throw new Error('Server error');
        }
    }

    async deleteUser(id: string): Promise<{ message: string; user?: IUser }> {
        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return { message: 'User not found' };
            }

            return { message: 'User deleted successfully', user: deletedUser };
        } catch (error) {
            console.error(error);
            throw new Error('Server error');
        }
    }

    async loginUser(email: string, password: string): Promise<{ message: string; token?: string }> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return { message: 'Authentication failed' };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return { message: 'Authentication failed' };
            }

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT secret is not defined');
            }

            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
            return { message: 'Authentication successful', token };
        } catch (error) {
            console.error(error);
            throw new Error('Server error');
        }
    }
}

export default new UserService();
