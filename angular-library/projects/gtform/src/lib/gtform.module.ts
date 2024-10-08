import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { GtformAccordionModule } from './components/gtform-accordion';
import { GtformAutocompleteModule } from './components/gtform-autocomplete';
import { GtformBookmarkModule } from './components/gtform-bookmark';
import { GtformButtonModule } from './components/gtform-button';
import { GtformButtonIconModule } from './components/gtform-button-icon';
import { GtformInputCheckboxModule } from './components/gtform-checkbox';
import { GtformChipsModule } from './components/gtform-chips';
import { GtformDynamicModalModule } from './components/gtform-dynamic-modal';
import { GtformFileFolderTreeModule } from './components/gtform-file-folder-tree';
import { GtformFileUploaderModule } from './components/gtform-file-uploader';
import { GtformGridModule } from './components/gtform-grid';
import { GtformIconModule } from './components/gtform-icon';
import { GtformInputDateModule } from './components/gtform-input-date/index';
import { GtformInputTextModule } from './components/gtform-input-text';
import { GtformProgressStepperModule } from './components/gtform-progress-stepper';
import { GtformSelectModule } from './components/gtform-select';
import { GtformSpinnerModule } from './components/gtform-spinner';
import { GtformSwitchModule } from './components/gtform-switch/index';
import { GtformTabsModule } from './components/gtform-tabs';
import { GtformToastModule } from './components/gtform-toast';
import { GtformDragControlPanelModule } from './directives/drag-control-panel/index';
import { GtformOverlayPanelModule } from './directives/overlay-panel';
import { GtformTooltipModule } from './directives/tooltip';
import { GtformFormBuilderModule } from './form-builder/index';
import { GtformCoreModule } from './gtform-core.module';
import { GtformConfig } from './models';
import { PipesModule } from './pipes';
import { GtformDrawerModule } from './templates/gtform-drawer';
import { GtformHbfTemplateModule } from './templates/gtform-hbf-template';
import { GtformSideDrawerModule } from './templates/gtform-side-drawer/index';

export const ComponentsModules = [
  GtformAccordionModule,
  GtformAutocompleteModule,
  GtformBookmarkModule,
  GtformButtonModule,
  GtformButtonIconModule,
  GtformInputCheckboxModule,
  GtformChipsModule,
  GtformDynamicModalModule,
  GtformFileFolderTreeModule,
  GtformFileUploaderModule,
  GtformGridModule,
  GtformIconModule,
  GtformInputTextModule,
  GtformInputDateModule,
  GtformProgressStepperModule,
  GtformSelectModule,
  GtformSpinnerModule,
  GtformSwitchModule,
  GtformTabsModule,
  GtformToastModule
];

export const DirectivesModules = [
  GtformOverlayPanelModule,
  GtformTooltipModule,
  GtformDragControlPanelModule
];

export const PipesModules = [
  PipesModule
];

export const TemplatesModules = [
  GtformDrawerModule,
  GtformHbfTemplateModule,
  GtformSideDrawerModule
];

export const FormBuilderModules = [
  GtformFormBuilderModule
];

@NgModule({
  imports: [
    CommonModule,
    GtformCoreModule,
    ...ComponentsModules,
    ...DirectivesModules,
    ...PipesModules,
    ...TemplatesModules,
    ...FormBuilderModules

  ],
  exports: [
    GtformCoreModule,
    ...ComponentsModules,
    ...DirectivesModules,
    ...PipesModules,
    ...TemplatesModules,
    ...FormBuilderModules
  ]
})
export class GtformModule {
  public static forRoot(config: GtformConfig): ModuleWithProviders<GtformModule> {
    return {
      ngModule: GtformModule,
      providers: [
        ...GtformCoreModule.forRoot(config).providers!
      ]
    };
  }
}
