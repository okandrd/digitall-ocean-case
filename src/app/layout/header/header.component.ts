import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from '../../models/language.type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public translate: TranslateService) {}

  languageOptions = [
    { value: 'en', label: 'English', img: 'assets/flags/en.png' },
    { value: 'fr', label: 'French', img: 'assets/flags/fr.png' },
    { value: 'pt', label: 'Portuguese', img: 'assets/flags/pt.png' },
  ];
  selectedLanguage = 'en';
  selectedLangOption = this.languageOptions.find(
    (option) => option.value === this.selectedLanguage
  );

  // ngOnInit(): void {
  //   this.selectedLangOption = this.languageOptions.find(
  //     (option) => option.value === this.translate.currentLang
  //   );
  // }

  onLanguageChange(newLang: string) {
    this.selectedLanguage = newLang;
    this.selectedLangOption = this.languageOptions.find(
      (option) => option.value === newLang
    );
    this.translate.use(newLang);
  }
}
