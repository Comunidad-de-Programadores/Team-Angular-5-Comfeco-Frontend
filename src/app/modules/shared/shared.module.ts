import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { SideCommunitiesComponent } from './communities/side-communities/side-communities.component';
import { RouterModule } from '@angular/router';
import { SideWorkshopComponent } from './components/workshops/side-workshop/side-workshop.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MostrarErroresComponent, SideCommunitiesComponent, SideWorkshopComponent, ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule

  ],
  exports:[
    MostrarErroresComponent,
    SideCommunitiesComponent,
    SideWorkshopComponent,
  ],
})
export class SharedModule { }
