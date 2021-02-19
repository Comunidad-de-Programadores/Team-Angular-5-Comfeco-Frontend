import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SeguridadModule } from '../seguridad/seguridad.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoveryComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SeguridadModule,

  ]
})
export class LoginModule { }
