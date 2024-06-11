import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { generateRandomID } from '../../../utils';
import { GtformToast } from '../models/gtform-toast';

@Injectable({
  providedIn: 'root'
})
export class GtformToastService {
  private toasts: { [key: string]: GtformToast[] } = {};
  private toastSubjects: { [key: string]: BehaviorSubject<GtformToast[]> } = {};

  private limit = 3;
  private defaultDuration = 3000;
  private positionKeys: string[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'banner-top', 'banner-bottom'];

  public constructor() {
    this.initializePositions();
  }

  public getPositionKeys(): string[] {
    return this.positionKeys;
  }

  public getToastStream(position: string): Observable<GtformToast[]> {
    return this.getToastSubject(position).asObservable();
  }

  public removeToast(toast: GtformToast): void {
    const toasts = this.getToasts(toast.position);
    const toastSubject = this.getToastSubject(toast.position);

    this.toasts[toast.position] = toasts.filter(t => t.id !== toast.id);
    toastSubject.next([...this.toasts[toast.position]]);
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
      id: generateRandomID(),
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
      this.removeToast(toast);
    }, toast.duration ?? this.defaultDuration); // Start fade-out before actual removal
  }

  private getToastSubject(position: string): BehaviorSubject<GtformToast[]> {
    return this.toastSubjects[position];
  }

  private getToasts(position: string): GtformToast[] {
    return this.toasts[position];
  }

  private initializePositions(): void {
    this.positionKeys.forEach(position => {
      this.toasts[position] = [];
      this.toastSubjects[position] = new BehaviorSubject<GtformToast[]>([]);
    });
  }

}
