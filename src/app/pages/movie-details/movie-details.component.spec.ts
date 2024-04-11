import { MovieListService } from '@/shared/services/movie-list/movie-list.service';
import { IMovieDetails } from '@/types/movieDetail';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppIntl } from 'src/assets/i10n/app.intl';
import { MovieDetailsComponent } from './movie-details.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  const mockActivatedRoute = {
    queryParams: of({ id: '123' }),
  };

  const mockMovieListService = {
    getMoviebyId: () =>
      of({
        Title: 'Test Movie',
        Plot: 'Test Plot',
        Poster: 'test-poster-url',
      } as IMovieDetails),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: AppIntl, useValue: { noImage: 'No Image Available' } },
        { provide: MovieListService, useValue: mockMovieListService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Movie Details Component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with movie details', () => {
    expect(component.movieId).toEqual('123');
    expect(component.movie).toBeTruthy();
    expect(component.movie.Title).toEqual('Test Movie');
    expect(component.movie.Plot).toEqual('Test Plot');
  });

  it('should display movie details when movie is available', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-loader')).toBeFalsy();
    expect(compiled.querySelector('.max-w-screen-xl')).toBeTruthy();
    expect(compiled.querySelector('.movie-title').textContent).toContain(
      'Test Movie',
    );
    expect(compiled.querySelector('.movie-plot').textContent).toContain(
      'Test Plot',
    );
  });

  it('should display placeholder when movie poster is not available', () => {
    mockMovieListService.getMoviebyId = () =>
      of({
        Title: 'Test Movie',
        Plot: 'Test Plot',
        Poster: 'N/A',
      } as IMovieDetails);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.movie-title').textContent).toContain(
      'Test Movie',
    );
    expect(compiled.querySelector('.movie-plot').textContent).toContain(
      'Test Plot',
    );
  });
});
