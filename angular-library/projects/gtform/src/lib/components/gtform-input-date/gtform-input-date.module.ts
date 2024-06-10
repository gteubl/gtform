import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformInputTextModule } from '../gtform-input-text/index';

import { GtformInputDateComponent } from './gtform-input-date.component';

@NgModule(
  {
    imports: [CommonModule, GtformInputTextModule],
    declarations: [GtformInputDateComponent],
    exports: [GtformInputDateComponent]
  }
)
export class GtformInputDateModule {
}
