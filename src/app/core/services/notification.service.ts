import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message: string;
  action: string;
  duration: number;
  constructor(private _snackBar: MatSnackBar, private _router: Router) { }

  openSnackBar(message: string, action: string, redirect?: string, afterOpened: boolean = false, duration: number = 2000) {

    this.message = message;
    this.action = action;
    this.duration = duration;

    if (this.isString(redirect)) {

      if (!afterOpened) { // show snack bar after click in action
        this.createSnack().onAction().subscribe(() => {
          this._router.navigate([redirect]);
        });
      } else { 
        this.createSnack().afterOpened().subscribe(() => {
          this._router.navigate([redirect]);
        });
      }
    } else {
      this.createSnack();
    }

  }

  createSnack() {
    return this._snackBar.open(this.message, this.action, {
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  isString(x) {
    return Object.prototype.toString.call(x) === "[object String]"
  }
}
