import { Component } from '@angular/core';

import { GtformDrawerService } from 'gtform';

import { GtformThemeService } from '../../../gtform/src/lib/services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'gtform-demo';
  
  public constructor(private drawerService: GtformDrawerService,
                     private themeService: GtformThemeService,
  ) {
    this.themeService.setTheme('light');
    console.log('AppComponent.constructor()');
    
  }

  public openLeftDrawer(): void {
    this.drawerService.toggleLeftDrawer();
  }

  public openRightDrawer(): void {
    this.drawerService.toggleRightDrawer();
    
  }
}
