import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { credencialesUsuario, User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User, UserFirebase } from 'src/app/core/models/user';
import { LoginUser } from 'src/app/core/models/user_login';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.apiKey;
  private urlLogin = environment.urlLogin;
  private urlRegister = environment.urlRegister;
  private urlForgot = environment.urlForgot;
  private userToken: string;
  user$: Observable<UserFirebase>;
  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private _notification: NotificationService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  public logout() {
    localStorage.removeItem('idToken');
    this.auth.signOut();
  }


  public login(credencialesUsuario: LoginUser): Observable<Object> {

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

  public guardarToken(idToken: string): void {
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

  async registerWithGoogle() {
    const credential = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this._notification.openSnackBar("Session Iniciada", "", "", true)
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<UserFirebase> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }
  async signOut() {
    await this.auth.signOut();
    this._notification.openSnackBar("Session Finalizanda", "Ingresa Nuevamente", "/account/login")
  }

  public restablecerPassword(email: string): Observable<Object> {
    const data = {
      requestType: 'PASSWORD_RESET',
      email: email,
    };

    return this.http.post(`${this.urlForgot}${this.apiKey}`, data);
  }
}
