import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/auth/user_register';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { parsearErroresAPI } from 'src/app/modules/shared/parsear-errores-api';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  errores: string[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  recovery(usuario: RegisterUser) {

    this.auth.restablecerPassword(usuario.email).subscribe(
      (respuesta) => {
        this.router.navigateByUrl('/account/recovery/success')
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
      }
    );
  }
}
