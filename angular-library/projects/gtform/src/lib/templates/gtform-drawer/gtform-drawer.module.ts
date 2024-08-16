import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformDrawerComponent } from './gtform-drawer.component';

@NgModule(
  {
    imports: [
      CommonModule
    ],
    declarations: [GtformDrawerComponent],
    exports: [GtformDrawerComponent]
  })
export class GtformDrawerModule {
}
