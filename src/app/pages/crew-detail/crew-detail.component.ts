import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Crew } from '../../models/crew.model';
import { CrewService } from '../../services/crew.service';
import { Certificate } from '../../models/certificate.model';
import { CertificateService } from '../../services/certificate.service';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, Location } from '@angular/common';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { InfoComponent } from './components/info/info.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-crew-detail',
  standalone: true,
  imports: [
    MatTabsModule,
    MatTableModule,
    TranslateModule,
    CommonModule,
    CertificatesComponent,
    InfoComponent,
    MatIcon,
  ],
  templateUrl: './crew-detail.component.html',
  styleUrl: './crew-detail.component.scss',
})
export class CrewDetailComponent {
  @Input()
  id!: string;

  crew!: Crew | undefined;
  certificates!: Certificate[];

  constructor(
    private crewService: CrewService,
    private certifiaceService: CertificateService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.crew = this.crewService.getCrew(parseInt(this.id));
    this.certificates = this.certifiaceService.getCertificatesByCrewId(
      parseInt(this.id)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
