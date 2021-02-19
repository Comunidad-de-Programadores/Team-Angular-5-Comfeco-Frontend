import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/user_register';
import { AuthService } from 'src/app/modules/seguridad/services/auth.service';
import { parsearErroresAPI } from 'src/app/modules/shared/parsear-errores-api';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  errores: string[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  recovery(usuario: RegisterUser) {

    this.auth.restablecerPassword(usuario.email).subscribe(
      (respuesta) => {
        alert("Hemos enviado un correo electronico, para cambio de contraseña")

      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
        if (this.errores[0]==="EMAIL_NOT_FOUND") {
          alert("Correo no encontrado")
        }
      }
    );
  }
}
