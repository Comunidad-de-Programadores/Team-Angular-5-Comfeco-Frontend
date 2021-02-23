import { Component, Input, OnInit } from '@angular/core';
import { InputItem } from 'src/app/core/models/carousel/Inputs';

@Component({
  selector: 'app-leader-card',
  templateUrl: './leader-card.component.html',
  styleUrls: ['./leader-card.component.scss']
})
export class LeaderCardComponent implements OnInit {

  @Input() item: InputItem = <InputItem>{};

  constructor() { }

  ngOnInit(): void {
  }

}
