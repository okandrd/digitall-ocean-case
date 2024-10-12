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
import { CommonModule } from '@angular/common';
import { AddCrewComponent } from './components/add-crew/add-crew.component';
import { MatDialog } from '@angular/material/dialog';

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
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  crews$!: Observable<Crew[]>;
  total: {} = {};

  constructor(private crewService: CrewService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.crews$ = this.crewService.getCrews();
    this.crews$.forEach((a) => {
      let result = a.reduce(function (r, a) {
        r[a.currency] = r[a.currency] || 0;
        r[a.currency] += a.daysOnBoard * a.dailyRate;
        return r;
      }, Object.create(null));
      this.total = result;
    });
  }

  openAddCrewDialog(): void {
    let dialogRef = this.dialog.open(AddCrewComponent, {
      minWidth: '60vw',
      panelClass: 'add_crew_panel',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.crews$ = this.crewService.getCrews();
    });
  }

  deleteCrew(id: number): void {
    this.crewService.deleteCrew(id);
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
