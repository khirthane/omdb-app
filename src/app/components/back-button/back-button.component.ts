import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="goBack()" class="button bg-violet-200 p-3 rounded-full">
      <img src="./assets/images/icons/left-arrow.svg" alt="back-button" width="15" />
    </button>
  `,
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
