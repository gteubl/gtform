import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GtformThemeService {
  private fontSize = 16;
  private isLightTheme = true;

  public getFontSize(): number {
    return this.fontSize;
  }

  public setFontSize(size: number): void {
    this.fontSize = size;
    document.documentElement.style.setProperty('--app-font-size', `${size}px`);
  }

  public setTheme(theme: 'light' | 'dark'): void {

    document.body.setAttribute(
      'data-theme',
      theme
    );

    this.isLightTheme = theme === 'light';
  }

  public toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );

  }
}
