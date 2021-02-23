import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { SuccessTemplateComponent } from './success-template/success-template.component';



@NgModule({
  declarations: [MostrarErroresComponent, SuccessTemplateComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MostrarErroresComponent,
    SuccessTemplateComponent
  ],
})
export class SharedModule { }
