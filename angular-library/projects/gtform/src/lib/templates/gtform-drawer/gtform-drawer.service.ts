import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GtformDrawerService {
  private leftDrawerState = new BehaviorSubject<boolean>(false);
  public leftDrawerState$ = this.leftDrawerState.asObservable();
  private rightDrawerState = new BehaviorSubject<boolean>(false);
  public rightDrawerState$ = this.rightDrawerState.asObservable();

  public get isLeftDrawerOpen(): boolean {
    return this.leftDrawerState.value;
  }

  public get isRightDrawerOpen(): boolean {
    return this.rightDrawerState.value;
  }

  public closeAllDrawers(): void {
    this.leftDrawerState.next(false);
    this.rightDrawerState.next(false);
  }

  public setLeftDrawerState(open: boolean): void {
    this.leftDrawerState.next(open);
  }

  public setRightDrawerState(open: boolean): void {
    this.rightDrawerState.next(open);
  }

  public toggleLeftDrawer(): void {
    this.leftDrawerState.next(!this.leftDrawerState.value);
  }

  public toggleRightDrawer(): void {
    this.rightDrawerState.next(!this.rightDrawerState.value);
  }
}
