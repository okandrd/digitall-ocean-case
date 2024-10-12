import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CertificateType } from '../../../../models/certificateType.model';
import { CertificateService } from '../../../../services/certificateType.service';

@Component({
  selector: 'app-add-types',
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
  templateUrl: './add-types.component.html',
  styleUrl: './add-types.component.scss',
})
export class AddTypesComponent {
  newTypeData: Omit<CertificateType, 'id'> = {
    name: '',
    description: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddTypesComponent>,
    private certificateService: CertificateService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  addType(): void {
    this.certificateService.addCertificateType(this.newTypeData);
    this.dialogRef.close();
  }
}
