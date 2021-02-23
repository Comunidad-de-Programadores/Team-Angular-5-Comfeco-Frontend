import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { RegisterUser } from 'src/app/core/models/auth/user_register';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, public _auth: AuthService) {}
  form: FormGroup;

  @Input()
  errores: string[] = [];
  @Input()
  accion: string;
  @Output()
  onSubmit: EventEmitter<RegisterUser> = new EventEmitter<RegisterUser>();
  check:boolean=true;

  ngOnInit(): void {
    this.creacionDeFormulario();
    // this.crearListeners();
    this.cargardata()
  }
  cargardata(){
    this.form.reset({
      username:'iamrivard',
      email:'erick.sgr10@gmail.com',
      password: 'iamrivard',
      passwordConfirm: 'iamrivard'
    })
  }
  crearListeners() {
    this.form.valueChanges.subscribe((valor) => {
      console.log(valor);
    });
    this.form.statusChanges.subscribe((valor) => {
      console.log(valor);
    });
  }
  creacionDeFormulario(): void {
    if (this.accion === 'register') {
      this.form = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
        check: [''],
      },
      {
        validators: this.matchPasswords('password', 'passwordConfirm'),
      }
      );
    } else if (this.accion === 'login') {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        check: [''],
      });
    } else {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }
  }

  get usernameNoValido() {
    return (
      this.form.get('username').invalid && this.form.get('username').touched
    );
  }
  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return (
      this.form.get('password').invalid && this.form.get('password').touched
    );
  }

  get passwordConfirmNoValido() {
    return (
      this.form.get('passwordConfirm').invalid &&
      this.form.get('passwordConfirm').touched
    );
  }
  get equalsPassowrds() {
    const pass1 = this.form.get('password').value;
    const pass2 = this.form.get('passwordConfirm').value;
    return pass1 === pass2 ? false : true;
  }

  get emailExits() {
    return this._auth.errores[0]==="auth/email-already-in-use";
  }
  get authAccountExistsWithDifferentCredential(){
    return this._auth.errores[0]==="auth/account-exists-with-different-credential";
  }
  get creditialIncorrect(){
    return this._auth.errores[0]==="auth/wrong-password" || this._auth.errores[0]==="auth/user-not-found";
  }


  get emailNotFound() {
    return this.errores[0]==="EMAIL_NOT_FOUND";
  }

  obtenerMensajeErrorEmail() {
    var campo = this.form.get('email');
    if (campo.hasError('required')) {
      return 'El campo Correo eléctronico es requerido';
    }

    if (campo.hasError('email')) {
      return 'El Correo eléctronico no es válido';
    }

    return '';
  }
  checked(event: boolean) {
    this.form.get('check').setValue(event);
    localStorage.setItem("keep_session", event ? "1" : "0")
  }
  matchPasswords(pass1: string, pass2: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[pass1];
      const passwordConfirm = formGroup.controls[pass2];

      if (password.value === passwordConfirm.value) {
        passwordConfirm.setErrors(null);
      } else {
        passwordConfirm.setErrors({ noEsIgual: true });
      }
    };
  }
}