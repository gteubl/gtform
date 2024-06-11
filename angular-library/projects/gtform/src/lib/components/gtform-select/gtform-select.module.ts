import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformInputTextModule } from '../gtform-input-text';

import { GtformSelectComponent } from './gtform-select.component';

@NgModule(
  {
    imports: [CommonModule, GtformInputTextModule],
    declarations: [GtformSelectComponent],
    exports: [GtformSelectComponent]
  }
)
export class GtformSelectModule {
}
