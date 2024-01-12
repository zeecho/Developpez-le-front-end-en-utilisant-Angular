import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from '../../core/services/olympic.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  countryName!: string;
  numberOfMedals$!: Observable<number>;
  numberOfAthletes$!: Observable<number>;
  participationsNumber$!: Observable<Object>;
  medalsNumber$!: Observable<Object>;
  participationsData$!: Observable<Object>;

  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.countryName = this.route.snapshot.params['country'];
    let i = 0;
    this.olympicService.getCountry(this.countryName).pipe(take(2)).subscribe(country => {
      if (i == 1 && country.length < 1) {
        this.router.navigateByUrl('/not-found');
      }
      i++;
    })
    
    this.participationsNumber$ = this.olympicService.getParticipationsNumberByCountryName(this.countryName);
    this.participationsData$ = this.olympicService.getParticipationsDataByCountryName(this.countryName);


    this.numberOfAthletes$ = this.olympicService.getNumberOfAthletesByCountryName(this.countryName);
    this.numberOfMedals$ = this.olympicService.getNumberOfMedalsByCountryName(this.countryName);
  }

  formatDataLabel(year: number) {
    // show only leap years (because summer Olympics are only on leap years)
    // used to display only relevant years in a country's chart
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
      return year.toString();
    }
    return '';
  }
}
