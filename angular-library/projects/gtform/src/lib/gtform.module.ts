import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { GtformAccordionComponent } from './components/gtform-accordion';
import { GtformAutocompleteComponent, GtformAutocompleteModalComponent } from './components/gtform-autocomplete';
import { GtformBookmarkComponent } from './components/gtform-bookmark';
import { GtformButtonComponent } from './components/gtform-button';
import { GtformButtonIconComponent } from './components/gtform-button-icon';
import { GtformInputCheckboxComponent } from './components/gtform-checkbox';
import { GtformChipsComponent, GtformChipsModalComponent } from './components/gtform-chips';
import { GtformDynamicModalComponent } from './components/gtform-dynamic-modal';
import { GtformDynamicModalContainerComponent } from './components/gtform-dynamic-modal-container';
import { GtformFileFolderTreeComponent, GtformFileFolderUploaderModalComponent } from './components/gtform-file-folder-tree';
import { GtformFileUploaderComponent } from './components/gtform-file-uploader';
import { GtformGridComponent } from './components/gtform-grid';
import { GtformIconComponent } from './components/gtform-icon';
import { GtformInputDateComponent } from './components/gtform-input-date';
import { GtformInputTextComponent } from './components/gtform-input-text';
import { GtformProgressStepperComponent } from './components/gtform-progress-stepper';
import { GtformSelectComponent } from './components/gtform-select';
import { GtformSpinnerComponent } from './components/gtform-spinner';
import { GtformTabsComponent } from './components/gtform-tabs';
import { GtformToastComponent } from './components/gtform-toast';
import { GtformResizeTableColumnDirective, GtformTooltipDirective, OverlayPanelDirective } from './directives';
import { GtformTranslateLoader } from './locale/gtform-translate-loader';
import { GtformConfig } from './models';
import { CastDataPipe, FileSizePipe, FormatChoiceOptionPipe, FormatCpfCnpjPipe } from './pipes';
import { GtformThemeService } from './services';
import { GtformDrawerComponent } from './templates/gtform-drawer';
import { GtformHbfTemplateComponent } from './templates/gtform-hbf-template';

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
  GtformToastComponent,
  GtformDynamicModalComponent,
  GtformDynamicModalContainerComponent
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
    BrowserAnimationsModule,
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
    ...templates

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
