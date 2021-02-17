import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/user_register';
import { AuthService } from 'src/app/modules/seguridad/services/auth.service';
import { parsearErroresAPI } from 'src/app/modules/shared/parsear-errores-api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  errores: string[] = [];

  constructor(private auth: AuthService, private router: Router) {}



  ngOnInit(): void {
  }

  register(usuario: RegisterUser) {
    console.log(usuario)
    this.auth.register(usuario).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        this.errores = parsearErroresAPI(error);
        console.log(this.errores)

      }
    )
    console.log(usuario);
  }



}
