import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';

const routes: Routes = [
  {path: '', component: ProfileDashboardComponent},
  {path: 'editar', component: ProfileDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
