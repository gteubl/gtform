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
import { GtformInputTextModule } from './components/gtform-input-text';
import { GtformProgressStepperModule } from './components/gtform-progress-stepper';
import { GtformSelectModule } from './components/gtform-select';
import { GtformSpinnerModule } from './components/gtform-spinner';
import { GtformTabsModule } from './components/gtform-tabs';
import { GtformToastModule } from './components/gtform-toast';
import { GtformOverlayPanelModule } from './directives/overlay-panel';
import { GtformTooltipModule } from './directives/tooltip';
import { GtformCoreModule } from './gtform-core.module';
import { GtformConfig } from './models';
import { PipesModule } from './pipes';
import { GtformDrawerModule } from './templates/gtform-drawer';
import { GtformHbfTemplateModule } from './templates/gtform-hbf-template';

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
  GtformProgressStepperModule,
  GtformSelectModule,
  GtformSpinnerModule,
  GtformTabsModule,
  GtformToastModule
];

export const DirectivesModules = [
  GtformOverlayPanelModule,
  GtformTooltipModule
];

export const PipesModules = [
  PipesModule
];

export const TemplatesModules = [
  GtformDrawerModule,
  GtformHbfTemplateModule
];

@NgModule({
  imports: [
    CommonModule,
    GtformCoreModule,
    ...ComponentsModules,
    ...DirectivesModules,
    ...PipesModules,
    ...TemplatesModules

  ],
  exports: [
    GtformCoreModule,
    ...ComponentsModules,
    ...DirectivesModules,
    ...PipesModules,
    ...TemplatesModules
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
