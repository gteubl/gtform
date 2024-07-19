import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformSideDrawerComponent } from './gtform-side-drawer.component';

@NgModule({
  declarations: [
    GtformSideDrawerComponent
  ],
  exports: [
    GtformSideDrawerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GtformSideDrawerModule {
}
