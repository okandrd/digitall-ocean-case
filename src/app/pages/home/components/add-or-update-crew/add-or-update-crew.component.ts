import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CrewService } from '../../../../services/crew.service';
import { Crew } from '../../../../models/crew.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-or-update-crew',
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
    ReactiveFormsModule,
  ],
  templateUrl: './add-or-update-crew.component.html',
  styleUrl: './add-or-update-crew.component.scss',
})
export class AddCrewComponent {
  readonly updateData = inject<Crew>(MAT_DIALOG_DATA);
  newCrewForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCrewComponent>,
    private crewService: CrewService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newCrewForm = this.fb.group({
      firstName: [
        this.updateData?.firstName || '',
        [Validators.required, Validators.minLength(1)],
      ],
      lastName: [
        this.updateData?.lastName || '',
        [Validators.required, Validators.minLength(1)],
      ],
      nationality: [this.updateData?.nationality || null, Validators.required],
      title: [this.updateData?.title || null, Validators.required],
      daysOnBoard: [this.updateData?.daysOnBoard || 0, Validators.required],
      dailyRate: [this.updateData?.dailyRate || 0, Validators.required],
      currency: [this.updateData?.currency || null, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addCrew(): void {
    if (this.newCrewForm.valid) {
      if (this.updateData) {
        this.crewService.updateCrew({
          ...this.newCrewForm.value,
          id: this.updateData.id,
        });
      } else {
        this.crewService.addCrew(this.newCrewForm.value);
      }
      this.dialogRef.close();
    }
  }
}
