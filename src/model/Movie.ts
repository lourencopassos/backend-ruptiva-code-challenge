import { Genre } from './Genre';

export class Movie {
  constructor(
    private id: string,
    private title: string,
    private synopsis: string,
    private trailer: string,
    private imdb_score: string,
    private favourite_genre: Genre
  ) {}

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getSynopsis() {
    return this.synopsis;
  }

  getImdbScore() {
    return this.imdb_score;
  }

  getTrailer() {
    return this.trailer;
  }

  getFavouriteGenre() {
    return this.favourite_genre;
  }

  setId(id: string) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSynopsis(synopsis: string) {
    this.synopsis = synopsis;
  }

  setTrailer(trailer: string) {
    this.trailer = trailer;
  }

  setImdbScore(imdb_score: string) {
    this.imdb_score = imdb_score;
  }

  setFavouriteGenre(genre: Genre) {
    this.favourite_genre = genre;
  }

  static stringToGenre(input: string): Genre {
    switch (input) {
      case 'ACTION':
        return Genre.ACTION;
      case 'DRAMA':
        return Genre.DRAMA;
      case 'COMEDY':
        return Genre.COMEDY;
      case 'HORROR':
        return Genre.HORROR;
      case 'THRILLER':
        return Genre.THRILLER;
      default:
        throw new Error('Invalid genre');
    }
  }

  static toMovieModel(movie: any): Movie {
    return new Movie(
      movie.id,
      movie.title,
      movie.synopsis,
      movie.trailer,
      movie.imdb_score,
      movie.stringToGenre(movie.favourite_genre)
    );
  }
}

export interface MovieInputDTO {
  title: string;
  synopsis: string;
  trailer: string;
  imdb_score: string;
  favourite_genre: string;
}
