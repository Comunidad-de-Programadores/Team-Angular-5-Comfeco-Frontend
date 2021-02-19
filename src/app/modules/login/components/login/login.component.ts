import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// import { credencialesUsuario } from 'src/app/core/models/user';
import { LoginUser } from 'src/app/core/models/user_login';
import { AuthService } from 'src/app/modules/seguridad/services/auth.service';
import { parsearErroresAPI } from 'src/app/modules/shared/parsear-errores-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router) {}


  errores: string[] = [];

  ngOnInit(): void { }


  public login(credencialesUsuario: LoginUser ): void {
    this.auth.login(credencialesUsuario).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.router.navigateByUrl('/home');
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        if (
          this.errores[0] === 'EMAIL_NOT_FOUND' ||
          this.errores[0] === 'INVALID_PASSWORD'
        ) {
          this.errores[0] = 'Correo o contraseña incorrecta';
        }
      }
    );

  }
}
