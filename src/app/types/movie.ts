export type IMovie = {
  Poster: string;
  Title: string;
  Type: MovieType;
  Year: string;
  imdbID: string;
};

export type IMovieResults = {
  Response: ResponseStatus;
  Search: IMovie[];
  totalResults: string;
  Error?: string;
};

export enum ResponseStatus {
  True = 'True',
  False = 'False',
}

export enum MovieType {
  Movie = 'movie',
  Series = 'series',
  Game = 'game',
  Episode = 'episode',
}

export type IMovieListParams = {
  title: string;
  year?: string;
  type?: string;
};
