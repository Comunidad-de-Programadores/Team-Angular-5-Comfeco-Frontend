import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { SideCommunitiesComponent } from './communities/side-communities/side-communities.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MostrarErroresComponent, SideCommunitiesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports:[
    MostrarErroresComponent,
    SideCommunitiesComponent,
  ],
})
export class SharedModule { }
