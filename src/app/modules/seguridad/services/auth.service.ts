import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { credencialesUsuario, User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.apiKey;
  private urlLogin = environment.urlLogin;
  private urlRegister = environment.urlRegister;
  private urlForgot = environment.urlForgot;
  private userToken: string;
  public user: any = {};
  constructor(private http: HttpClient, private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      console.log('estado del usuario' ,user);
      if(!user){
        return;
      }
      this.user.nombre = user.displayName;
      this.user.uid = user.uid
    });
    this.leerToken();
  }

  public logout() {
    localStorage.removeItem('idToken');
    this.user = {};
    this.auth.signOut();
  }

  public login(
    credencialesUsuario: credencialesUsuario,
    provider?: string
  ): Observable<Object> {
    if (provider == 'google') {

      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return;
    }

    const autenticacion = {
      ...credencialesUsuario,
      returnSecureToken: true,
    };
    return this.http.post(`${this.urlLogin}${this.apiKey}`, autenticacion).pipe(
      map((response) => {
        this.guardarToken(response['idToken']);
        return response;
      })
    );
  }

  public register(user: User): Observable<Object> {
    const autenticacion = {
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.urlRegister}${this.apiKey}`, autenticacion)
      .pipe(
        map((response) => {
          this.guardarToken(response['idToken']);
          return response;
        })
      );
  }

  private guardarToken(idToken: string): void {
    this.userToken = idToken;
    localStorage.setItem('userToken', idToken);
    // mejorar manejo de tokens
    let timeExpires = new Date();
    timeExpires.setSeconds(3600);

    localStorage.setItem('expire', timeExpires.getTime().toString());
  }

  public leerToken(): string {
    if (localStorage.getItem('userToken')) {
      this.userToken = localStorage.getItem('userToken');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
  public autenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expire = Number(localStorage.getItem('expire'));
    const fechaExpira = new Date();
    fechaExpira.setTime(expire);

    if (fechaExpira > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  public restablecerPassword(email: string): Observable<Object> {
    const data = {
      requestType: 'PASSWORD_RESET',
      email: email,
    };

    return this.http.post(`${this.urlForgot}${this.apiKey}`, data);
  }
}
