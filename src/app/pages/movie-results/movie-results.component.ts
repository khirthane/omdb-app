import { MovieCardComponent } from '@/components/movie-card/movie-card.component';

import { NavbarComponent } from '@/components/navbar/navbar.component';
import { SearchBarComponent } from '@/components/search-bar/search-bar.component';
import { GlobalErrorService } from '@/shared/services/global-error/global-error.service';
import { MovieListService } from '@/shared/services/movie-list/movie-list.service';
import { updateUrlParams } from '@/shared/utils/updateUrlParams';
import { IMovie, IMovieListParams, MovieType, ResponseStatus } from '@/types/movie';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { AppIntl } from 'src/assets/i10n/app.intl';

@Component({
  selector: 'app-movie-results',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent, NavbarComponent, SearchBarComponent],
  templateUrl: './movie-results.component.html',
})
export class MovieResultsComponent implements OnInit {
  movieTitle = signal<string>('');
  movieYear = signal<string>('');
  movieType: string = '';
  movies: IMovie[] = [];
  error: string = '';
  movieTypeList = Object.values(MovieType);
  groupedMovies: { [year: string]: IMovie[] } = {};
  groupByYear: boolean = true;
  globalError: string = '';

  constructor(
    public intl: AppIntl,
    private route: ActivatedRoute,
    private router: Router,
    private movieListService: MovieListService,
    private globalErrorService: GlobalErrorService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ movie, year, type = '', grouped = 'true' }) => {
      this.movieTitle.set(movie);
      this.movieYear.set(year);
      this.movieType = type;
      this.groupByYear = grouped === 'true';
      this.fetchMovies();
    });

    this.globalErrorService.getError().subscribe((err) => {
      this.globalError = err;
    });
  }

  onSearch(searchTerm: string) {
    this.router.navigate([], {
      queryParams: {
        movie: searchTerm,
      },
    });

    this.movieTitle.set(searchTerm);
    this.fetchMovies();
  }

  onSearchByYear(year: string) {
    this.movieYear.set(year);
    this.fetchMovies();

    updateUrlParams(this.router, { year });
  }

  onChangeGrouping() {
    updateUrlParams(this.router, { grouped: this.groupByYear.toString() });
  }

  onChangeType() {
    updateUrlParams(this.router, { type: this.movieType });
  }

  async fetchMovies() {
    // this.globalError = '';
    const params: IMovieListParams = {
      title: this.movieTitle(),
      year: this.movieYear(),
      type: this.movieType,
    };

    // Search the movie by ID
    if (this.movieTitle().startsWith('tt')) {
      this.router.navigate(['/movie-details'], {
        queryParams: { id: this.movieTitle() },
      });
    } else {
      // Search the movie title and other filters
      await this.fetchMoviesList(params);
    }
  }

  async fetchMoviesList(params: IMovieListParams) {
    this.movieListService
      .getMoviesList(params)
      .pipe(
        catchError((error) => {
          this.error = error.message;
          return EMPTY;
        }),
      )
      .subscribe((data) => {
        this.movies = data.Search;
        this.handleGroupingByWorker(data.Search);
        if (data.Response === ResponseStatus.False && data.Error) {
          console.log(data.Error);
        }
      });
  }

  handleGroupingByWorker(movies: IMovie[]) {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./movie-results.worker', import.meta.url));
      worker.postMessage({ movies });
      worker.onmessage = ({ data }) => {
        this.groupedMovies = data;
        console.log(this.groupedMovies);
      };
    }
  }
}
