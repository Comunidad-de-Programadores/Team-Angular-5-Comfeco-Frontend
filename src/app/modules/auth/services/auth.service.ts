import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { credencialesUsuario, User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User, UserFirebase } from 'src/app/core/models/auth/user';
import { LoginUser } from 'src/app/core/models/auth/user_login';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { parsearErroresAPI } from '../../shared/parsear-errores-api';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<UserFirebase>;
  errores: string[] = [];

  constructor(
    private auth: AngularFireAuth,
    private _notification: NotificationService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
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

  async registerWithEmail(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this._notification.openSnackBar("Usuario Registrado", "", "", true)
      return this.updateUserData(user.user);
    }).catch(error => {
      this._notification.openSnackBar(`Tu correo ya se encuentra registrado.`, "Error",)
      this.errores = parsearErroresAPI(error);
    }
    )
  }

  async loginWithEmail(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this._notification.openSnackBar("Session Iniciada", "", "", true)
      return this.updateUserData(user.user);
    }).catch(error => {
      console.log(error)
      this._notification.openSnackBar(`Credenciales incorrectas!.`, "Error",)
      this.errores = parsearErroresAPI(error);
    }
    )
  }

  async registerWithGoogle() {
    const credential = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this._notification.openSnackBar("Session Iniciada", "", "", true)
    return this.updateUserData(credential.user);
  }
  async registerWithFacebook() {
    await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
      this._notification.openSnackBar("Session Iniciada", "", "", true)
      return this.updateUserData(user.user);
    }).catch(error => {
      this._notification.openSnackBar(`Tu correo ${error.email} ya se encuentra registrado.`, "Error",)
      this.errores = parsearErroresAPI(error);
    }
    )

  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<UserFirebase> = this.afs.doc(`users/${user.uid}`);
    const PHOTO_URL_DEFAULT = "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png";
    let data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    if (user.photoURL == null) {
      data.photoURL = PHOTO_URL_DEFAULT;
    }


    return userRef.set(data, { merge: true })

  }
  async signOut() {
    await this.auth.signOut();
    this._notification.openSnackBar("Session Finalizanda", "Ingresa Nuevamente", "/account/login", true);
  }

  async recoveryPassword(email: string) {
   return await this.auth.sendPasswordResetEmail(email);
  }
}
