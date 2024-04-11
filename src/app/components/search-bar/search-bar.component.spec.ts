import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIntl } from 'src/assets/i10n/app.intl';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [AppIntl],
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Search bar Component', () => {
    expect(component).toBeTruthy();
  });

  it('should set placeholder correctly', () => {
    const placeholder = 'Search movies';
    component.placeholder = placeholder;
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.getAttribute('placeholder')).toEqual(placeholder);
  });

  it('should set searchSize correctly', () => {
    component.searchSize = 'lg';
    fixture.detectChanges();
    const searchBarElement = fixture.nativeElement.querySelector('.h-16');
    expect(searchBarElement).toBeTruthy();

    component.searchSize = 'md';
    fixture.detectChanges();
    const searchBarElement2 = fixture.nativeElement.querySelector('.h-12');
    expect(searchBarElement2).toBeTruthy();
  });
});
