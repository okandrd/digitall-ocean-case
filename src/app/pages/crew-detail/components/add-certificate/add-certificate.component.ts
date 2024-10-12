import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CertificateService } from '../../../../services/certificate.service';
import { Certificate } from '../../../../models/certificate.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CertificateType } from '../../../../models/certificateType.model';
import { CertificateTypeService } from '../../../../services/certificateType.service';
import { Observable } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatCommonModule,
  provideNativeDateAdapter,
} from '@angular/material/core';

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
  ],
  templateUrl: './add-certificate.component.html',
  styleUrl: './add-certificate.component.scss',
})
export class AddCertificateComponent {
  readonly data = inject<number>(MAT_DIALOG_DATA);
  newCertificate!: Omit<Certificate, 'id'>;
  certificateTypes!: CertificateType[];

  constructor(
    public dialogRef: MatDialogRef<AddCertificateComponent>,
    private certificateService: CertificateService,
    private certificateTypeService: CertificateTypeService
  ) {}

  ngOnInit(): void {
    this.certificateTypes = this.certificateTypeService.getCertificateTypes();
    this.newCertificate = {
      type: this.certificateTypes[0],
      crewId: this.data,
      issueDate: new Date().toISOString(),
      expiryDate: new Date().toISOString(),
    };

    console.log(this.newCertificate);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addCertificate(): void {
    this.certificateService.addCertificate(this.newCertificate);
    this.dialogRef.close();
  }
}
