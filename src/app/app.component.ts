import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { ErrorHandlingService } from './core/services/error-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  errorMessage$ = this.errorHandlingService.errorMessage$;

  constructor(private olympicService: OlympicService, private errorHandlingService: ErrorHandlingService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe();

  }
}
