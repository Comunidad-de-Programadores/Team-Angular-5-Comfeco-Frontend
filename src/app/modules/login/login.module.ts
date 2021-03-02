import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { AuthModule } from '../auth/auth.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { SharedModule } from '../shared/shared.module';
import { RecoverySuccessComponent } from './components/recovery-success/recovery-success.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoveryComponent, RecoverySuccessComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule
  ]
})
export class LoginModule { }
