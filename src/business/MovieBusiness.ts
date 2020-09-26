import { MovieInputDTO } from '../model/Movie';
import { MovieDatabase } from '../data/MovieDatabase';
import { IdGenerator } from '../services/IdGenerator';

export class MovieBusiness {
  async createMovie(movie: MovieInputDTO) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (
      !movie.title ||
      !movie.synopsis ||
      !movie.trailer ||
      !movie.imdb_score ||
      !movie.favourite_genre
    ) {
      throw new Error('Confira as informações do filme');
    }
    const movieDatabase = new MovieDatabase();
    await movieDatabase.createMovie(
      id,
      movie.title,
      movie.synopsis,
      movie.trailer,
      movie.favourite_genre,
      movie.imdb_score
    );
  }
}
