import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FormularioAutenticacionComponent } from './formulario-autenticacion/formulario-autenticacion.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [FormularioAutenticacionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,

  ],
  exports:[

    FormularioAutenticacionComponent
  ],
})
export class SeguridadModule { }
