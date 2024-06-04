import { Component } from '@angular/core';

import { GtformToastService } from 'gtform';

@Component({
  selector: 'app-demo-full-form-tab3',
  templateUrl: './demo-full-form-tab3.component.html',
  styleUrl: './demo-full-form-tab3.component.scss'
})
export class DemoFullFormTab3Component {
  public constructor(private messageService: GtformToastService) {
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

  public showTopLeftInfoMessage(): void {
    this.messageService.showToast('info', 'top-left', 'Info message', 'This is an info message');
  }

  public showTopRightSuccessMessage(): void {
    this.messageService.showToast('success', 'top-right', 'Success message', 'This is a success message');
  }

}
