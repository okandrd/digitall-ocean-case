import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Crew } from '../../models/crew.model';
import { CrewService } from '../../services/crew.service';
import { RouterLink } from '@angular/router';

const ELEMENT_DATA: Crew[] = [
  {
    id: 1,
    firstName: 'Okan',
    lastName: 'Durdu',
    nationality: 'Turk',
    title: 'Engineer',
    daysOnBoard: 10,
    dailyRate: 100,
    currency: 'USD',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  crews$!: Observable<Crew[]>;

  constructor(private crewService: CrewService) {}

  ngOnInit(): void {
    this.crews$ = this.crewService.getCrews();
  }

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome',
    'certificates',
    'actions',
  ];
}
