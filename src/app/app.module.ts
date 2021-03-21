import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

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
import { PoliticsComponent } from './components/politics/politics.component';
import { TermsServiceComponent } from './components/terms-service/terms-service.component';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { TestComponent } from './components/test/test.component';
import { ApplicationState } from './core/store/application/application.state';
import { UserProfileModule } from './modules/user-profile/user-profile.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PoliticsComponent,
    TermsServiceComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    RouterModule,
    SharedModule,
    AuthModule,
    NgxsModule.forRoot([ApplicationState],{developmentMode:true}), // !environment.production
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: false}), // environment.production
    NgxsLoggerPluginModule.forRoot({disabled: false}) //environment.production
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
