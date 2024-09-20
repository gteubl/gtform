import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { GtformToast } from './models/gtform-toast';
import { GtformToastService } from './services/gtform-toast.service';

@Component({
  selector: 'gtform-toast',
  templateUrl: './gtform-toast.component.html',
  styleUrls: ['./gtform-toast.component.scss'],
  host: { 'hostID': crypto.randomUUID().toString() }
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
