import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { GtformAccordionModule } from './components/gtform-accordion/index';
import { GtformAutocompleteModule } from './components/gtform-autocomplete/index';
import { GtformBookmarkModule } from './components/gtform-bookmark/index';
import { GtformButtonModule } from './components/gtform-button/index';
import { GtformButtonIconModule } from './components/gtform-button-icon/index';
import { GtformInputCheckboxModule } from './components/gtform-checkbox/index';
import { GtformChipsModule } from './components/gtform-chips/index';
import { GtformDynamicModalModule } from './components/gtform-dynamic-modal/index';
import { GtformFileUploaderModule } from './components/gtform-file-uploader/index';
import { GtformGridModule } from './components/gtform-grid/index';
import { GtformIconModule } from './components/gtform-icon/index';
import { GtformInputTextModule } from './components/gtform-input-text/index';
import { GtformProgressStepperModule } from './components/gtform-progress-stepper/index';
import { GtformSelectModule } from './components/gtform-select/index';
import { GtformSpinnerModule } from './components/gtform-spinner/index';
import { GtformTabsModule } from './components/gtform-tabs/index';
import { GtformToastModule } from './components/gtform-toast/index';
import { GtformOverlayPanelModule } from './directives/overlay-panel/index';
import { GtformTooltipModule } from './directives/tooltip/index';
import { GtformCoreModule } from './gtform-core.module';
import { GtformConfig } from './models/index';
import { PipesModule } from './pipes/index';
import { GtformDrawerModule } from './templates/gtform-drawer/index';
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
