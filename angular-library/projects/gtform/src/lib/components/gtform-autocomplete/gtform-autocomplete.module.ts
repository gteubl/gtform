import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformAutocompleteModalComponent } from './gtform-autocomplete-modal/gtform-autocomplete-modal.component';
import { GtformAutocompleteComponent } from './gtform-autocomplete.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GtformAutocompleteModalComponent, GtformAutocompleteComponent],
  exports: [GtformAutocompleteModalComponent, GtformAutocompleteComponent]
})
export class GtformAutocompleteModule {
}
