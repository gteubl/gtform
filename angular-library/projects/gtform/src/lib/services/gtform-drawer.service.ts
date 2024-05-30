import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GtformDrawerService {
  private leftDrawerState = new BehaviorSubject<boolean>(false);
  private rightDrawerState = new BehaviorSubject<boolean>(false);

  public leftDrawerState$ = this.leftDrawerState.asObservable();
  public rightDrawerState$ = this.rightDrawerState.asObservable();

  public toggleLeftDrawer(): void {
    this.leftDrawerState.next(!this.leftDrawerState.value);
  }

  public toggleRightDrawer(): void {
    this.rightDrawerState.next(!this.rightDrawerState.value);
  }

  public closeAllDrawers(): void {
    this.leftDrawerState.next(false);
    this.rightDrawerState.next(false);
  }
}
