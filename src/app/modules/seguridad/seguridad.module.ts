import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FormularioAutenticacionComponent } from './formulario-autenticacion/formulario-autenticacion.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [FormularioAutenticacionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[
    FormularioAutenticacionComponent
  ],
})
export class SeguridadModule { }
