import { Component, HostListener } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _auth: AuthService) { }

  @HostListener('window:unload', ['$event'])
  beforeUnloadHandler(event) {
    if (localStorage.getItem("keep_session") != "1") {
      this._auth.signOut();
    }
  }

  title = 'Team-Angular5-Comfeco-Frontend';
}
