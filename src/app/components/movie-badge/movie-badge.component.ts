import { MovieBadgeColors } from '@/constants/movieBadgeColors';
import { MovieType } from '@/types/movie';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="movie-badge rounded-xl bg-black text-xs py-0.5 px-2 text-white capitalize"
      [class]="getMovieTypeColor()"
      >{{ movieType }}</span
    >
  `,
})
export class MovieBadgeComponent {
  @Input() movieType: MovieType | null = null;

  getMovieTypeColor() {
    if (this.movieType) {
      return MovieBadgeColors[this.movieType] || MovieBadgeColors['default'];
    }
    return MovieBadgeColors['default'];
  }
}
