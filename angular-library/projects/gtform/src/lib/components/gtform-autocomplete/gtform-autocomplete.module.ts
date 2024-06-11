import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GtformHbfTemplateModule } from '../../templates/gtform-hbf-template';
import { GtformGridModule } from '../gtform-grid';
import { GtformIconModule } from '../gtform-icon';
import { GtformInputTextModule } from '../gtform-input-text';

import { GtformAutocompleteModalComponent } from './gtform-autocomplete-modal/gtform-autocomplete-modal.component';
import { GtformAutocompleteComponent } from './gtform-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    GtformHbfTemplateModule,
    GtformGridModule,
    GtformInputTextModule,
    FormsModule,
    GtformIconModule
  ],
  declarations: [GtformAutocompleteModalComponent, GtformAutocompleteComponent],
  exports: [GtformAutocompleteModalComponent, GtformAutocompleteComponent]
})
export class GtformAutocompleteModule {
}
