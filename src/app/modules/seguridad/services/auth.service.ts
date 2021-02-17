import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { credencialesUsuario, User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = environment.apiKey;
  private urlLogin = environment.urlLogin;
  private urlRegister = environment.urlRegister;
  private urlForgot = environment.urlForgot;
  private userToken: string;
  constructor(private http: HttpClient) {
    this.leerToken();
   }

  /**
   * logout
   */
  public logout() {
    localStorage.removeItem('idToken');

  }

  /**
   * login
   */
  public login(credencialesUsuario: credencialesUsuario): Observable<Object> {
    const autenticacion = {
      ...credencialesUsuario,
      returnSecureToken: true
    };
    return  this.http.post(`${this.urlLogin}${this.apiKey}`, autenticacion)
    .pipe(
      map( response => {
        this.guardarToken(response['idToken']);
        return response;
      })
    );
  }


  /**
   * register
   */
  public register(user: User): Observable<Object> {
    const autenticacion = {
      ...user,
      returnSecureToken: true
    };
    return  this.http.post(`${this.urlRegister}${this.apiKey}`, autenticacion)
    .pipe(
      map( response => {
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
    }else {
      this.userToken = '';
    }
    return this.userToken;
  }
  public autenticado(): boolean{
    if (this.userToken.length < 2){
      return false
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

  public restablecerPassword(email: string){
    const data = {
      requestType: 'PASSWORD_RESET',
      email: email,
    }

    return  this.http.post(`${this.urlForgot}${this.apiKey}`, data);
  }
}
