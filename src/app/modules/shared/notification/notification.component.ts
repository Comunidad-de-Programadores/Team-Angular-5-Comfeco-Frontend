import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { NotificationItem } from 'src/app/core/models/notification/notification';
import { Activity } from 'src/app/core/models/user/user.models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  userActivity$:Observable<Activity[]>;
  activeUserSub:Subscription;

  @Input() items: NotificationItem[];
  constructor(private store: Store) { 
    this.userActivity$ = this.store.select(state=>state.userProfile.user.activities);
  }

  ngOnInit(): void {
  }

}
