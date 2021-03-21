import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [WorkshopsComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule,
    MaterialModule
  ]
})
export class WorkshopsModule { }
