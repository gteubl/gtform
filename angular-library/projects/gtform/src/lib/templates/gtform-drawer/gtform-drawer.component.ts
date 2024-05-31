import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

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

  private hasRightDrawerContent = new BehaviorSubject(false);
  public hasRightDrawerContent$ = this.hasRightDrawerContent.asObservable();


  private hasLeftDrawerContent = new BehaviorSubject(false);
  public hasLeftDrawerContent$ = this.hasLeftDrawerContent.asObservable();

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
    this.hasRightDrawerContent.next(this.rightDrawerElement?.nativeElement.children.length > 0);
    this.hasLeftDrawerContent.next( this.leftDrawerElement?.nativeElement.children.length > 0);
  }

}
