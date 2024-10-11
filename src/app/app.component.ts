import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'digitall-ocean';
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'fr', 'pt']);
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|fr|pt/) ? browserLang : 'en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
