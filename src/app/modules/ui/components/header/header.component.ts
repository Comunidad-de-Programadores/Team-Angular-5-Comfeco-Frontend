import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isActived: boolean = false;
  constructor(
    private location: Location,
    public auth: AuthService) {
    }

  ngOnInit(): void {
    const path = this.location.path();
    if (path === '/login') {
      this.isActived = true;
    }
  }

}
