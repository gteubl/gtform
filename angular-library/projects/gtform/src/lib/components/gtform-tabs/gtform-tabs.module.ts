import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformTabsComponent } from './gtform-tabs.component';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformTabsComponent],
    exports: [GtformTabsComponent]
  }
)
export class GtformTabsModule {
}
