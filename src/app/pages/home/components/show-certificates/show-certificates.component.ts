import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Certificate } from '../../../../models/certificate.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CertificateService } from '../../../../services/certificate.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-show-certificates',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './show-certificates.component.html',
  styleUrl: './show-certificates.component.scss',
})
export class ShowCertificatesComponent {
  readonly data = inject<number>(MAT_DIALOG_DATA);
  certificates!: Certificate[];

  constructor(
    public dialogRef: MatDialogRef<ShowCertificatesComponent>,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.certificates = this.certificateService.getCertificatesByCrewId(
      this.data
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  displayedColumns: string[] = ['name', 'issueDate', 'expiryDate'];
}
