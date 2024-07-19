import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GtformDrawerComponent } from './gtform-drawer.component';

@NgModule(
  {
    imports: [
      BrowserModule,
      CommonModule
    ],
    declarations: [GtformDrawerComponent],
    exports: [GtformDrawerComponent]
  })
export class GtformDrawerModule {
}
