import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GtformInputTextModule } from '../gtform-input-text';

import { GtformSelectComponent } from './gtform-select.component';

@NgModule(
  {
    imports: [CommonModule, GtformInputTextModule, FormsModule],
    declarations: [GtformSelectComponent],
    exports: [GtformSelectComponent]
  }
)
export class GtformSelectModule {
}
