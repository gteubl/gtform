import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformChipsModalComponent } from './gtform-chips-modal/gtform-chips-modal.component';
import { GtformChipsComponent } from './gtform-chips.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformChipsModalComponent, GtformChipsComponent],
    exports: [GtformChipsModalComponent, GtformChipsComponent]
  }
)
export class GtformChipsModule {
}
