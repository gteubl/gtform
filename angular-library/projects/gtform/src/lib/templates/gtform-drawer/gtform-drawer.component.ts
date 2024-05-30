import { Component } from '@angular/core';

import { GtformDrawerService } from '../../services/gtform-drawer.service';

@Component({
  selector: 'gtform-drawer',
  templateUrl: './gtform-drawer.component.html',
  styleUrl: './gtform-drawer.component.scss'
})
export class GtformDrawerComponent {
  public constructor(public drawerService: GtformDrawerService) {}

  public toggleLeftDrawer(): void {
    this.drawerService.toggleLeftDrawer();
  }

  public toggleRightDrawer(): void {
    this.drawerService.toggleRightDrawer();
  }
  
}
