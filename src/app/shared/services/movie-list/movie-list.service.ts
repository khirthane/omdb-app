import { API_KEY } from '@/constants/keys';
import { OMDB_API_URL } from '@/constants/urls';
import { IMovieListParams, IMovieResults } from '@/types/movie';
import { IMovieDetails } from '@/types/movieDetail';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  url = `${OMDB_API_URL}?apikey=${API_KEY}`;

  httpClient = inject(HttpClient);

  getMoviesList(data: IMovieListParams): Observable<IMovieResults> {
    let params = new HttpParams().set('s', data.title);

    if (data.type) {
      params = params.set('type', data.type);
    }

    if (data.year) {
      params = params.set('y', data.year);
    }
    return this.httpClient.get<IMovieResults>(this.url, { params });
  }

  getMoviebyId(id: string): Observable<IMovieDetails> {
    let params = new HttpParams().set('i', id);

    return this.httpClient.get<IMovieDetails>(this.url, { params });
  }
}
