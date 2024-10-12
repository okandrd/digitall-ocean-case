import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateType } from '../../models/certificateType.model';
import { CertificateTypeService } from '../../services/certificateType.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddTypesComponent } from './components/add-types/add-types.component';

@Component({
  selector: 'app-certificate-types',
  standalone: true,
  imports: [
    MatTableModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './certificate-types.component.html',
  styleUrl: './certificate-types.component.scss',
})
export class CertificateTypesComponent {
  certificateTypes$!: CertificateType[];

  constructor(
    private certificateTypeService: CertificateTypeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.certificateTypes$ = this.certificateTypeService.getCertificateTypes();
  }

  deleteCertificateType(id: number): void {
    this.certificateTypeService.deleteCertificateType(id);
    this.certificateTypes$ = this.certificateTypeService.getCertificateTypes();
  }

  openAddCrewDialog(): void {
    let dialogRef = this.dialog.open(AddTypesComponent, {
      minWidth: '60vw',
      panelClass: 'add_crew_panel',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.certificateTypes$ =
        this.certificateTypeService.getCertificateTypes();
    });
  }

  displayedColumns: string[] = ['name', 'description', 'actions'];
}
