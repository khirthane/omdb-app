import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIntl } from 'src/assets/i10n/app.intl';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [AppIntl],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Home Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-search-bar component', () => {
    const searchBarElement =
      fixture.nativeElement.querySelector('app-search-bar');
    expect(searchBarElement).toBeTruthy();
  });
});
