/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';

import { filter } from 'rxjs';

import { GtformDrawerService } from './gtform-drawer.service';

@Component({
  selector: 'gtform-drawer',
  templateUrl: './gtform-drawer.component.html',
  styleUrl: './gtform-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GtformDrawerComponent implements OnInit, AfterViewInit {
  @Input() public leftDrawerExpanded: TemplateRef<any> | undefined;
  @Input() public leftDrawerCollapsed: TemplateRef<any> | undefined;
  @Input() public rightDrawerExpanded: TemplateRef<any> | undefined;
  @Input() public rightDrawerCollapsed: TemplateRef<any> | undefined;
  public isLeftDrawerOpen = false;
  public isRightDrawerOpen = false;
  public leftDrawerState = this.drawerService.leftDrawerState$;
  public rightDrawerState = this.drawerService.rightDrawerState$;

  public constructor(private drawerService: GtformDrawerService, private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {

    if (this.hasLeftDrawerCollapsedContent) {
      this.drawerService.leftDrawerCloseState = 'collapsed';
      this.drawerService.setLeftDrawerState('collapsed');
    }

    if (this.hasRightDrawerCollapsedContent) {
      this.drawerService.rightDrawerCloseState = 'collapsed';
      this.drawerService.setRightDrawerState('collapsed');
    }

    this.drawerService.leftDrawerState$
      .pipe(
        filter(() => this.leftDrawerExpanded !== undefined)
      )
      .subscribe(state => {
        console.log('left drawer state', state);
        this.isLeftDrawerOpen = 'expanded' === state;
        this.cdr.detectChanges();
      });

    this.drawerService.rightDrawerState$
      .pipe(
        filter(() => this.rightDrawerExpanded !== undefined)
      ).subscribe(state => {
        this.isRightDrawerOpen = 'expanded' === state;
        this.cdr.detectChanges();
      });
  }

  public ngAfterViewInit(): void {

    // this.drawerService.leftDrawerCloseState = this.hasLeftDrawerCollapsedContent ? 'collapsed' : 'none';
    // this.drawerService.rightDrawerCloseState = this.hasRightDrawerCollapsedContent ? 'collapsed' : 'none';
    //
    // this.cdr.detectChanges();
  }

  public get hasLeftDrawerCollapsedContent(): boolean {
    return !!this.leftDrawerCollapsed;
  }

  public get hasLeftDrawerExpandedContent(): boolean {
    return !!this.leftDrawerExpanded;
  }

  public get hasRightDrawerCollapsedContent(): boolean {
    return !!this.rightDrawerCollapsed;
  }

  public get hasRightDrawerExpandedContent(): boolean {
    return !!this.rightDrawerExpanded;
  }

}
