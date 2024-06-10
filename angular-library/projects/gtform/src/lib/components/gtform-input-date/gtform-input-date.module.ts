import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformInputDateComponent } from './gtform-input-date.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformInputDateComponent],
    exports: [GtformInputDateComponent]
  }
)
export class GtformInputDateModule {
}
