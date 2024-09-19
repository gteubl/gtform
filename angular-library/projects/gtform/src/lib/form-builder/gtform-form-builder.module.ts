import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GtformButtonModule } from '../components/gtform-button/index';
import { GtformChipsModule } from '../components/gtform-chips/index';
import { GtformIconModule } from '../components/gtform-icon/index';
import { GtformInputTextModule } from '../components/gtform-input-text/index';
import { GtformSelectModule } from '../components/gtform-select/index';
import { PipesModule } from '../pipes/index';
import { GtformHbfTemplateModule } from '../templates/gtform-hbf-template/index';

import { GtformDynamicFieldDirective } from './directives/gtform-dynamic-field.directive';
import { GtformDynamicAvailableFieldsComponent } from './gtform-dynamic-available-fields/gtform-dynamic-available-fields.component';
import { GtformDynamicFieldComponent } from './gtform-dynamic-field/gtform-dynamic-field.component';
import {
  GtformDynamicFieldConfigModalComponent
} from './modals/gtform-dynamic-field-config-modal/gtform-dynamic-field-config-modal.component';
import { GtformDynamicFieldService } from './services/gtform-dynamic-field.service';

@NgModule({
  declarations: [
    GtformDynamicFieldComponent,
    GtformDynamicFieldDirective,
    GtformDynamicAvailableFieldsComponent,
    GtformDynamicFieldConfigModalComponent

  ],
  exports: [
    GtformDynamicFieldComponent,
    GtformDynamicFieldDirective,
    GtformDynamicAvailableFieldsComponent,
    GtformDynamicFieldConfigModalComponent
  ],
  imports: [
    CommonModule,
    GtformInputTextModule,
    GtformIconModule,
    CdkDragPlaceholder,
    CdkDrag,
    FormsModule,
    GtformHbfTemplateModule,
    GtformButtonModule,
    GtformSelectModule,
    PipesModule,
    GtformChipsModule
  ],
  providers: [GtformDynamicFieldService]
})
export class GtformFormBuilderModule {
}
