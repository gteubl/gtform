import { Component, OnInit } from '@angular/core';

import { GtformDrawerService } from '../../services/index';

@Component({
  selector: 'gtform-drawer',
  templateUrl: './gtform-drawer.component.html',
  styleUrl: './gtform-drawer.component.scss'
})
export class GtformDrawerComponent implements OnInit {

  public isLeftDrawerOpen = false;
  public isRightDrawerOpen = false;

  public constructor(private drawerService: GtformDrawerService) {
  }

  public ngOnInit(): void {
    this.drawerService.leftDrawerState$.subscribe(state => {
      this.isLeftDrawerOpen = state;
    });

    this.drawerService.rightDrawerState$.subscribe(state => {
      this.isRightDrawerOpen = state;
    });
  }

}
