import { Genre } from './Genre';

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private favourite_genre: Genre
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getFavouriteGenre() {
    return this.favourite_genre;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setFavouriteGenre(genre: Genre) {
    this.favourite_genre = genre;
  }

  static stringToGenre(input: string): Genre {
    switch (input) {
      case 'Ação':
        return Genre.ACTION;
      case 'Drama':
        return Genre.DRAMA;
      case 'Comédia':
        return Genre.COMEDY;
      case 'Terror':
        return Genre.HORROR;
      case 'Suspense':
        return Genre.THRILLER;
      default:
        throw new Error('Invalid genre');
    }
  }

  static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      User.stringToGenre(user.favourite_genre)
    );
  }
}

export interface UserInputDTO {
  email: string;
  password: string;
  name: string;
  favourite_genre: string;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}
