import { BaseDatabase } from './BaseDatabase';
import { Movie } from '../model/Movie';
import { Genre } from '../model/Genre';

export class MovieDatabase extends BaseDatabase {
  private static TABLE_NAME = 'RupMovies_Movies';
  private static MOVIE_TO_WATCH = 'RupMovies_MoviesToWatch';

  public async createMovie(
    id: string,
    title: string,
    synopsis: string,
    trailer: string,
    genre: Genre,
    imdb_score: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          synopsis,
          trailer,
          genre,
          imdb_score,
        })
        .into(MovieDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getMovieById(id: string): Promise<Movie> {
    const result = await this.getConnection()
      .select('*')
      .from(MovieDatabase.TABLE_NAME)
      .where({ id });

    return Movie.toMovieModel(result[0]);
  }

  public async deleteMovie(id: string): Promise<void> {
    await this.getConnection().del('*').where({ id });
  }

  public async getMovies(): Promise<any> {
    const movies = await this.getConnection()
      .select('*')
      .from(MovieDatabase.TABLE_NAME);

    const mappedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      synopsis: movie.synopsis,
      imdb_score: movie.imdb_score,
      trailer: movie.gernre,
      genre: movie.genre,
    }));

    return mappedMovies;
  }
}
