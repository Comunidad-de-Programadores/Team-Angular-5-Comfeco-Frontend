import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { PoliticsComponent } from './modules/login/politics/components/politics/politics.component';
import { TermsServiceComponent } from './modules/login/politics/components/terms-service/terms-service.component';
import { AuthGuard } from './modules/seguridad/auth.guard';

// const routes: Routes = [];

const aplicationRoutes: Routes =[
  {path:'', component: HomeComponent, },
  {path: 'terminos-condiciones', component: TermsServiceComponent},
  {path: 'politicas-privacidad', component: PoliticsComponent}
];

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch:'full'},
  { path: 'app', children: aplicationRoutes,
    // canActivate: [AuthGuard]
   // TODO implementar seguridad
  },
  {path: 'test', component: TestComponent},
  {path:'account', loadChildren: ()=> import('./modules/login/login.module').then(m=> m.LoginModule)},

  { path: '**', redirectTo: 'app' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
