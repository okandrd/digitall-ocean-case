import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Crew } from '../../models/crew.model';
import { TranslateModule } from '@ngx-translate/core';

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
  imports: [MatTableModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
  ];
  dataSource = ELEMENT_DATA;
}
