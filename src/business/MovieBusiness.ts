import { Movie, MovieInputDTO } from '../model/Movie';
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
      !movie.genre
    ) {
      throw new Error('Confira as informações do filme');
    }
    const movieDatabase = new MovieDatabase();

    const genre = Movie.stringToGenre(movie.genre);

    await movieDatabase.createMovie(
      id,
      movie.title,
      movie.synopsis,
      movie.trailer,
      genre,
      movie.imdb_score
    );
  }

  async deleteMovie(movieId: string) {
    const movieDatabase = new MovieDatabase();
    const previousMovie = movieDatabase.getMovieById(movieId);

    if (!movieId) {
      throw new Error('Erro em id do filme a ser excluído   ');
    }

    if (!previousMovie) {
      throw new Error('Filme para deletar não encontrado');
    }

    await movieDatabase.deleteMovie(movieId);
  }

  async getMovies(): Promise<Movie[] | Movie> {
    const movieDatabase = new MovieDatabase();
    const movies = await movieDatabase.getMovies();

    if (!movies) {
      throw new Error('Nenhum filme encontrado');
    }

    return movies;
  }

  async getMovieDetail(movieId: string): Promise<Movie> {
    const movieDatabase = new MovieDatabase();
    const movie = movieDatabase.getMovieById(movieId);

    if (!movieId) {
      throw new Error('Erro em id do filme a ser excluído   ');
    }

    if (!movie) {
      throw new Error('Filme não encontrado');
    }

    return movie;
  }
}
