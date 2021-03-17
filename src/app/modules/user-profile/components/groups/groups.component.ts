import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Group } from 'src/app/core/models/user/user.models';
import { AddUserActivity, GetAllGroups } from 'src/app/core/store/user-profile/user-profile.actions';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  @Select(UserProfileState.getGroupsList) groups$: Observable<Group[]>;

  @Select(UserProfileState.areGroupsLoaded) areGroupsLoaded$: Observable<boolean>;

  areGroupsLoadedSub: Subscription;

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.areGroupsLoadedSub = this.areGroupsLoaded$.pipe(
      tap((areGroupsLoaded)=>{
        if(!areGroupsLoaded){
          this.store.dispatch(new GetAllGroups());
        }
      })
    ).subscribe(value=>{
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this.areGroupsLoadedSub.unsubscribe();
  }



  addUserGroup(){
    this.store.dispatch(new AddUserActivity({description:`Te has unido al grupo "Front Coders"  registro: ${Date.now()}`}));
  }


}
