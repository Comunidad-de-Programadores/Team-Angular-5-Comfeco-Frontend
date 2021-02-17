import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './modules/seguridad/auth.guard';

// const routes: Routes = [];

const aplicationRoutes: Routes =[
  {path:'', component: HomeComponent, },

];

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch:'full'},
  { path: 'app', children: aplicationRoutes,
    // canActivate: [AuthGuard]
   // TODO implementar seguridad
  },
  {path:'account', loadChildren: ()=> import('./modules/login/login.module').then(m=> m.LoginModule)},
  { path: '**', redirectTo: 'app' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
