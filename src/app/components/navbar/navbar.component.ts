import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppIntl } from 'src/assets/i10n/app.intl';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white h-16">
      <div
        class="max-w-screen-xl mx-auto text-grey flex h-16 items-center text-2xl shadow-sm p-5 cursor-pointer"
      >
        <span (click)="goToHomePage()">{{ intl.omdb }}</span>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(
    public intl: AppIntl,
    private router: Router,
  ) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
