import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/user_register';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthService } from 'src/app/modules/seguridad/services/auth.service';
import { parsearErroresAPI } from 'src/app/modules/shared/parsear-errores-api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public register_
  registerForm: FormGroup;
  errores: string[] = [];


  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _notification: NotificationService) { 
  }


  ngOnInit(): void {
  }

  register(usuario: RegisterUser) {
    
    this._auth.register(usuario).subscribe(
      (response) => {
        this._auth.guardarToken(response['idToken']);
        this._notification.openSnackBar("Te haz registrado correctamente", "",'',true)
      },
      (error) => {
        this._notification.openSnackBar("Usuario Registrado", "Error")
        this.errores = parsearErroresAPI(error);
      }
    )
  }



}
