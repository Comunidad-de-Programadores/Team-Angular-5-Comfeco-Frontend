import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isActived: boolean = false;
  constructor(private location: Location) {}

  ngOnInit(): void {
    const path = this.location.path();
    if (path === '/login') {
      this.isActived = true;
    }
  }

  // hacer validaciones cuando no este logueado para boton de iniciar sesion en otras pantallas
}
