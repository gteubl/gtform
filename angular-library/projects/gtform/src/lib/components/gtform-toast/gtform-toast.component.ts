import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { GtformToast } from '../../models';
import { GtformToastService } from '../../services';

@Component({
  selector: 'gtform-toast',
  templateUrl: './gtform-toast.component.html',
  styleUrls: ['./gtform-toast.component.scss']
})
export class GtformToastComponent implements OnInit {
  public positionKeys: string[] = this.toastService.getPositionKeys();
  public positions: { [key: string]: Observable<GtformToast[]> | undefined } = {};

  public constructor(private toastService: GtformToastService) {
  }

  public ngOnInit(): void {
    this.positionKeys.forEach(position => {
      this.positions[position] = this.toastService.getToastStream(position);
    });
  }
}
