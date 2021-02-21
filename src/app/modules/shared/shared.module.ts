import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { CarouselComponent } from './components/carousel/carousel.component';



@NgModule({
  declarations: [MostrarErroresComponent, CarouselComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MostrarErroresComponent,
    CarouselComponent,
  ],
})
export class SharedModule { }
