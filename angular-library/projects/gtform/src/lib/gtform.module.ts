import { NgModule } from '@angular/core';
import { GtformAccordionComponent } from './components/gtform-accordion/index';
import { GtformAutocompleteComponent } from './components/gtform-autocomplete/index';
import { GtformBookmarkComponent } from './components/gtform-bookmark/index';
import { GtformButtonIconComponent } from './components/gtform-button-icon/index';
import { GtformButtonComponent } from './components/gtform-button/index';
import { GtformInputCheckboxComponent } from './components/gtform-checkbox/index';
import { GtformChipsComponent, GtformChipsModalComponent } from './components/gtform-chips/index';
import { GtformFileFolderTreeComponent, GtformFileFolderUploaderModalComponent } from './components/gtform-file-folder-tree/index';
import { GtformFileUploaderComponent } from './components/gtform-file-uploader/index';
import { GtformIconComponent } from './components/gtform-icon/index';
import { GtformInputDateComponent } from './components/gtform-input-date/index';
import { GtformInputTextComponent } from './components/gtform-input-text/index';
import { GtformProgressStepperComponent } from './components/gtform-progress-stepper/index';
import { GtformSelectComponent } from './components/gtform-select/index';
import { GtformSpinnerComponent } from './components/gtform-spinner/index';
import { GtformTabsComponent } from './components/gtform-tabs/index';
import { GtResizableDirective } from './directives/index';
import { FileSizePipe, FormatChoiceOptionPipe, FormatCpfCnpjPipe } from './pipes/index';
import { GtformHbfTemplateComponent } from './templates/gtform-hbf-template/index';

const components = [
  GtformAccordionComponent,
  GtformAutocompleteComponent,
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
  GtformTabsComponent
];

const directives = [
  GtResizableDirective
];

const pipes = [
  FileSizePipe,
  FormatChoiceOptionPipe,
  FormatCpfCnpjPipe

];

const templates = [
  GtformHbfTemplateComponent
  ];

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes,
    ...templates
  ],
  imports: [],
  exports: [
    ...components,
    ...directives,
    ...pipes,
    ...templates
  ]
})
export class GtformModule {
}
