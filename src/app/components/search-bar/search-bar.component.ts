import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppIntl } from 'src/assets/i10n/app.intl';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="relative flex items-center w-full rounded-lg focus-within:shadow-lg bg-white overflow-hidden shadow-sm"
      [class]="searchSize === 'lg' ? 'h-16' : 'h-12'"
    >
      <div class="grid place-items-center h-full w-12 text-grey pl-2">
        <img src="./assets/images/icons/search.svg" width="20" />
      </div>

      <input
        class="peer h-full outline-none text-md pr-2 w-full"
        type="text"
        [(ngModel)]="searchTerm"
        id="search"
        placeholder="{{ placeholder }}"
        (change)="onChangeSeachText()"
      />

      <button
        *ngIf="searchSize === 'lg'"
        (click)="onChangeSeachText()"
        class="search-button"
        [disabled]="!searchTerm"
      >
        {{ intl.search }}
      </button>
    </div>
  `,
})
export class SearchBarComponent {
  intl = inject(AppIntl);

  @Output() searchEvent = new EventEmitter<string>();
  @Input() searchTerm: string = '';
  @Input() placeholder: string = this.intl.searchMovies;
  @Input() searchSize: 'lg' | 'md' = 'md';

  onChangeSeachText(): void {
    this.searchEvent.emit(this.searchTerm);
  }
}
