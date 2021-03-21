import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationItem } from 'src/app/core/models/notification/notification';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hidden:boolean = false;
  hiddeMenu=false;
  secundaryMenuActive=false;
  items: NotificationItem[] = [
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
    { img: "https://www.pngkey.com/png/full/589-5898981_0-10-looks-like-videl-dragon-ball-z.png", title: "Te saluda Videl", redirect: "" },
  ];
  constructor(
    private location: Location,
    public auth: AuthService,
    public route: Router ) {
  }


  toggleBadgeVisibility() {
    this.hidden = true;
  }

  ngOnInit(): void {
    this.onResize(window.innerWidth);
  }

  public onResize(width){
    let size = width;
    if(size <= 888){
      this.hiddeMenu = true;
    }
    if(size > 888){
      this.secundaryMenuActive=false;
      this.hiddeMenu = false;
    }
  }

  onClickMenuIcon(){
    this.secundaryMenuActive=!this.secundaryMenuActive;
    console.log(this.secundaryMenuActive)
  }
}
