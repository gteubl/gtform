import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { GtformTranslateLoader } from './locale/index';
import { GtformConfig } from './models/index';
import { GtformThemeService } from './services/index';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): GtformTranslateLoader {
  return new GtformTranslateLoader(http, 'assets/gtform/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [],
  exports: []
})
export class GtformCoreModule {
  public constructor(
    @Optional() @SkipSelf() parentModule: GtformCoreModule,
    @Inject('gtformConfig') private config: GtformConfig,
    private translateService: TranslateService,
    private themeService: GtformThemeService
  ) {
    if (parentModule) {
      throw new Error('GtformCoreModule is already loaded. Import it in the AppModule only');
    }
    this.initialize(config);
  }

  public static forRoot(config: GtformConfig): ModuleWithProviders<GtformCoreModule> {
    return {
      ngModule: GtformCoreModule,
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
