import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { GtformToast } from '../../models/index';
import { GtformToastService } from '../../services/index';

@Component({
  selector: 'gtform-toast',
  templateUrl: './gtform-toast.component.html',
  styleUrl: './gtform-toast.component.scss'
})
export class GtformToastComponent  implements OnInit {
  public positions: { [key: string]: Observable<GtformToast[]> } = {};
  public positionKeys = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'banner-top', 'banner-bottom'];



  public constructor(private toastService: GtformToastService) { }

  public ngOnInit(): void {
    const toastStreams = this.toastService.getAllToastStreams();
    this.positionKeys.forEach(position => {
      this.positions[position] = toastStreams[position].asObservable();
    });
  }
}
