import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';



@NgModule({
  declarations: [MostrarErroresComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MostrarErroresComponent
  ],
})
export class SharedModule { }
