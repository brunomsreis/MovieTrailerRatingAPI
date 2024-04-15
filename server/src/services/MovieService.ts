import { Request } from 'express';
import MovieModel, { IMovie } from '../models/MovieModel';

class MovieService {
  async getAll(): Promise<IMovie[]> {
    return MovieModel.find().exec();
  }

  async getOne(movieId: string): Promise<IMovie | null> {
    return MovieModel.findById(movieId).exec();
  }

  async create(movieData: any, imageFile: any): Promise<IMovie> {
    const { title, description, category } = movieData;
    const newMovie = new MovieModel({
      title,
      description,
      category,
      image: imageFile.path // Assuming imageFile has the path property
    });
    return newMovie.save();
  }

  async update(movieData: any, movieId: string, movieImage: any): Promise<IMovie | null> {
    const { title, description, category } = movieData;
    const updateData: any = {
      title,
      description,
      category
    };
    if (movieImage) {
      updateData.image = movieImage.path;
    }
    const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, updateData, { new: true }).exec();
    return updatedMovie;
  }

  async delete(movieId: string): Promise<IMovie | null> {
    return MovieModel.findByIdAndDelete(movieId).exec();
  }
}

export default new MovieService();
