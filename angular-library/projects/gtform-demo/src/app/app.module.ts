import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { GtformModule } from 'gtform';

import { gtformTranslateLoader } from '../../../gtform/src/lib/gtform-core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { DemoFullFormTab1Component } from './components/demo-full-forms/demo-full-form-tab1/demo-full-form-tab1.component';
import { DemoFullFormTab2Component } from './components/demo-full-forms/demo-full-form-tab2/demo-full-form-tab2.component';
import { DemoFullFormTab3Component } from './components/demo-full-forms/demo-full-form-tab3/demo-full-form-tab3.component';
import { DemoModalComponent } from './components/demo-full-forms/demo-full-form-tab3/demo-modal/demo-modal.component';
import { DemoFullFormTab4Component } from './components/demo-full-forms/demo-full-form-tab4/demo-full-form-tab4.component';
import { DemoFullFormsComponent } from './components/demo-full-forms/demo-full-forms.component';
import { DemoLoremIpsumComponent } from './components/demo-lorem-ipsum/demo-lorem-ipsum.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DemoTableCompleteComponent } from './components/sample-tables/demo-table-complete/demo-table-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoTableCompleteComponent,
    DemoLoremIpsumComponent,
    DemoFullFormsComponent,
    DemoFullFormTab1Component,
    DemoFullFormTab2Component,
    DemoFullFormTab3Component,
    DemoFullFormTab4Component,
    NavbarComponent,
    DemoModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (gtformTranslateLoader),
          deps: [HttpClient]
        }
      }
    ),
    GtformModule.forRoot({
      defaultLang: 'en',
      defaultTheme: 'light'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
