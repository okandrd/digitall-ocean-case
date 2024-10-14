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
import { AddTypesComponent } from './components/add-or-update-types/add-or-update-types.component';

@Component({
  selector: 'app-certificate-types',
  standalone: true,
  imports: [
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './certificate-types.component.html',
  styleUrl: './certificate-types.component.scss',
})
export class CertificateTypesComponent {
  certificateTypes$!: Observable<CertificateType[]>;

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

  openAddOrUpdateCertificateTypeDialog(updateData?: CertificateType): void {
    let dialogRef = this.dialog.open(AddTypesComponent, {
      minWidth: '60vw',
      panelClass: 'add_crew_panel',
      data: updateData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.certificateTypes$ =
        this.certificateTypeService.getCertificateTypes();
    });
  }

  // openAddCertificateTypeDialog(): void {
  //   let dialogRef = this.dialog.open(AddTypesComponent, {
  //     minWidth: '60vw',
  //     panelClass: 'add_crew_panel',
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.certificateTypes$ =
  //       this.certificateTypeService.getCertificateTypes();
  //   });
  // }

  // openEditCertificateTypeDialog(certificateType: CertificateType): void {
  //   let dialogRef = this.dialog.open(AddTypesComponent, {
  //     minWidth: '60vw',
  //     panelClass: 'add_crew_panel',
  //     data: certificateType,
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('test');

  //     this.certificateTypes$ =
  //       this.certificateTypeService.getCertificateTypes();
  //   });
  // }

  displayedColumns: string[] = ['name', 'description', 'actions'];
}
