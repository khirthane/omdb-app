import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppIntl } from 'src/assets/i10n/app.intl';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [{ provide: Router, useValue: routerSpyObj }, AppIntl],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create Navbar Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the navbar correctly', () => {
    const navElement = fixture.debugElement.nativeElement.querySelector('nav');
    expect(navElement).toBeTruthy();
  });

  it('should navigate to home page when clicked', () => {
    const linkElement = fixture.debugElement.query(By.css('span'));
    linkElement.triggerEventHandler('click', null);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
