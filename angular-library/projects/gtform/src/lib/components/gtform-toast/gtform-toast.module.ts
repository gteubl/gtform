import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformToastComponent } from './gtform-toast.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformToastComponent],
    exports: [GtformToastComponent]
  }
)
export class GtformToastModule {}
