import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import {

} from '../public-api';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): GtformTranslateLoader {
  return new GtformTranslateLoader(http, 'assets/gtform/i18n/', '.json');
}

@NgModule({
  imports: [
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

})
export class GtformModule {
  public constructor(
    @Optional() @SkipSelf() parentModule: GtformModule,
    @Inject('gtformConfig') private config: GtformConfig,
    // private translateService: TranslateService,
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
