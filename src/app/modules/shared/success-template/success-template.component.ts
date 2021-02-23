import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-template',
  templateUrl: './success-template.component.html',
  styleUrls: ['./success-template.component.scss']
})
export class SuccessTemplateComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
