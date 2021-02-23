import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './components/workshops/workshops.component';


@NgModule({
  declarations: [WorkshopsComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule
  ]
})
export class WorkshopsModule { }
