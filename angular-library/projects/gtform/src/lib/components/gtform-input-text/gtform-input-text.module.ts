import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformInputTextComponent } from './gtform-input-text.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformInputTextComponent],
    exports: [GtformInputTextComponent]
  }
)
export class GtformInputTextModule {
}
