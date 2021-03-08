import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/core/models/events/events';
import { EventsService } from 'src/app/core/services/fake/events.service';
import { AddUserActivity, SetCurrentPage } from 'src/app/core/store/user-profile/user-profile.actions';
import { ProfileDashboardRoutes } from '../../utils/user-profile-dashboard-routes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileRoutes = ProfileDashboardRoutes;
  profileUserInfo$: Observable<any>;
  userActivity$:Observable<string[]>;
  events:EventModel[]=[];

  constructor(private store: Store, private eventsService:EventsService) {
    this.profileUserInfo$ = store.select(state=>state.userProfile);
    this.userActivity$ = store.select(state=>state.userProfile.activities);
  }

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe(
      res=> this.events = res,
      err=> {} // Todo: error-manager
    )
  }

  onViewMoreEventsClick(){
    this.store.dispatch(new SetCurrentPage(this.profileRoutes.events));
  }

  addUserActivity(){
    this.store.dispatch(new AddUserActivity(''));
  }

  addUserEvent(){
    // TODO: implementar conforme a las reglas de negocio
  }

  addUserGroup(){
    // TODO: implementar conforme a las reglas de negocio
  }
}
