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
import { Store } from '@ngxs/store';
import { UpdateActiveUserId } from 'src/app/core/store/application/application.actions';
import { UserService } from 'src/app/core/services/api/user/user.service';
import { UserDetail } from 'src/app/core/models/user/user.models';

import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';
import { ResetUserProfile } from 'src/app/core/store/user-profile/user-profile.actions';
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
    private store: Store,
    private _userService: UserService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.store.dispatch(new UpdateActiveUserId(user.uid))
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          this.store.dispatch(new UpdateActiveUserId(''));
          //TODO: @odprz Verify why on logout, getAllbadgets action is Called
          this.store.dispatch( new ResetUserProfile());
          return of(null);
        }
      })
    )
  }

  async registerWithEmail(usuario) {
    await this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then((user) => {
      this._notification.openSnackBar("Usuario Registrado", "", "", true)
      console.log(user)
      const userData: UserFirebase = {
        userName: usuario.userName,
        email: usuario.email,
        ...user.user
      }
      const userDetail: UserDetail = {
        user_id: userData.uid
      }
      this._userService.addNewUser(userDetail).subscribe(res => {
        return this.updateUserData(userData);
      }, err => { // TO-DO Implementar en caso que falle esta petición.
      })
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
      const userDetail: UserDetail = {
        user_id: credential.user.uid
      }
      this._userService.addNewUser(userDetail).subscribe(res => {
        return this.updateUserData(credential.user);
      }, err => { // TO-DO Implementar en caso que falle esta petición.
      })
    }
  }
  async registerWithFacebook() {
    await this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(user => {
      this._notification.openSnackBar("Session Iniciada", "", "", true)
      if (user.additionalUserInfo.isNewUser) {
        const userDetail: UserDetail = {
          user_id: user.user.uid
        }
        this._userService.addNewUser(userDetail).subscribe(res => {
          return this.updateUserData(user);
        }, err => { // TO-DO Implementar en caso que falle esta petición.
        })
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
      interests: user.interests || [],
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
