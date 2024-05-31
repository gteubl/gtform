import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GtformModule } from 'gtform';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { DemoTableComponent } from './components/demo-table/demo-table.component';
import { DemoLoremIpsumComponent } from './components/demo-lorem-ipsum/demo-lorem-ipsum.component';
import { DemoFullFormsComponent } from './components/demo-full-forms/demo-full-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoTableComponent,
    DemoLoremIpsumComponent,
    DemoFullFormsComponent

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
