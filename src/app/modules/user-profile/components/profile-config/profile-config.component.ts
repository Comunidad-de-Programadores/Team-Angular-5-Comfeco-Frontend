import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { UserFirebase } from 'src/app/core/models/auth/user';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CountriesService } from 'src/app/core/services/api/countries/countries.service';


@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss'],
  providers: [DatePipe]
})
export class ProfileConfigComponent implements OnInit {
  public files: any[];
  base64textString: string;
  public updateImage: boolean = false;
  porcent: Number = 0;
  interestsList: string[] = ['Front End', 'Back End', 'Angular', 'ReactJs', 'DevOps'];
  baseUrl ='https://restcountries.eu/rest/v2/'; // TODO: @erick agregar a variables de entorno

  constructor(
    private formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    public _authService: AuthService,
    private datePipe: DatePipe,
    private countryService: CountriesService) {
    this.files = [];
  }
  form: FormGroup;
  formChangePassword: FormGroup;
  changePassword: boolean = false;
  paises: any[];
  error: any;


  ngOnInit(): void {
    this.creacionDeFormulario();
    this._authService.user$.pipe(
      take(1)).subscribe(user => {
        console.log(user)
        this.form.reset({
          userName: user.userName,
          email: user.email,
          country: user.country,
          uid: user.uid,
          fullName: user.fullName,
          photoURL: user.photoURL,
          gender: user.gender,
          biography: user.biography,
          facebook: user.facebook,
          github: user.github,
          twitter: user.twitter,
          linkedin: user.linkedin,
          interests: user.interests,
          dateBirth: new Date(user.dateBirth.toString())
        })

      });
      // TODO: @erick crear un servicio que implemente el baseService y no utilizar baseService de manera directa
    this.countryService.getCountries().subscribe(res => this.paises = res, error => console.log(error))
    this.onChanges();

  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      let totalPropertiesForm = Object.keys(val).length
      let totalCompleted: number = 0;
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          const element = val[key];
          if (element != "") {
            totalCompleted++;
          }
        }
      }
      this.porcent = (100 / totalPropertiesForm) * totalCompleted;
      console.log(this.porcent)
    });

  }

  creacionDeFormulario(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      photoURL: ['', [Validators.required]],
      gender: ['', [Validators.minLength(2)]],
      biography: ['', [Validators.required, Validators.minLength(25)]],
      github: ['', [Validators.minLength(2)]],
      twitter: ['', [Validators.minLength(2)]],
      linkedin: ['', [Validators.minLength(2)]],
      dateBirth: ['', [Validators.minLength(2)]],
      interests: ['', [Validators.minLength(1)]],
      facebook: ['', [Validators.minLength(2)]],
      uid: ['',]
    });

  }


  get passwordNoValido() {
    return (
      this.formChangePassword.get('password').invalid && this.formChangePassword.get('password').touched
    );
  }
  get biographyisValid() {
    return (
      this.form.get('biography').invalid && this.form.get('biography').touched
    );
  }
  get dateIsValid() {
    return (
      this.form.get('dateBirth').invalid && this.form.get('dateBirth').touched
    );
  }
  get passwordConfirmNoValido() {
    return (
      this.formChangePassword.get('confirmPassword').invalid &&
      this.formChangePassword.get('confirmPassword').touched
    );
  }
  get equalsPasswords() {
    const pass1 = this.formChangePassword.get('password').value;
    const pass2 = this.formChangePassword.get('confirmPassword').value;
    return pass1 === pass2 ? false : true;
  }

  updateData(user) {

    //Update Email
    if (this.form.get('email').dirty) {
      this.updateEmail(user);
    } else {
      this.updateProfile(user);
    }
  }


  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
    this.form.markAsDirty();
  }

  changePasswordForm() {
    this.changePassword = true;
    this.formChangePassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  async changePasswordUpdate(credendials) {
    if (this.formChangePassword.valid) {
      await this._authService.changeEmail(this.form.get('email').value)
        .then(res => {
          this.error = {
            code: "UPDATE-PASSWORD",
            message: "Tu contraseña fue modificada con éxito.",
            type: "alert-info",
            title: "Info!"
          }
        })
        .catch(er => {
          this.error = {
            code: er.code,
            message: er.message,
            type: "alert-danger",
            title: "Alerta!"
          }
          return;
        })
    }
    console.log(credendials)
  }

  async updateEmail(user) {

    await this._authService.changeEmail(this.form.get('email').value)
      .then(res => {
        this._notificationService.openSnackBar("Correo modificado", "Success")
        this.updateProfile(user)
      })
      .catch(er => {
        this.error = {
          code: er.code,
          message: er.message,
          type: "alert-danger",
          title: "Alerta!"
        }
        return;
      })

  }

  updateProfile(user) {

    let userData: UserFirebase;
    userData = { ...user }
    let datePipe = "";
    if (this.form.get('dateBirth').value != "") {
      datePipe = this.datePipe.transform(this.form.get('dateBirth').value, 'MM-dd-yyyy')
    } else {
      datePipe = null;
    }


    if (this.base64textString) {
      console.log(this.base64textString)
      userData.dateBirth = datePipe;
      userData.photoURL = this.base64textString;
    }

    if (datePipe != null) {
      userData.dateBirth = datePipe;
    }
    if (this.form.valid) {
      this._authService.updateUserData(userData)
        .then(sucess => {
          this.error = {
            code: "UPDATE-DATA",
            message: "Todos los campos han sido actualizados con éxito",
            type: "alert-success",
            title: "Success!"
          }
        }).catch(badError => {
          this.error = {
            code: "FATAL-ERROR",
            message: "Estamos teniendo problemas para actualizar tu información, intenta más tarde.",
            type: "alert-danger",
            title: "Error!"
          }
        })
      this.form.markAsPristine()
    } else {
      this.error = {
        code: "INVALID-FORM",
        message: "Debes llenar todos los campos requeridos.",
        type: "alert-info",
        title: "Info!"
      }
    }
  }
  verifyWrapper(typeWrapper: Number) {
    if (typeWrapper === 0) {
      if (this.porcent <= 0 && this.porcent < 50) {
        return true;
      }
    }
    if (typeWrapper === 50) {
      if (this.porcent >= 50 && this.porcent < 100) {
        return true;
      }
    }

    if (typeWrapper === 100) {
      if (this.porcent === 100) {
        return true;
      }
    }
    return false;

  }

}
