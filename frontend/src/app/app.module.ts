// src/app/app.module.ts
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,  // para HttpClient
    AppRoutingModule,  // tu enrutador raíz
    AppComponent       // standalone component
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}
