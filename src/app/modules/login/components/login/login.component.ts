import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { credencialesUsuario } from 'src/app/core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  errores: string[] = [];

  ngOnInit(): void {}

  login(credenciales: credencialesUsuario) {}
}
