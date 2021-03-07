import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { UserFirebase } from 'src/app/core/models/auth/user';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private _BaseService: BaseService,
    public _authService: AuthService) {
    _BaseService.get("all").subscribe(res => this.paises = res, error => console.log(error))
  }
  form: FormGroup;
  paises: any[];

  ngOnInit(): void {
    this.creacionDeFormulario();
    this._authService.user$.pipe(
      take(1)).subscribe(user => {
        this.form.reset({
          userName: user.userName,
          email: user.email,
          country: user.country,
          uid: user.uid,
          fullName: user.fullName,
          photoURL: user.photoURL
        })

      });
  }

  creacionDeFormulario(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.email]],
      photoURL: ['', [Validators.required]],
      uid:['', ]
    });

  }

  updateData(user) {
    let userData: UserFirebase = {...user }
    this._authService.updateUserData(userData)
    console.log(userData)
  }

}
