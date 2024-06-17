import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { DrawerState } from './models/drawer-state';

@Injectable()
export class GtformDrawerService {
  public leftDrawerCloseState: DrawerState = 'none';
  public rightDrawerCloseState: DrawerState = 'none';
  private leftDrawerState = new BehaviorSubject<DrawerState>('none');
  public leftDrawerState$ = this.leftDrawerState.asObservable();
  private rightDrawerState = new BehaviorSubject<DrawerState>('none');
  public rightDrawerState$ = this.rightDrawerState.asObservable();

  public get isLeftDrawerOpen(): DrawerState {
    return this.leftDrawerState.value;
  }

  public get isRightDrawerOpen(): DrawerState {
    return this.rightDrawerState.value;
  }

  public closeAllDrawers(): void {
    this.leftDrawerState.next(this.leftDrawerCloseState);
    this.rightDrawerState.next(this.rightDrawerCloseState);
  }

  public setLeftDrawerState(state: DrawerState): void {
    this.leftDrawerState.next(state);
  }

  public setRightDrawerState(state: DrawerState): void {
    this.rightDrawerState.next(state);
  }

  public toggleLeftDrawer(): void {
    const currentState = this.leftDrawerState.value;
    if (currentState === 'none' || currentState === 'collapsed') {
      this.leftDrawerState.next('expanded');
    } else {
      this.leftDrawerState.next(this.leftDrawerCloseState);
    }
  }

  public toggleRightDrawer(): void {
    const currentState = this.rightDrawerState.value;
    if (currentState === 'none' || currentState === 'collapsed') {
      this.rightDrawerState.next('expanded');
    } else {
      this.rightDrawerState.next(this.rightDrawerCloseState);
    }
  }
}
