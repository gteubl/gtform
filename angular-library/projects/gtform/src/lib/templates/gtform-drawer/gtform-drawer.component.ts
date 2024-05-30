import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { GtformDrawerService } from '../../services/index';

@Component({
  selector: 'gtform-drawer',
  templateUrl: './gtform-drawer.component.html',
  styleUrl: './gtform-drawer.component.scss'
})
export class GtformDrawerComponent implements OnInit, AfterViewInit {
  @Input() public alwaysShowDrawer = false;
  public isLeftDrawerOpen = false;
  public isRightDrawerOpen = false;

  @ViewChild('leftDrawer') public leftDrawerElement: ElementRef | undefined;
  @ViewChild('rightDrawer') public rightDrawerElement: ElementRef | undefined;

  public hasRightDrawerContent = false;
  public hasLeftDrawerContent = false;

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

  public ngAfterViewInit(): void {
    this.hasRightDrawerContent = this.rightDrawerElement?.nativeElement.children.length > 0;
    this.hasLeftDrawerContent = this.leftDrawerElement?.nativeElement.children.length > 0;
  }

}
