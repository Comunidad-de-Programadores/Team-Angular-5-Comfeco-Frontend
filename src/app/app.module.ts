import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { UiModule } from './modules/ui/ui.module';
import { LoginModule } from './modules/login/login.module';
import { RouterModule } from '@angular/router';
import { PoliticsComponent } from './modules/login/politics/components/politics/politics.component';
import { TermsServiceComponent } from './modules/login/politics/components/terms-service/terms-service.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PoliticsComponent, 
    TermsServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    LoginModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
