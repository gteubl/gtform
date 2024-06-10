import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformHbfTemplateModule } from '../../templates/gtform-hbf-template/gtform-hbf-template.module';
import { GtformGridModule } from '../gtform-grid/index';

import { GtformAutocompleteModalComponent } from './gtform-autocomplete-modal/gtform-autocomplete-modal.component';
import { GtformAutocompleteComponent } from './gtform-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    GtformHbfTemplateModule,
    GtformGridModule
  ],
  declarations: [GtformAutocompleteModalComponent, GtformAutocompleteComponent],
  exports: [GtformAutocompleteModalComponent, GtformAutocompleteComponent]
})
export class GtformAutocompleteModule {
}
