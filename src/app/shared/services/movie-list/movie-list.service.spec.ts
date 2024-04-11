import { API_KEY } from '@/constants/keys';
import { OMDB_API_URL } from '@/constants/urls';
import { IMovieListParams, IMovieResults, ResponseStatus } from '@/types/movie';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieListService } from './movie-list.service';

describe('MovieListService', () => {
  let service: MovieListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieListService],
    });
    service = TestBed.inject(MovieListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movie list with correct URL and parameters', () => {
    const testData: IMovieResults = {
      Search: [],
      totalResults: '0',
      Response: ResponseStatus.True,
    };
    const params: IMovieListParams = {
      title: 'test',
      type: 'movie',
      year: '2022',
    };

    service.getMoviesList(params).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const expectedUrl = `${OMDB_API_URL}?apikey=${API_KEY}&s=${params.title}&type=${params.type}&y=${params.year}`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
