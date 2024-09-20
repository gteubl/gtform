import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformAccordionComponent } from './gtform-accordion.component';

@NgModule(
  {
    declarations: [GtformAccordionComponent],
    imports: [CommonModule
    ],
    exports: [GtformAccordionComponent]
  })
export class GtformAccordionModule {

}
