import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { RegisterUser } from 'src/app/core/models/auth/user_register';
import { ErrorItem } from 'src/app/core/models/notification/error';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, public _auth: AuthService) { }
  form: FormGroup;

  @Input()
  errores: string[] = [];
  @Input()
  accion: string;
  @Output()
  onSubmit: EventEmitter<RegisterUser> = new EventEmitter<RegisterUser>();
  check: boolean = true;
  breakpoint: Number;

  ngOnInit(): void {
    this.creacionDeFormulario();
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 2;

  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 2;
  }
  creacionDeFormulario(): void {
    if (this.accion === 'register') {
      this.form = this.formBuilder.group({
        userName: ['', [Validators.required, Validators.minLength(5)]],
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
      this.form.get('userName').invalid && this.form.get('userName').touched
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
    return this._auth.errores[0] === "auth/email-already-in-use";
  }
  get authAccountExistsWithDifferentCredential() {
    return this._auth.errores[0] === "auth/account-exists-with-different-credential";
  }
  get creditialIncorrect() {
    return this._auth.errores[0] === "auth/wrong-password" || this._auth.errores[0] === "auth/user-not-found";
  }
  get emailNotFound() {
    return this.errores[0] === "auth/user-not-found";
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
