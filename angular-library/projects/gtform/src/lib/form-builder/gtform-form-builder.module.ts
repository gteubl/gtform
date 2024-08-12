import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GtformIconModule } from '../components/gtform-icon/index';
import { GtformInputTextModule } from '../components/gtform-input-text/index';

import { GtformDynamicFieldDirective } from './directives/gtform-dynamic-field.directive';
import { GtformDynamicAvailableFieldsComponent } from './gtform-dynamic-available-fields/gtform-dynamic-available-fields.component';
import { GtformDynamicFieldComponent } from './gtform-dynamic-field/gtform-dynamic-field.component';
import { GtformDynamicFieldService } from './services/gtform-dynamic-field.service';

@NgModule({
  declarations: [
    GtformDynamicFieldComponent,
    GtformDynamicFieldDirective,
    GtformDynamicAvailableFieldsComponent

  ],
  exports: [
    GtformDynamicFieldComponent,
    GtformDynamicFieldDirective,
    GtformDynamicAvailableFieldsComponent
  ],
  imports: [
    CommonModule,
    GtformInputTextModule,
    GtformIconModule,
    CdkDragPlaceholder,
    CdkDrag
  ],
  providers: [GtformDynamicFieldService]
})
export class GtformFormBuilderModule {
}
