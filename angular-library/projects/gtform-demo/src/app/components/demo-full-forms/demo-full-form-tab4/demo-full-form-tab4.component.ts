import { Component } from '@angular/core';

import { GtformDynamicModalService, ModalSizes } from 'gtform';

import { DemoModalComponent } from './demo-modal/demo-modal.component';

@Component({
  selector: 'app-demo-full-form-tab4',
  templateUrl: './demo-full-form-tab4.component.html',
  styleUrl: './demo-full-form-tab4.component.scss'
})
export class DemoFullFormTab4Component {
  public constructor(private modalService: GtformDynamicModalService) {
  }

  public showModal(): void {
    const ref = this.modalService.open(DemoModalComponent, {
      title: 'Dynamic Modal',
      style: { ...ModalSizes.large },
      data: { message: 'Hello from parent' }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref.closed.subscribe((result: any) => {
      console.log('Modal closed with result:', result);
    });
  }
}
