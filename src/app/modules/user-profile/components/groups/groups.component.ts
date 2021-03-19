import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Group, GroupMembers } from 'src/app/core/models/user/user.models';
import { ApplicationState } from 'src/app/core/store/application/application.state';
import { AddUserActivity, GetAllGroups, LoadGroupMembers } from 'src/app/core/store/user-profile/user-profile.actions';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  originalGroupList:Group[];
  groupList:Group[];
  filterGroupValue = '';
  searchGroupTextValue = '';

  @Select(UserProfileState.getGroupsList) groups$: Observable<Group[]>;
  @Select(UserProfileState.areGroupsLoaded) areGroupsLoaded$: Observable<boolean>;
  @Select(UserProfileState.isUserOnAGroup) isUserOnAgroup$:Observable<boolean>;
  @Select(UserProfileState.areUserGroupLoaded) areUserGroupLoaded$:Observable<boolean>;
  @Select(UserProfileState.getUserGroupMembers) userGroupMembers$:Observable<GroupMembers>;
  @Select(ApplicationState.getActiveUserId) activeUserId$:Observable<string>;
  @Select(UserProfileState.getCurrentUserProfile) userProfile$:Observable<any>;
  areInfoLoaded: Subscription;

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.areInfoLoaded = zip(this.activeUserId$,this.userProfile$,this.areGroupsLoaded$, this.isUserOnAgroup$,this.areUserGroupLoaded$).pipe(
      tap(([activeUserId,userProfile,areGroupsLoaded,isUserOnAgroup, areUserGroupLoaded])=>{
        console.log({activeUserId})
        if(!areGroupsLoaded){
          this.store.dispatch(new GetAllGroups());
        }
        if(isUserOnAgroup){
          if(!areUserGroupLoaded){
            this.store.dispatch(new LoadGroupMembers({userId:activeUserId,groupMembersId:userProfile?.group_member}));
          }
        }
      })
    ).subscribe();

    this.groups$.subscribe(
      result=>{
        this.originalGroupList=result;
        this.setGroupListFiltered();
      },()=>{});

  }

  ngOnDestroy(): void {
    this.areInfoLoaded.unsubscribe();
  }



  addUserGroup(){
    this.store.dispatch(new AddUserActivity({description:`Te has unido al grupo "Front Coders"  registro: ${Date.now()}`}));
  }

  onSearchChange(textForSearch:string){
    this.searchGroupTextValue = textForSearch;
    this.setGroupListFiltered();
  }

  onFilterGroupChange(groupFilterValue:string){
    this.filterGroupValue = groupFilterValue;
    this.setGroupListFiltered();
  }

  setGroupListFiltered(){
    this.groupList=this.originalGroupList
      .filter(group=>group.name.toLowerCase().includes(this.searchGroupTextValue.toLowerCase()))
      .filter(group=>group.framework.name.toLowerCase().includes(this.filterGroupValue.toLowerCase()));
  }

}
