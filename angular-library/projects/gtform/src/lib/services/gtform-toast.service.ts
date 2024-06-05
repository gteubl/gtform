import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { GtformToast } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class GtformToastService {
  private toasts: { [key: string]: GtformToast[] } = {};
  private toastSubjects: { [key: string]: BehaviorSubject<GtformToast[]> } = {};

  private limit = 3;
  private defaultDuration = 3000; // 3 seconds

  public constructor() {
    this.initializePositions();
  }

  public getAllToastStreams(): { [key: string]: BehaviorSubject<GtformToast[]> } {
    return this.toastSubjects;
  }

  public getToastStream(position: string): Observable<GtformToast[]> {
    return this.getToastSubject(position).asObservable();
  }

  public removeToast(toast: GtformToast, position: string): void {
    const toasts = this.getToasts(position);
    const toastSubject = this.getToastSubject(position);

    this.toasts[position] = toasts.filter(t => t !== toast);
    toastSubject.next([...this.toasts[position]]);
  }

  public setDefaultDuration(duration: number): void {
    this.defaultDuration = duration;
  }

  public setLimit(limit: number): void {
    this.limit = limit;
  }

  public showToast(
    type: 'info' | 'success' | 'error' | 'warning',
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'banner-top' | 'banner-bottom',
    title: string,
    message: string,
    duration?: number
  ): void {
    const toast: GtformToast = {
      type,
      position,
      title,
      message,
      duration: duration || this.defaultDuration
    };

    const toasts = this.getToasts(position);
    const toastSubject = this.getToastSubject(position);

    if (toasts.length >= this.limit) {
      toasts.shift();
    }

    toasts.push(toast);
    toastSubject.next([...toasts]);

    setTimeout(() => {
      this.removeToast(toast, position);
    }, toast.duration);
  }

  private getToastSubject(position: string): BehaviorSubject<GtformToast[]> {
    return this.toastSubjects[position];
  }

  private getToasts(position: string): GtformToast[] {
    return this.toasts[position];
  }

  private initializePositions(): void {
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'banner-top', 'banner-bottom'];
    positions.forEach(position => {
      this.toasts[position] = [];
      this.toastSubjects[position] = new BehaviorSubject<GtformToast[]>([]);
    });
  }
}
