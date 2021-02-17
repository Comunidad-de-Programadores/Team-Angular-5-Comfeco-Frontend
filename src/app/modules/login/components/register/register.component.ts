import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';
import { RegisterUser } from 'src/app/core/models/user_register';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public register_
  registerForm: FormGroup;
  errores: string[] = [];


  constructor(private fb: FormBuilder) { 
    this.crearFormulario();
  }


  ngOnInit(): void {
  }

  register(usuario: RegisterUser) {
    console.log(usuario);
  }


  get usernameNoValido() {
    return this.registerForm.get('username').invalid && this.registerForm.get('username').touched;
  }
  get emailNoValido() {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get passwordNoValido() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }

  get passwordConfirmNoValido() {
    return this.registerForm.get('passwordConfirm').invalid && this.registerForm.get('passwordConfirm').touched;
  }
  get equalsPassowrds() {
    return this.registerForm.get('password').value==this.registerForm.get('passwordConfirm').value;
  }

  crearFormulario() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

}
