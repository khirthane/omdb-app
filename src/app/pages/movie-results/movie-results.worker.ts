/// <reference lib="webworker" />

import { IMovie } from '@/types/movie';

addEventListener('message', ({ data }) => {
  const movies: IMovie[] = data.movies;
  const groupedByYear: { [year: string]: IMovie[] } = {};

  movies?.forEach((movie) => {
    let year = movie.Year.substring(0, 4);
    if (!groupedByYear[year]) {
      groupedByYear[year] = [];
    }
    groupedByYear[year].push(movie);
  });

  postMessage(groupedByYear);
});
