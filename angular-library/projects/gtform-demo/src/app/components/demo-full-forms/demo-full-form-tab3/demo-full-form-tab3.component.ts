import { Component } from '@angular/core';

import { GtformDynamicModalService, GtformToastService, ModalSizes } from 'gtform';

import { DemoModalComponent } from './demo-modal/demo-modal.component';

@Component({
  selector: 'app-demo-full-form-tab3',
  templateUrl: './demo-full-form-tab3.component.html',
  styleUrl: './demo-full-form-tab3.component.scss'
})
export class DemoFullFormTab3Component {
  public constructor(private messageService: GtformToastService, private modalService: GtformDynamicModalService) {
  }

  public showBannerBottomSuccessMessage(): void {
    this.messageService.showToast('success', 'banner-bottom', 'Success message', 'This is a success message');
  }

  public showBannerTopInfoMessage(): void {
    this.messageService.showToast('info', 'banner-top', 'Info message', 'This is an info message');
  }

  public showBottomLeftErrorMessage(): void {
    this.messageService.showToast('error', 'bottom-left', 'Error message', 'This is an error message');
  }

  public showBottomRightWarningMessage(): void {
    this.messageService.showToast('warning', 'bottom-right', 'Warning message', 'This is a warning message');
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

  public showTopLeftInfoMessage(): void {
    this.messageService.showToast('info', 'top-left', 'Info message', 'This is an info message');
  }

  public showTopRightSuccessMessage(): void {
    this.messageService.showToast('success', 'top-right', 'Success message', 'This is a success message');
  }
}
