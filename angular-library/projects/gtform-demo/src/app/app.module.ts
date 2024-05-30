import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GtformModule } from 'gtform';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent

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
