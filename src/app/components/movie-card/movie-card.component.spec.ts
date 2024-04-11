import { IMovie, MovieType } from '@/types/movie';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppIntl } from 'src/assets/i10n/app.intl';
import { MovieBadgeComponent } from '../movie-badge/movie-badge.component';
import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockMovieWithPoster: IMovie = {
    Title: 'Mock Movie',
    Poster: 'https://example.com/poster.jpg',
    imdbID: '123456',
    Type: MovieType.Movie,
    Year: '2021',
  };

  const mockMovieWithoutPoster: IMovie = {
    Title: 'Mock Movie',
    Poster: 'N/A',
    imdbID: '123456',
    Type: MovieType.Movie,
    Year: '2021',
  };

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [MovieBadgeComponent, MovieCardComponent, RouterTestingModule],
      declarations: [],
      providers: [{ provide: Router, useValue: routerSpyObj }, AppIntl],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct URL', () => {
    const id = '123456';
    const expectedUrl = `https://www.imdb.com/title/${id}`;
    expect(component.generateUrl(id)).toEqual(expectedUrl);
  });

  it('should navigate to movie details', () => {
    const id = '123456';
    component.openDetails(id);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie-details'], {
      queryParams: { id },
    });
  });

  it('should render movie poster if available', () => {
    component.movie = mockMovieWithPoster;
    fixture.detectChanges();
    const imgElement: DebugElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.getAttribute('src')).toBe(
      mockMovieWithPoster.Poster
    );
  });

  it('should render placeholder if poster is not available', () => {
    component.movie = mockMovieWithoutPoster;
    fixture.detectChanges();
    const placeholderElement: DebugElement = fixture.debugElement.query(
      By.css('.bg-purple-400')
    );
    expect(placeholderElement).toBeTruthy();
  });

  it('should navigate to movie details when poster is clicked', () => {
    spyOn(component, 'openDetails');
    component.movie = mockMovieWithPoster;
    fixture.detectChanges();
    const imgElement: DebugElement = fixture.debugElement.query(By.css('img'));
    imgElement.triggerEventHandler('click', null);
    expect(component.openDetails).toHaveBeenCalledWith(
      mockMovieWithPoster.imdbID
    );
  });

  it('should display movie title with correct link', () => {
    component.movie = mockMovieWithPoster;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const titleLinkElement = compiled.querySelector('.movie-link');

    expect(titleLinkElement).toBeTruthy();
    expect(titleLinkElement.getAttribute('href')).toBe(
      component.generateUrl(mockMovieWithPoster.imdbID)
    );
  });

  it('should display movie title', () => {
    component.movie = mockMovieWithPoster;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.movie-title');

    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain(mockMovieWithPoster.Title);
  });

  it('should display movie type badge', () => {
    component.movie = mockMovieWithPoster;
    fixture.detectChanges();
    const movieBadgeComponent: DebugElement = fixture.debugElement.query(
      By.css('app-movie-badge')
    );
    expect(movieBadgeComponent).toBeTruthy();
    expect(movieBadgeComponent.componentInstance.movieType).toBe(
      mockMovieWithPoster.Type
    );
  });
});
