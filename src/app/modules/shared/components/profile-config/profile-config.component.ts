import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { UserFirebase } from 'src/app/core/models/auth/user';
import { BaseService } from 'src/app/core/services/base.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss'],
  providers: [DatePipe]
})
export class ProfileConfigComponent implements OnInit {
  public files: any[];
  base64textString = [];
  public updateImage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _BaseService: BaseService,
    public _authService: AuthService,
    private datePipe: DatePipe,
    private http: HttpClient) {
    _BaseService.get("all").subscribe(res => this.paises = res, error => console.log(error))
    this.files = [];
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
  }

  creacionDeFormulario(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.email]],
      photoURL: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      biography: ['', [Validators.required]],
      github: ['', [Validators.required]],
      twitter: ['', [Validators.required]],
      linkeidin: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      interests: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      uid: ['',]
    });

  }

  updateData(user) {
    const datePipe = this.datePipe.transform(this.form.get('dateBirth').value, 'MM-dd-yyyy')
    let userData: UserFirebase;
    if (this.base64textString.length > 0) {
      console.log(this.base64textString[0])
      userData = { ...user, dateBirth: datePipe, photoURL: this.base64textString[0] }
    } else {
      userData = { ...user, dateBirth: datePipe }
    }
    this._authService.updateUserData(userData)
    console.log(userData)
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
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

}
