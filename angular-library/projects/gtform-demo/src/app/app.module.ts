import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GtformModule } from 'gtform';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { DemoFullFormTab1Component } from './components/demo-full-forms/demo-full-form-tab1/demo-full-form-tab1.component';
import { DemoFullFormTab2Component } from './components/demo-full-forms/demo-full-form-tab2/demo-full-form-tab2.component';
import { DemoFullFormTab3Component } from './components/demo-full-forms/demo-full-form-tab3/demo-full-form-tab3.component';
import { DemoFullFormTab4Component } from './components/demo-full-forms/demo-full-form-tab4/demo-full-form-tab4.component';
import { DemoFullFormsComponent } from './components/demo-full-forms/demo-full-forms.component';
import { DemoLoremIpsumComponent } from './components/demo-lorem-ipsum/demo-lorem-ipsum.component';
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
    DemoFullFormTab4Component

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GtformModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
