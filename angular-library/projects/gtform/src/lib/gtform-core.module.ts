import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { GtformTranslateLoader } from './locale';
import { GtformConfig } from './models';
import { GtformThemeService } from './services/index';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): GtformTranslateLoader {
  return new GtformTranslateLoader(http, 'assets/gtform/i18n/', '.json');
}

export const LIB_CONFIG = new InjectionToken<GtformConfig>('LIB_CONFIG');

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
    @Inject(LIB_CONFIG) private config: GtformConfig,
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
        { provide: LIB_CONFIG, useValue: config }
      ]
    };
  }

  private initialize(config: GtformConfig): void {
    this.translateService.setDefaultLang(config.defaultLang);
    this.translateService.use(config.defaultLang);
    this.themeService.setTheme(config.defaultTheme);
  }
}
