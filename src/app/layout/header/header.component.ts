import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from '../../models/language.type';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    CommonModule,
    MatSelectModule,
    MatIconModule,
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
  menuIcon = 'menu_open';

  ngOnInit(): void {
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.menuIcon = 'menu';
    }
  }

  onLanguageChange(newLang: string) {
    this.selectedLanguage = newLang;
    this.selectedLangOption = this.languageOptions.find(
      (option) => option.value === newLang
    );

    this.translate.use(newLang);
  }

  menuToggle(): void {
    document.body.classList.toggle('menu-closed');
    this.menuIcon = this.menuIcon === 'menu_open' ? 'menu' : 'menu_open';
  }
}
