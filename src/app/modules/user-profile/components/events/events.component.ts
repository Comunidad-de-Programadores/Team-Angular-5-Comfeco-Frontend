import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUserActivity } from 'src/app/core/store/user-profile/user-profile.actions';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  addUserActivity(){
    this.store.dispatch(new AddUserActivity(`Te has registrado al evento "Ng Conf Salt Lake City"  registro: ${Date.now()}`));
  }
}
