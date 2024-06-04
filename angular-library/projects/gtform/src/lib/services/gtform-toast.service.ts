import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { GtformToast } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class GtformToastService {
  private toasts: GtformToast[] = [];
  private toastSubject = new BehaviorSubject<GtformToast[]>([]);
  public toast$ = this.toastSubject.asObservable();

  private limit = 3;
  private defaultDuration = 3000; // 3 seconds

  public constructor() { }

  public showToast(type: 'info' | 'success' | 'error' | 'warning', position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'banner-top' | 'banner-bottom', title: string, message: string, duration?: number): void {
    const toast: GtformToast = {
      type,
      position,
      title,
      message,
      duration: duration || this.defaultDuration
    };

    if (this.toasts.length >= this.limit) {
      this.toasts.shift();
    }

    this.toasts.push(toast);
    this.toastSubject.next(this.toasts);

    setTimeout(() => {
      this.removeToast(toast);
    }, toast.duration);
  }

  public removeToast(toast: GtformToast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastSubject.next(this.toasts);
  }

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public setDefaultDuration(duration: number): void {
    this.defaultDuration = duration;
  }
}
