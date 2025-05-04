import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import { importProvidersFrom }  from '@angular/core';
import { HttpClientModule }     from '@angular/common/http';

import { AppComponent }         from './app/app.component';
import { LoginComponent }       from './app/auth/login/login.component';

import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: '',       redirectTo: 'login', pathMatch: 'full' },
  { path: '**',     redirectTo: 'login', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
