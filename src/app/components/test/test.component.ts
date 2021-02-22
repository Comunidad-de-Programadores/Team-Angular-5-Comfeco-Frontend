import { Component, OnInit } from '@angular/core';
import { InputItem } from 'src/app/core/models/carousel/Inputs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public images: InputItem [] = [
    {title:'Richard Lalo' , icon: "/assets/logo-frameworks/vue-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-marcos_rivas.webp" },
    {title: 'Daniel Perez', icon: "/assets/logo-frameworks/angular-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-vanessa_marely.webp" },
    {title: 'Daniel Perez', icon: "/assets/logo-frameworks/svelte-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-mayra_rodr%C3%ADguez.webp" },
    {title: 'Daniel Perez', icon: "/assets/logo-frameworks/react-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-diego_montoya.webp" },
    {title: 'Daniel Perez', icon: "/assets/logo-frameworks/vue-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-silvestre_vivo.webp" },
    {title: 'Naomi Leon', icon: "/assets/logo-frameworks/angular-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-noemi_leon.webp' },
    {title: 'Daniel Perez', icon: "/assets/logo-frameworks/vue-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-ignacio_anaya.webp", url:"google.com" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613501283933-1b3ef14e2739?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613508603136-79e2c4a80ffe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
    // { src: "https://images.unsplash.com/photo-1612832020548-b80943980765?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" },
    // { src: "https://images.unsplash.com/photo-1613564190017-da7d7521b591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" },
    // { src: "https://source.unsplash.com/random" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613501283933-1b3ef14e2739?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613508603136-79e2c4a80ffe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
    // { src: "https://images.unsplash.com/photo-1612832020548-b80943980765?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" },
    // { src: "https://images.unsplash.com/photo-1613564190017-da7d7521b591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" },
    // { src: "https://source.unsplash.com/random" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613501283933-1b3ef14e2739?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613508603136-79e2c4a80ffe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
    // { src: "https://images.unsplash.com/photo-1612832020548-b80943980765?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" },
    // { src: "https://images.unsplash.com/photo-1613564190017-da7d7521b591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" },
    // { src: "https://source.unsplash.com/random" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613501283933-1b3ef14e2739?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" },
    // { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    // { src: "https://images.unsplash.com/photo-1613508603136-79e2c4a80ffe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
    // { src: "https://images.unsplash.com/photo-1612832020548-b80943980765?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" },
    // { src: "https://images.unsplash.com/photo-1613564190017-da7d7521b591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" },
    // { src: "https://source.unsplash.com/random" },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
