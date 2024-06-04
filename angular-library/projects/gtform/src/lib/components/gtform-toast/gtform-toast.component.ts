import { Component, OnInit } from '@angular/core';

import { GtformToast } from '../../models/index';
import { GtformToastService } from '../../services/index';

@Component({
  selector: 'gtform-toast',
  templateUrl: './gtform-toast.component.html',
  styleUrl: './gtform-toast.component.scss'
})
export class GtformToastComponent  implements OnInit {
  public toasts: GtformToast[] = [];
  public position: string = 'top-right';

  public constructor(private toastService: GtformToastService) { }

  public ngOnInit(): void {
    this.toastService.toast$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  public setPosition(position: string) : void {
    this.position = position;
  }
}
