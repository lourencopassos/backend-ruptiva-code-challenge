import { BaseDatabase } from './BaseDatabase';
import { Movie } from '../model/Movie';

export class MovieDatabase extends BaseDatabase {
  private static TABLE_NAME = 'RupMovies_Movies';

  public async createMovie(
    id: string,
    title: string,
    synopsis: string,
    trailer: string,
    favourite_genre: string,
    imdb_score: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          title,
          synopsis,
          trailer,
          favourite_genre,
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
}
