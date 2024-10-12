import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CrewDetailComponent } from './pages/crew-detail/crew-detail.component';
import { CertificateTypesComponent } from './pages/certificate-types/certificate-types.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'certificate-types',
        component: CertificateTypesComponent,
      },
      {
        path: 'crew/:id',
        component: CrewDetailComponent,
      },
    ],
  },
];
