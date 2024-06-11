import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformIconModule } from '../gtform-icon';

import { GtformButtonIconComponent } from './gtform-button-icon.component';

@NgModule(
  {
    imports: [CommonModule, GtformIconModule],
    declarations: [GtformButtonIconComponent],
    exports: [GtformButtonIconComponent]
  })
export class GtformButtonIconModule {

}
