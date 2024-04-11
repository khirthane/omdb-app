import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService {
  private errorSubject = new BehaviorSubject<string>('');

  setError(error: string) {
    this.errorSubject.next(error);
  }

  getError() {
    return this.errorSubject.asObservable();
  }
}
