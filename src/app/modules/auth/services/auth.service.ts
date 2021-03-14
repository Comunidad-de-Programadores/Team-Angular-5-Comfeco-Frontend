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

  async registerWithEmail(usuario) {
    await this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(user => {
      this._notification.openSnackBar("Usuario Registrado", "", "", true)
      console.log(user)
      const userData = {
        userName: usuario.userName,
        email: usuario.email,
        ...user.user
      }
      return this.updateUserData(userData);
    }).catch(error => {
      this._notification.openSnackBar(`Tu correo ya se encuentra registrado.`, "Error",)
      this.errores = parsearErroresAPI(error);
    }
    )
  }

  async loginWithEmail(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this._notification.openSnackBar("Session Iniciada", "", "", true)
      //  return this.updateUserData(user.user);
      return;
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
    if (credential.additionalUserInfo.isNewUser) {
      return this.updateUserData(credential.user);
    }
  }
  async registerWithFacebook() {
    await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
      this._notification.openSnackBar("Session Iniciada", "", "", true)
      if (user.additionalUserInfo.isNewUser) {
        return this.updateUserData(user.user);
      }
    }).catch(error => {
      this._notification.openSnackBar(`Tu correo ${error.email} ya se encuentra registrado.`, "Error",)
      this.errores = parsearErroresAPI(error);
    }
    )

  }

  public updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<UserFirebase> = this.afs.doc(`users/${user.uid}`);
    console.log(userRef)
    const PHOTO_URL_DEFAULT = "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png";
    let data = {
      uid: user.uid,
      email: user.email,
      userName: user.userName,
      fullName: user.displayName || user.fullName || "",
      photoURL: user.photoURL,
      gender: user.gender || "",
      dateBirth: user.dateBirth || "",
      country: user.country || "",
      biography: user.biography || "",
      facebook: user.facebook || "",
      github: user.github || "",
      twitter: user.twitter || "",
      linkedin: user.linkedin || "",
      interests: user.interests || "",
    }
    if (user.photoURL == null) {
      data.photoURL = PHOTO_URL_DEFAULT;
    }
    if (data.userName == null && data.fullName != null) {
      data.userName = data.fullName.replace(/ /g, "").toLowerCase();
    }
    console.log(data)
    return userRef.set(data, { merge: true })

  }
  async signOut() {
    await this.auth.signOut();
    this._notification.openSnackBar("Session Finalizanda", "Ingresa Nuevamente", "/account/login", true);
  }

  async recoveryPassword(email: string) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  async changeEmail(email: string) {
    return await (await this.auth.currentUser).updateEmail(email);
  }
  async changePassword(password: string) {
    return await (await this.auth.currentUser).updatePassword(password);
  }
}
