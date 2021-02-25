import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LeaderCardComponent } from './components/leader-card/leader-card.component';
import { SideCommunitiesComponent } from './components/communities/side-communities/side-communities.component';
import { RouterModule } from '@angular/router';
import { SideWorkshopComponent } from './components/workshops/side-workshop/side-workshop.component';
import { FormsModule } from '@angular/forms';
import { SuccessTemplateComponent } from './components/success-template/success-template.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';



@NgModule({
  declarations: [MostrarErroresComponent, CarouselComponent, LeaderCardComponent, SideCommunitiesComponent, SideWorkshopComponent, SuccessTemplateComponent, CountdownTimerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule

  ],
  exports:[
    MostrarErroresComponent,
    CarouselComponent,
    LeaderCardComponent,
    SideCommunitiesComponent,
    SideWorkshopComponent,
    SuccessTemplateComponent,
    CountdownTimerComponent
  ],
})
export class SharedModule { }
