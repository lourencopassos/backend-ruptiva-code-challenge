import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { MovieInputDTO } from '../model/Movie';
import { MovieBusiness } from '../business/MovieBusiness';

export class MovieController {
  async createMovie(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error('Unauthorized');
      }

      const movie: MovieInputDTO = {
        title: req.body.title,
        synopsis: req.body.synopsis,
        trailer: req.body.trailer,
        genre: req.body.genre,
        imdb_score: req.body.imdb_score,
        poster: req.body.poster,
      };

      const movieBusiness = new MovieBusiness();
      await movieBusiness.createMovie(movie);

      res.status(200).send({
        movie,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async deleteMovie(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error('Unauthorized');
      }

      const movieId = (req.params as any) as string;

      const movieBusiness = new MovieBusiness();
      await movieBusiness.deleteMovie(movieId);

      res.status(200).send('Sucesso');
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getMovies(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error('Unauthorized');
      }
      const movieBusiness = new MovieBusiness();
      const movies = await movieBusiness.getMovies();
      res.status(200).send({ movies: movies });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getMovieDetail(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error('Unauthorized');
      }

      const movieId = req.params as any;

      const movieBusiness = new MovieBusiness();
      const movie = await movieBusiness.getMovieDetail(movieId.id);
      res.status(200).send({ movie });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
