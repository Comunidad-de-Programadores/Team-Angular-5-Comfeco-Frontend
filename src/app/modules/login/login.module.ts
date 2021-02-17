import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PoliticsComponent } from './politics/components/politics/politics.component';
import { TermsServiceComponent } from './politics/components/terms-service/terms-service.component';


@NgModule({
  declarations: [PoliticsComponent, TermsServiceComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
