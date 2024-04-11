import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-center items-center h-screen">
      <img src="./assets/images/spinner.svg" alt="loading..." width="100" />
    </div>
  `,
})
export class LoaderComponent {}
