import { Component, OnInit,OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventModel } from 'src/app/core/models/events/events';
import { Activity } from 'src/app/core/models/user/user.models';
import { EventsService } from 'src/app/core/services/fake/events.service';
import { ApplicationStateModel } from 'src/app/core/store/application/application.model';
import { AddUserActivity, GetAllBadges, GetCurrentUserProfile, SetCurrentPage } from 'src/app/core/store/user-profile/user-profile.actions';
import { UserProfileStateModel } from 'src/app/core/store/user-profile/user-profile.model';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';
import { ProfileDashboardRoutes } from '../../utils/user-profile-dashboard-routes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileRoutes = ProfileDashboardRoutes;
  profileUserInfo$: Observable<UserProfileStateModel>;
  userActivity$:Observable<Activity[]>;
  appState$:Observable<ApplicationStateModel>;

  @Select(UserProfileState.areCurrentUserLoaded) areCurrentUserLoaded$:Observable<boolean>;
  @Select(UserProfileState.areBagesLoaded) areBadgesLoaded$:Observable<boolean>;

  areLoadedSub: Subscription;


  constructor(private store: Store) {
    this.profileUserInfo$ = store.select(state=>state.userProfile);
    this.userActivity$ = store.select(state=>state.userProfile.user.activities);
    this.appState$ = store.select(state=>state.application);
  }

  ngOnInit(): void {
    this.areLoadedSub = zip(this.areCurrentUserLoaded$,this.areBadgesLoaded$,this.appState$).pipe(
      tap(([userLoaded,badgesLoaded,appState])=>{
        console.log({userLoaded})
        console.log({badgesLoaded})

        if(!userLoaded){
          this.store.dispatch(new GetCurrentUserProfile(appState.activeUserId));
        }
        if(!badgesLoaded){
          this.store.dispatch(new GetAllBadges());
        }
      })
    ).subscribe()
  }
  ngOnDestroy(): void {
    this.areLoadedSub.unsubscribe();
  }
  onViewMoreEventsClick(){
    this.store.dispatch(new SetCurrentPage(this.profileRoutes.events));
  }
}
