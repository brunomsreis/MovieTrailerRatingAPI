// src/app.ts

import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/UserRoutes';
import movieRoutes from '../routes/MovieRoutes';
import ratingRoutes from '../routes/RatingRoutes';
import commentRoutes from '../routes/CommentsRoutes';
import setupSwagger from '../docs/swagger';
import swaggerOptions from '../docs/swaggerOptions';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movie_trailer_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/comments', commentRoutes);

// Swagger Documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error Handling Middleware
app.use((err: Error, req: express.Request, res: express.Response, next: () => void) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const startApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movie_trailer_db');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log((error as Error).message);
  }
};

setupSwagger(app);
startApp();
