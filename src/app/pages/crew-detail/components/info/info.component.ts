import { Component, Input } from '@angular/core';
import { Crew } from '../../../../models/crew.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() crew!: Crew | undefined;
}
