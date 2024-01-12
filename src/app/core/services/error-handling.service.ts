import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() {}

  logError(message: string) {
    this.errorMessageSubject.next(message);
  }

  clearError() {
    this.errorMessageSubject.next(null);
  }
}