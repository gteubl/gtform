import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import {
  CastDataPipe,
  FileSizePipe,
  FormatChoiceOptionPipe,
  FormatCpfCnpjPipe,
  GtformAccordionComponent,
  GtformAutocompleteComponent,
  GtformAutocompleteModalComponent,
  GtformBookmarkComponent,
  GtformButtonComponent,
  GtformButtonIconComponent,
  GtformChipsComponent,
  GtformChipsModalComponent,
  GtformConfig,
  GtformDrawerComponent,
  GtformDynamicModalComponent,
  GtformDynamicModalContainerComponent,
  GtformFileFolderTreeComponent,
  GtformFileFolderUploaderModalComponent,
  GtformFileUploaderComponent,
  GtformGridComponent,
  GtformHbfTemplateComponent,
  GtformIconComponent,
  GtformInputCheckboxComponent,
  GtformInputDateComponent,
  GtformInputTextComponent,
  GtformProgressStepperComponent,
  GtformResizeTableColumnDirective,
  GtformSelectComponent,
  GtformSpinnerComponent,
  GtformTabsComponent,
  GtformThemeService,
  GtformToastComponent,
  GtformTooltipDirective,
  GtformTranslateLoader,
  OverlayPanelDirective
} from '../public-api';

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
