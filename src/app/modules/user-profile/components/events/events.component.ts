import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from 'src/app/core/models/user/user.models';
import { AddUserActivity, GetAllEvents } from 'src/app/core/store/user-profile/user-profile.actions';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Select(UserProfileState.getEventsList) eventsLists$:Observable<Event[]>;
  @Select(UserProfileState.areEventsLoaded) areEventsLoaded$: Observable<boolean>;
  areEventsLoadedSubs:Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.areEventsLoadedSubs = this.areEventsLoaded$.pipe(
      tap((areEventsLoaded)=>{
        console.log({areEventsLoaded})
        if(!areEventsLoaded){
          this.store.dispatch(new GetAllEvents());
        }
      })
    ).subscribe()
  }
  ngOnDestroy(): void {
    this.areEventsLoadedSubs.unsubscribe();
  }

  addUserActivity(){
    this.store.dispatch(new AddUserActivity({description:`Te has registrado al evento "Ng Conf Salt Lake City"  registro: ${Date.now()}`}));
  }
}
