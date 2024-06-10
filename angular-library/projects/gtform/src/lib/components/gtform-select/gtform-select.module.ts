import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformSelectComponent } from './gtform-select.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformSelectComponent],
    exports: [GtformSelectComponent]
  }
)
export class GtformSelectModule {
}
