import { Component } from '@angular/core';

import { GtformDynamicModalService, GtformToastService, ModalSizes } from 'gtform';

import { ChoiceOption } from '../../../../../../gtform/src/lib/models/index';

import { DemoModalComponent } from './demo-modal/demo-modal.component';

@Component({
  selector: 'app-demo-full-form-tab3',
  templateUrl: './demo-full-form-tab3.component.html',
  styleUrl: './demo-full-form-tab3.component.scss'
})
export class DemoFullFormTab3Component {
  protected readonly ModalSizes = ModalSizes;

  public constructor(private messageService: GtformToastService, private modalService: GtformDynamicModalService) {
  }

  public get autoCompleteDemoOptions(): ChoiceOption[] {
    const qtdOfOptions = 100;

    return Array.from({ length: qtdOfOptions }, (_, i) => ({
      value: (i + 1).toString(),
      description: `Option ${i + 1}`
    }));
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

  // eslint-disable-next-line
  public showModal(size: any): void {
    const ref = this.modalService.open(DemoModalComponent, {
      title: 'Dynamic Modal',
      style: { ...size },
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
