import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { RegisterUser } from 'src/app/core/models/user_register';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.scss'],
})
export class FormularioAutenticacionComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  form: FormGroup;

  @Input()
  errores: string[] = [];
  @Input()
  accion: string;
  @Output()
  onSubmit: EventEmitter<RegisterUser> = new EventEmitter<RegisterUser>();

  ngOnInit(): void {
    this.creacionDeFormulario();
    // this.crearListeners();
    this.cargardata()
  }
  cargardata(){
    this.form.reset({
      username:'geferasd',
      email:'gegfe@asdas.com',
      password: 'geferman',
      passwordConfirm: 'geferman'
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
    return this.errores[0]==="EMAIL_EXISTS";
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
    console.log(event);
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
