import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery-success',
  templateUrl: './recovery-success.component.html',
  styleUrls: ['./recovery-success.component.scss']
})
export class RecoverySuccessComponent implements OnInit {

  title: string = "Envio exitoso!";
  message: string = "Te hemos enviado un correo de confirmación a tu correo electrónico. <br>Al confirmarlo, podrás cambiar tu contraseña.";

  constructor() { }

  ngOnInit(): void {
  }

}
