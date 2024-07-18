import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformIconModule } from '../gtform-icon/index';

import { GtformTabsComponent } from './gtform-tabs.component';

@NgModule(
  {
    imports: [CommonModule, GtformIconModule],
    declarations: [GtformTabsComponent],
    exports: [GtformTabsComponent]
  }
)
export class GtformTabsModule {
}
