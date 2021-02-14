import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

// const routes: Routes = [];

const aplicationRoutes: Routes =[
  {path:'', component: HomeComponent, },

];

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch:'full'},
  { path: 'app', children: aplicationRoutes,
   // TODO implementar seguridad
  },
  {path:'login', loadChildren: ()=> import('./modules/login/login.module').then(m=> m.LoginModule)},
  { path: '**', redirectTo: 'app' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
