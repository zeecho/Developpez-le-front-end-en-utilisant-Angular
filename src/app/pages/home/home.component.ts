import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, map, reduce, partition, take } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;
  public olympicsDataForChartPie$!: Observable<Object[]>;
  public numberOfJOs!: number;

  constructor(protected olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.pipe(take(2)).subscribe(olympics => {
      this.numberOfJOs = this.olympicService.getNumberOfParticipationYears(olympics);
    }
    );

    this.olympicsDataForChartPie$ = this.olympicService.getOlympicsDataForChartPie();
  }

  navigateToPieSliceSelected(event: any): void {
    this.router.navigateByUrl(`/country/${event.name}`);
  }

  tooltipTextWithMedal(event: any): string {
    return `${event.data.label}<br/> 🏅 ${event.data.value}`;
  }
}
