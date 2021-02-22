import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LeaderCardComponent } from './components/leader-card/leader-card.component';



@NgModule({
  declarations: [MostrarErroresComponent, CarouselComponent, LeaderCardComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MostrarErroresComponent,
    CarouselComponent,
    LeaderCardComponent
  ],
})
export class SharedModule { }
