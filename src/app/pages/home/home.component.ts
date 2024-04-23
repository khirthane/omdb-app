import { SearchBarComponent } from '@/components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router: Router) {}

  onSearch(searchTerm: string): void {
    this.router.navigate(['/search'], { queryParams: { movie: searchTerm } });
  }
}
