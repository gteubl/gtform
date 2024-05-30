import { Component } from '@angular/core';

import { GtformDrawerService } from 'gtform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'gtform-demo';
  
  public constructor(private drawerService: GtformDrawerService) {
    
  }

  public openLeftDrawer(): void {
    this.drawerService.toggleLeftDrawer();
  }

  public openRightDrawer(): void {
    this.drawerService.toggleRightDrawer();
    
  }
}
