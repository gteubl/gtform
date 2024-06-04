import { Component } from '@angular/core';

import { GtformThemeService } from 'gtform';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public constructor(private themeService: GtformThemeService) {
  }

  public changeLanguage(lang: string): void {
    this.themeService.changeLanguage(lang);
  }

  public setTheme(theme: string): void {
    this.themeService.setTheme(theme);

  }

  public toggleTheme(): void {
    this.themeService.toggleLightDarkTheme();
  }
}
