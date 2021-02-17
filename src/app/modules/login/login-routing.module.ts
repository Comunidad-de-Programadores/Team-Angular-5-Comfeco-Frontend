import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliticsComponent } from './politics/components/politics/politics.component';
import { TermsServiceComponent } from './politics/components/terms-service/terms-service.component';

const routes: Routes = [
  {path: 'terminos-condiciones', component: TermsServiceComponent},
  {path: 'politicas-privacidad', component: PoliticsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
