import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { GtformAccordionComponent } from './components/gtform-accordion/index';
import { GtformAutocompleteComponent, GtformAutocompleteModalComponent } from './components/gtform-autocomplete/index';
import { GtformBookmarkComponent } from './components/gtform-bookmark/index';
import { GtformButtonIconComponent } from './components/gtform-button-icon/index';
import { GtformButtonComponent } from './components/gtform-button/index';
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
import { GtformToastComponent } from './components/gtform-toast/index';
import { GtformResizeTableColumnDirective, GtformTooltipDirective, OverlayPanelDirective } from './directives/index';
import { GtformTranslateLoader } from './locale/gtform-translate-loader';
import { GtformConfig } from './models/index';
import { CastDataPipe, FileSizePipe, FormatChoiceOptionPipe, FormatCpfCnpjPipe } from './pipes/index';
import { GtformThemeService } from './services/index';
import { GtformDrawerComponent } from './templates/gtform-drawer/index';
import { GtformHbfTemplateComponent } from './templates/gtform-hbf-template/index';
import { GtformDynamicModalComponent } from './components/gtform-dynamic-modal/gtform-dynamic-modal.component';
import { GtformDynamicModalContainerComponent } from './components/gtform-dynamic-modal-container/gtform-dynamic-modal-container.component';

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
  GtformDrawerComponent,
  GtformToastComponent
];

const directives = [
  GtformResizeTableColumnDirective,
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

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): GtformTranslateLoader {
  return new GtformTranslateLoader(http, 'assets/gtform/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    HttpClientModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new GtformTranslateLoader(http, 'assets/gtform/i18n/', '.json'),
          deps: [HttpClient]
        }
      }
    )
  ],
  declarations: [
    ...components,
    ...directives,
    ...pipes,
    ...templates,
    GtformDynamicModalComponent,
    GtformDynamicModalContainerComponent

  ],
  exports: [
    ...components,
    ...directives,
    ...pipes,
    ...templates
  ]
})
export class GtformModule {
  public constructor(
    @Optional() @SkipSelf() parentModule: GtformModule,
    @Inject('gtformConfig') private config: GtformConfig,
    private translateService: TranslateService,
    private themeService: GtformThemeService
  ) {
    if (parentModule) {
      throw new Error('GtformModule is already loaded. Import it in the AppModule only');
    }
    this.initialize(config);
  }

  public static forRoot(config: GtformConfig): ModuleWithProviders<GtformModule> {
    return {
      ngModule: GtformModule,
      providers: [
        { provide: 'gtformConfig', useValue: config }
      ]
    };
  }

  private initialize(config: GtformConfig): void {
    this.translateService.setDefaultLang(config.defaultLang);
    this.translateService.use(config.defaultLang);

    this.themeService.setTheme(config.defaultTheme);
  }
}
