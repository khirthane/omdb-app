import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from '@/components/movie-card/movie-card.component';
import { MovieListService } from '@/shared/services/movie-list/movie-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppIntl } from 'src/assets/i10n/app.intl';
import { MovieResultsComponent } from './movie-results.component';

describe('MovieResultsComponent', () => {
  let component: MovieResultsComponent;
  let fixture: ComponentFixture<MovieResultsComponent>;

  const mockActivatedRoute = {
    queryParams: of({ movie: 'test' }),
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockMovieListService = {
    getMoviesList: () =>
      of({
        Response: 'True',
        Search: [
          { Title: 'Test Movie 1', Year: '2022' },
          { Title: 'Test Movie 2', Year: '2023' },
        ],
      }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieCardComponent, RouterTestingModule],
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: AppIntl, useValue: { noImage: 'No Image' } },
        { provide: MovieListService, useValue: mockMovieListService },
      ],
    });
    fixture = TestBed.createComponent(MovieResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Movie Results Component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with movie title', () => {
    expect(component.movieTitle()).toEqual('test');
  });

  it('should fetch movies and populate movies array', () => {
    expect(component.movies.length).toEqual(2);
    expect(component.movies[0].Title).toEqual('Test Movie 1');
    expect(component.movies[1].Title).toEqual('Test Movie 2');
  });

  it('should navigate to movie details if movie title starts with "tt"', () => {
    component.movieTitle.set('tt1234567');
    component.fetchMovies();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movie-details'], {
      queryParams: { id: 'tt1234567' },
    });
  });

  it('should call fetchMovies on search', () => {
    spyOn(component, 'fetchMovies').and.returnValue(Promise.resolve());
    component.onSearch('new search');
    expect(component.fetchMovies).toHaveBeenCalled();
    expect(component.movieTitle()).toEqual('new search');
  });
});
