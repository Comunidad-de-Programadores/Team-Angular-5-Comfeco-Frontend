import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/core/models/auth/user_register';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
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

  register(usuario) {
    console.log(usuario)
    this._auth.registerWithEmail(usuario);
  }



}
