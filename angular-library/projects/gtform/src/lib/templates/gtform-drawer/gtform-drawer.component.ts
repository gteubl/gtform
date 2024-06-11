import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, filter } from 'rxjs';

import { GtformDrawerService } from './gtform-drawer.service';

@Component({
  selector: 'gtform-drawer',
  templateUrl: './gtform-drawer.component.html',
  styleUrl: './gtform-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GtformDrawerService]
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

  public constructor(private drawerService: GtformDrawerService, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.drawerService.leftDrawerState$
      .pipe(
        filter(() => this.hasLeftDrawerContent.value)
      )
      .subscribe(state => {
        this.isLeftDrawerOpen = state;
        this.cdr.detectChanges();
      });

    this.drawerService.rightDrawerState$
      .pipe(
        filter(() => this.hasRightDrawerContent.value)
      ).subscribe(state => {
        this.isRightDrawerOpen = state;
        this.cdr.detectChanges();
      });
  }

  public ngAfterViewInit(): void {
    this.hasRightDrawerContent.next(this.rightDrawerElement?.nativeElement.children.length > 0);
    this.hasLeftDrawerContent.next(this.leftDrawerElement?.nativeElement.children.length > 0);
    this.cdr.detectChanges();
  }

}
