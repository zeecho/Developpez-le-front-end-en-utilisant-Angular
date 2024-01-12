import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { catchError, tap, map, filter, take, takeUntil } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  public errorMessage$ = this.errorHandlingService.errorMessage$;

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {}

  loadInitialData() {
    var initialData = this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.errorHandlingService.logError(error.message);
        return caught;
      })
    );

    return initialData;
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicsDataForChartPie(): Observable<Object[]> {
    return this.getOlympics().pipe(
      map(olympics => {
        return olympics.map(olympic => {
          return {
            id: olympic.id,
            name: olympic.country,
            value: olympic.participations.reduce((sumMedalsCount, participation) => sumMedalsCount + participation.medalsCount, 0)
          };
        })
      })
    );
  }

  getNumberOfParticipationYears(olympics: Olympic[]): number {
    let participationYears:number[] = [];
    olympics.map(country => {
      country.participations.map(participation => {
        if (!participationYears.includes(participation.year)) {
          participationYears.push(participation.year);
        }
      });
    });
    return participationYears.length;
  }

  getCountry(countryName: string) {
    return this.getOlympics().pipe(
      map(olympics => {
        return olympics.filter(olympic => olympic.country == countryName)
      })
    )
  }

  getAllAvailableCountries() {
    let countries:string[] = [];

    this.getOlympics().pipe(
      map(olympics => {
        olympics.map(country => {
          countries.push(country.country);
        })
      })
    )

    return countries;
  }

  getCountryOrRedirect(countryName: string) {
    let country = this.getCountry(countryName);
    country.pipe(
      map(country => {
        console.log(country);
      })
    )
  }

  getParticipationsNumberByCountryName(countryName: string) {
    return this.getCountry(countryName).pipe(
      map(country => {
          return country.map(olympicsCountry => {
            return olympicsCountry.participations.length;
          }
          )
      }
    ))
  }

  getNumberOfMedalsByCountryName(countryName: string) {
    return this.getCountry(countryName).pipe(
      map(country => {
        let medals = 0;
        country.map(olympicsCountry => {
          return olympicsCountry.participations.map(participation => {
            medals += participation.medalsCount;
          })
        })
        return medals;
      })
    )
  }

  getNumberOfAthletesByCountryName(countryName: string) {
    return this.getCountry(countryName).pipe(
      map(country => {
        let athletes = 0;
        country.map(olympicsCountry => {
          return olympicsCountry.participations.map(participation => {
            athletes += participation.athleteCount;
          })
        })
        return athletes;
      })
    )
  }

  getParticipationsDataByCountryName(countryName: string): Observable<Object[]> {
    return this.getOlympics().pipe(
      map(olympics => {
        return olympics.filter(olympic => olympic.country == countryName)
          .map(olympicCountry => {
          return { 
            name: `${countryName}`,
            series: olympicCountry.participations.map(participation => {
            return {
              value: participation.medalsCount,
              name: participation.year
            }
            })
          }
        })
      })
    )
  }
}
