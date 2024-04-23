import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BackButtonComponent],
    });
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
  });

  it('should create a back Button', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back when the button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    spyOn(location, 'back');
    button.click();
    expect(location.back).toHaveBeenCalled();
  });
});
