import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-crew-detail',
  standalone: true,
  imports: [],
  templateUrl: './crew-detail.component.html',
  styleUrl: './crew-detail.component.scss',
})
export class CrewDetailComponent {
  @Input()
  id!: string;
}
