import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CrewService } from '../../../../services/crew.service';
import { Crew } from '../../../../models/crew.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-crew',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatCommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    TranslateModule,
    MatRadioModule,
  ],
  templateUrl: './add-crew.component.html',
  styleUrl: './add-crew.component.scss',
})
export class AddCrewComponent {
  newCrewData: Omit<Crew, 'id'> = {
    firstName: '',
    lastName: '',
    nationality: '',
    title: '',
    daysOnBoard: 0,
    dailyRate: 0,
    currency: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddCrewComponent>,
    private crewService: CrewService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  addCrew(): void {
    this.crewService.addCrew(this.newCrewData);
    this.dialogRef.close();
  }
}
