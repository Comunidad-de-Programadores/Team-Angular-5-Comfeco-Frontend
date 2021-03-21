import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { PoliticsComponent } from './components/politics/politics.component';
import { TermsServiceComponent } from './components/terms-service/terms-service.component';
import { AuthGuard } from './modules/auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'terminos-condiciones', component: TermsServiceComponent},
  {path: 'politicas-privacidad', component: PoliticsComponent},
  {path: 'talleres', loadChildren: ()=> import('./modules/workshops/workshops.module').then(m=>m.WorkshopsModule)},
  {path: 'comunidades', loadChildren: ()=> import('./modules/communities/communities.module').then(m=> m.CommunitiesModule)},
  {path: 'miperfil', loadChildren:()=>import('./modules/user-profile/user-profile.module').then(m=>m.UserProfileModule), canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent},
  {path:'account', loadChildren: ()=> import('./modules/login/login.module').then(m=> m.LoginModule)},

  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
