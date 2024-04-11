import { IMDB_URL } from '@/constants/urls';
import { IMovie } from '@/types/movie';
import { IMovieDetails } from '@/types/movieDetail';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppIntl } from 'src/assets/i10n/app.intl';
import { MovieBadgeComponent } from '../movie-badge/movie-badge.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MovieBadgeComponent],
  host: { class: 'w-full sm:w-1/6' },
  template: `
    <div class="movie-card relative bg-white/40 rounded-lg shadow-lg duration-300 hover:scale-105">
      <ng-container *ngIf="movie.Poster !== 'N/A'">
        <img
          class="rounded-t-lg h-full sm:h-60 w-full object-fill cursor-pointer"
          [src]="movie.Poster"
          [alt]="movie.Title"
          (click)="openDetails(movie.imdbID)"
        />
      </ng-container>
      <ng-container *ngIf="movie.Poster === 'N/A'">
        <div
          (click)="openDetails(movie.imdbID)"
          class="w-full bg-purple-400 rounded-t-lg h-60 flex items-center justify-center cursor-pointer"
        >
          {{ intl.noImage }}
        </div>
      </ng-container>

      <div class="mb-2 text-sm p-3">
        <a [href]="generateUrl(movie.imdbID)" target="_blank" class="movie-link inline-block">
          <img src="./assets/images/imdb.svg" width="30" alt="IMDB Link" />
        </a>
        <div class="movie-title mb-2">
          {{ movie.Title }}
        </div>
        <app-movie-badge [movieType]="movie.Type"></app-movie-badge>
      </div>
    </div>
  `,
})
export class MovieCardComponent {
  @Input() movie!: IMovie | IMovieDetails;
  intl = inject(AppIntl);

  router = inject(Router);

  generateUrl(id: string): string {
    return `${IMDB_URL}title/${id}`;
  }

  openDetails(id: string): void {
    this.router.navigate(['/movie-details'], {
      queryParams: { id },
    });
  }
}
