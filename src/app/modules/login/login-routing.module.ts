import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { RecoverySuccessComponent } from './components/recovery-success/recovery-success.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  // cambiar componente
  { path: 'recovery', component: RecoveryComponent},
  { path: 'recovery/success', component: RecoverySuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
