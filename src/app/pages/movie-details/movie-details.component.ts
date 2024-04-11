import { LoaderComponent } from '@/components/loader/loader.component';
import { MovieCardComponent } from '@/components/movie-card/movie-card.component';
import { NavbarComponent } from '@/components/navbar/navbar.component';
import { MovieListService } from '@/shared/services/movie-list/movie-list.service';
import { IMovieDetails } from '@/types/movieDetail';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppIntl } from 'src/assets/i10n/app.intl';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MovieCardComponent, LoaderComponent],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  movieId: string = '';
  movie!: IMovieDetails;
  route = inject(ActivatedRoute);
  intl = inject(AppIntl);
  movieListService = inject(MovieListService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.movieId = params['id'];

      this.fetchMoviebyId();
    });
  }

  fetchMoviebyId() {
    this.movieListService.getMoviebyId(this.movieId).subscribe((data) => {
      this.movie = data;
    });
  }
}
