import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/core/models/user_register';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.scss']
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
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

  get usernameNoValido() {
    return this.form.get('username').invalid && this.form.get('username').touched;
  }
  get emailNoValido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get passwordNoValido() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get passwordConfirmNoValido() {
    return this.form.get('passwordConfirm').invalid && this.form.get('passwordConfirm').touched;
  }
  get equalsPassowrds() {
    return this.form.get('password').value==this.form.get('passwordConfirm').value;
  }
  obtenerMensajeErrorEmail(){
    var campo = this.form.get('email');
    if (campo.hasError('required')){
      return 'El campo Correo eléctronico es requerido';
    }

    if (campo.hasError('email')){
      return 'El Correo eléctronico no es válido';
    }

    return '';
  }

}
