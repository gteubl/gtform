import { Component } from '@angular/core';

@Component({
  selector: 'gtform-drawer',
  templateUrl: './gtform-drawer.component.html',
  styleUrl: './gtform-drawer.component.scss'
})
export class GtformDrawerComponent {
  public isLeftOpen: boolean = false;
  public isRightOpen: boolean = false;

  public toggleDrawer(side: 'left' | 'right'): void {
    if (side === 'left') {
      this.isLeftOpen = !this.isLeftOpen;
    } else if (side === 'right') {
      this.isRightOpen = !this.isRightOpen;
    }
  }
}
