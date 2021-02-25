import { Component, Input, OnInit } from '@angular/core';
import { NotificationItem } from 'src/app/core/models/notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() items: NotificationItem[];
  constructor() { }

  ngOnInit(): void {
  }

}
