import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformSpinnerComponent } from './gtform-spinner.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformSpinnerComponent],
    exports: [GtformSpinnerComponent],
  }
)
export class GtformSpinnerModule {
}
