import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformProgressStepperComponent } from './gtform-progress-stepper.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformProgressStepperComponent],
    exports: [GtformProgressStepperComponent]
  }
)
export class GtformProgressStepperModule {
}
