import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GtformAccordionComponent } from './components/gtform-accordion/index';
import { GtformAutocompleteComponent, GtformAutocompleteModalComponent } from './components/gtform-autocomplete/index';
import { GtformBookmarkComponent } from './components/gtform-bookmark/index';
import { GtformButtonComponent } from './components/gtform-button/index';
import { GtformButtonIconComponent } from './components/gtform-button-icon/index';
import { GtformInputCheckboxComponent } from './components/gtform-checkbox/index';
import { GtformChipsComponent, GtformChipsModalComponent } from './components/gtform-chips/index';
import { GtformFileFolderTreeComponent, GtformFileFolderUploaderModalComponent } from './components/gtform-file-folder-tree/index';
import { GtformFileUploaderComponent } from './components/gtform-file-uploader/index';
import { GtformGridComponent } from './components/gtform-grid/index';
import { GtformIconComponent } from './components/gtform-icon/index';
import { GtformInputDateComponent } from './components/gtform-input-date/index';
import { GtformInputTextComponent } from './components/gtform-input-text/index';
import { GtformProgressStepperComponent } from './components/gtform-progress-stepper/index';
import { GtformSelectComponent } from './components/gtform-select/index';
import { GtformSpinnerComponent } from './components/gtform-spinner/index';
import { GtformTabsComponent } from './components/gtform-tabs/index';
import {  OverlayPanelDirective } from './directives/index';
import { GtformTooltipDirective, GtResizableDirective } from './directives/index';
import { CastDataPipe, FileSizePipe, FormatChoiceOptionPipe, FormatCpfCnpjPipe } from './pipes/index';
import { GtformDrawerComponent } from './templates/gtform-drawer/index';
import { GtformHbfTemplateComponent } from './templates/gtform-hbf-template/index';

const components = [
  GtformAccordionComponent,
  GtformAutocompleteComponent,
  GtformAutocompleteModalComponent,
  GtformBookmarkComponent,
  GtformButtonComponent,
  GtformButtonIconComponent,
  GtformInputCheckboxComponent,
  GtformChipsModalComponent,
  GtformChipsComponent,
  //GtformEditorComponent
  GtformFileFolderUploaderModalComponent,
  GtformFileFolderTreeComponent,
  GtformFileUploaderComponent,
  GtformIconComponent,
  GtformInputDateComponent,
  GtformInputTextComponent,
  GtformProgressStepperComponent,
  GtformSelectComponent,
  GtformSpinnerComponent,
  GtformTabsComponent,
  GtformGridComponent,
  GtformDrawerComponent
];

const directives = [
  GtResizableDirective,
  GtformTooltipDirective,
  OverlayPanelDirective
];

const pipes = [
  FileSizePipe,
  FormatChoiceOptionPipe,
  FormatCpfCnpjPipe,
  CastDataPipe

];

const templates = [
  GtformHbfTemplateComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ...components,
    ...directives,
    ...pipes,
    ...templates,

  ],
  exports: [
    ...components,
    ...directives,
    ...pipes,
    ...templates
  ]
})
export class GtformModule {
}
