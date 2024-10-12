import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Certificate } from '../../../../models/certificate.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddCertificateComponent } from '../add-certificate/add-certificate.component';
import { CertificateService } from '../../../../services/certificate.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {
  @Input() certificates!: Certificate[];
  @Input() crewId!: number | undefined;

  constructor(
    public dialog: MatDialog,
    private certificateService: CertificateService
  ) {}

  openAddCertificateDialog(): void {
    let dialogRef = this.dialog.open(AddCertificateComponent, {
      minWidth: '60vw',
      panelClass: 'add_panel',
      data: this.crewId,
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.crewId)
        this.certificates = this.certificateService.getCertificatesByCrewId(
          this.crewId
        );
    });
  }

  deleteCertificate(id: number): void {
    this.certificateService.deleteCertificate(id);
    if (this.crewId)
      this.certificates = this.certificateService.getCertificatesByCrewId(
        this.crewId
      );
  }

  displayedColumns: string[] = ['name', 'issueDate', 'expiryDate', 'actions'];
}
