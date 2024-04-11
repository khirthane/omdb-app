import { MovieType } from './movie';

export type IMovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Write: string;
  Actor: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: MovieType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type IRatings = {
  Source: string;
  Value: string;
};
