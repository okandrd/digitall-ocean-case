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
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CertificateType } from '../../../../models/certificateType.model';
import { CertificateTypeService } from '../../../../services/certificateType.service';

@Component({
  selector: 'app-add-or-update-types',
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
  templateUrl: './add-or-update-types.component.html',
  styleUrl: './add-or-update-types.component.scss',
})
export class AddTypesComponent {
  readonly updateData = inject<CertificateType>(MAT_DIALOG_DATA);
  newTypeFrom!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTypesComponent>,
    private certificateTypeService: CertificateTypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.newTypeFrom = this.fb.group({
      name: [
        this.updateData?.name || '',
        [Validators.required, Validators.minLength(1)],
      ],
      description: [
        this.updateData?.description || '',
        [Validators.required, Validators.minLength(1)],
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addType(): void {
    if (this.newTypeFrom.valid) {
      if (this.updateData) {
        this.certificateTypeService.updateCertificateType({
          ...this.newTypeFrom.value,
          id: this.updateData.id,
        });
      } else {
        this.certificateTypeService.addCertificateType(this.newTypeFrom.value);
      }
      this.dialogRef.close();
    }
  }
}
