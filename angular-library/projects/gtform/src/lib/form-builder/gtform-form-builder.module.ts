import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformDynamicFieldDirective } from './directives/gtform-dynamic-field.directive';
import { GtformDynamicFieldComponent } from './gtform-dynamic-field/gtform-dynamic-field.component';
import { GtformDynamicFieldService } from './services/gtform-dynamic-field.service';

@NgModule({
  declarations: [
    GtformDynamicFieldComponent,
    GtformDynamicFieldDirective
  ],
  exports: [
    GtformDynamicFieldComponent,
    GtformDynamicFieldDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [GtformDynamicFieldService]
})
export class GtformFormBuilderModule {
}
