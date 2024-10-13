import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CertificateService } from '../../../../services/certificate.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CertificateType } from '../../../../models/certificateType.model';
import { CertificateTypeService } from '../../../../services/certificateType.service';
import { MatSelectModule } from '@angular/material/select';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatCommonModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-certificate',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatCommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    TranslateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-certificate.component.html',
  styleUrl: './add-certificate.component.scss',
})
export class AddCertificateComponent {
  readonly data = inject<number>(MAT_DIALOG_DATA);
  certificateTypes!: CertificateType[];
  certificateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCertificateComponent>,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let firstType;
    this.certificateTypeService.getCertificateTypes().subscribe((data) => {
      this.certificateTypes = data;
    });

    this.certificateForm = this.fb.group({
      type: [this.certificateTypes[0], Validators.required],
      crewId: [this.data, Validators.required],
      issueDate: [new Date().toISOString(), Validators.required],
      expiryDate: [new Date().toISOString(), Validators.required],
    });

    this.certificateForm
      .get('issueDate')
      ?.valueChanges.subscribe((date: Date) => {
        const expiryDateControl = this.certificateForm.get('expiryDate');
        expiryDateControl?.setValue(null); // eski değerleri temizlemek için
        expiryDateControl?.setValidators([
          Validators.required,
          Validators.min(date.getDate()),
        ]);
        expiryDateControl?.updateValueAndValidity();
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addCertificate(): void {
    if (this.certificateForm) {
      this.certificateService.addCertificate(this.certificateForm.value);
      this.dialogRef.close();
    }
  }
}
