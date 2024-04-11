import { MovieBadgeColors } from '@/constants/movieBadgeColors';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieBadgeComponent } from './movie-badge.component';

@Component({
  template: ` <app-movie-badge [movieType]="movieType"></app-movie-badge> `,
})
class TestHostComponent {
  movieType: string | null = null;
}

describe('MovieBadgeComponent', () => {
  let component: MovieBadgeComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [CommonModule, MovieBadgeComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should render with default color for null movieType', () => {
    expect(getBadgeElement().classList.contains('bg-black')).toBe(true);
    expect(getBadgeElement().classList.contains('text-white')).toBe(true);
  });

  it('should render with correct color for provided movieType', () => {
    const testMovieType = 'movie'; // Assuming 'movie' is one of the keys in MovieBadgeColors
    fixture.componentInstance.movieType = testMovieType;
    fixture.detectChanges();

    expect(getBadgeElement().classList.contains(MovieBadgeColors.movie)).toBe(
      true
    );
  });

  function getBadgeElement(): HTMLElement {
    return fixture.nativeElement.querySelector('span');
  }
});
