import { Component } from '@angular/core';

import { GtformDynamicModalService } from 'gtform';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrl: './demo-modal.component.scss'
})
export class DemoModalComponent {

  public constructor(private modalService: GtformDynamicModalService) {
  }

  public close(): void {
    this.modalService.close(this, { message: 'Hello from child' });
  }

  public okResult(): void {

  }
}
