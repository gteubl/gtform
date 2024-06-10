import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformGridComponent } from './gtform-grid.component';
import { CastDataPipe } from './pipes/cast-data.pipe';
import { FormatChoiceOptionPipe } from './pipes/format-choice-option.pipe';

@NgModule(
  {
    imports: [CommonModule],
    declarations: [GtformGridComponent, CastDataPipe, FormatChoiceOptionPipe],

    exports: [GtformGridComponent, CastDataPipe, FormatChoiceOptionPipe]
  })
export class GtformGridModule {
}
