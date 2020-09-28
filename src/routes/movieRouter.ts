import express from 'express';
import { MovieController } from '../controller/MovieController';

export const movieRouter = express.Router();

const movieController = new MovieController();

movieRouter.get('/all', movieController.getMovies);
movieRouter.get('/:id', movieController.getMovieDetail);
