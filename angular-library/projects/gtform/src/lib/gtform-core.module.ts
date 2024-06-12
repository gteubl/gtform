import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { GtformDynamicModalService } from './components/gtform-dynamic-modal';
import { GtformToastService } from './components/gtform-toast/index';
import { GtformTranslateLoader } from './locale';
import { GtformConfig } from './models';
import { GtformThemeService } from './services';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): GtformTranslateLoader {
  return new GtformTranslateLoader(http, 'assets/gtform/i18n/', '.json');
}

export function initializeTranslateService(config: GtformConfig, translateService: TranslateService): () => void {
  return () => {
    console.log('initializeTranslateService');
    translateService.setDefaultLang(config.defaultLang);
    translateService.use(config.defaultLang);
  };
}

export function initializeThemeService(config: GtformConfig, themeService: GtformThemeService): () => void {
  return () => {
    console.log('initializeThemeService');
    themeService.setTheme(config.defaultTheme);
  };
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

  public static forRoot(config: GtformConfig): ModuleWithProviders<GtformCoreModule> {
    return {
      ngModule: GtformCoreModule,
      providers: [
        { provide: LIB_CONFIG, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeTranslateService,
          deps: [LIB_CONFIG, TranslateService],
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeThemeService,
          deps: [LIB_CONFIG, GtformThemeService],
          multi: true
        },
        GtformDynamicModalService,
        GtformToastService,
        GtformThemeService
      ]
    };
  }
}
