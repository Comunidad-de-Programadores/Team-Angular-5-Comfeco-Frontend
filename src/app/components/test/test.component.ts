import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public images = [
    { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    { src: "https://images.unsplash.com/photo-1613501283933-1b3ef14e2739?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" },
    { src: "https://images.unsplash.com/photo-1613499319334-f013495c7578?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" },
    { src: "https://images.unsplash.com/photo-1613508603136-79e2c4a80ffe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" },
    { src: "https://images.unsplash.com/photo-1612832020548-b80943980765?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" },
    { src: "https://images.unsplash.com/photo-1613564190017-da7d7521b591?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" },
    { src: "https://source.unsplash.com/random" },
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
