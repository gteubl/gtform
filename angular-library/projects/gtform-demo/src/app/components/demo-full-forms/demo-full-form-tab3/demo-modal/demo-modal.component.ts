import { Component, OnInit } from '@angular/core';

import { GtformDynamicModalService } from 'gtform';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrl: './demo-modal.component.scss'
})
export class DemoModalComponent implements OnInit {

  public data: { message: string } | undefined;

  public constructor(private modalService: GtformDynamicModalService) {
  }

  public ngOnInit(): void {
    this.data = this.modalService.config.data;
  }

  public close(): void {
    this.modalService.close(this, { message: 'Hello from child' });
  }

}
