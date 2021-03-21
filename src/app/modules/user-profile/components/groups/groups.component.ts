import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Activity, Group, GroupMembers, UserProfile } from 'src/app/core/models/user/user.models';
import { ApplicationState } from 'src/app/core/store/application/application.state';
import { AddUserActivity, AddUserToGroup, GetAllGroups, LoadGroupMembers, RemoveUserOfGroup } from 'src/app/core/store/user-profile/user-profile.actions';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LeaveEventGroupDialogComponent } from '../shared/leave-event-group-dialog/leave-event-group-dialog.component';
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
  userId:string = '';
  userProfile:UserProfile = {};
  isUserOnAgroupSub:Subscription;
  groupMembersSub:Subscription;
  isUserOnAGroup = false;
  userGroupMembers: GroupMembers;

  @Select(UserProfileState.getGroupsList) groups$: Observable<Group[]>;
  @Select(UserProfileState.areGroupsLoaded) areGroupsLoaded$: Observable<boolean>;
  @Select(UserProfileState.isUserOnAGroup) isUserOnAgroup$:Observable<boolean>;
  @Select(UserProfileState.areUserGroupLoaded) areUserGroupLoaded$:Observable<boolean>;
  @Select(UserProfileState.getUserGroupMembers) userGroupMembers$:Observable<GroupMembers>;
  @Select(ApplicationState.getActiveUserId) activeUserId$:Observable<string>;
  @Select(UserProfileState.getCurrentUserProfile) userProfile$:Observable<UserProfile>;

  @Select(UserProfileState.getUserActivities) activities$:Observable<Activity[]>

  areInfoLoaded: Subscription;

  constructor(private store:Store,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.areInfoLoaded = zip(this.activeUserId$,this.userProfile$,this.areGroupsLoaded$,
                              this.isUserOnAgroup$,this.areUserGroupLoaded$).pipe(
      tap(([activeUserId,userProfile,areGroupsLoaded,isUserOnAgroup, areUserGroupLoaded])=>{
        this.userProfile = userProfile;
        this.userId= activeUserId;
        // this.userGroupMembers = userGroupMembers;
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

    this.isUserOnAgroupSub = this.isUserOnAgroup$.subscribe(
      res=>{
        this.isUserOnAGroup = res;
      }
    )

    this.groupMembersSub = this.userGroupMembers$.pipe(
      tap(result=>this.userGroupMembers = result)
    ).subscribe()


  }

  ngOnDestroy(): void {
    this.areInfoLoaded.unsubscribe();
    this.isUserOnAgroupSub.unsubscribe();
    this.groupMembersSub.unsubscribe();
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

  joinToGroup( group:Group){
    if(!this.isUserOnAGroup){
      this.store.dispatch(new AddUserToGroup({userId: this.userId,group}));
    }else{
      let data= {
        title: 'Lo siento',
        description: `No te puedes registrar a este grupo. Primero tendras que abandonar el grupo en el que te encuentras actualmente.`,
        actionButtons:{accept:'Aceptar'}
      }
      this.openDialogCantJoinToGroup(data)
    }
  }


  leaveGroup(){
    let data = {
      title: 'Abandonar grupo.',
      description: '¿Estas seguro que quieres abandonar el grupo?',
      actionButtons:{accept:'Si',cancel:'No'}
    }
    this.openDialogLeaveGroup(data);
  }


  openDialogCantJoinToGroup(data): void {
    const dialogRef = this.dialog.open(LeaveEventGroupDialogComponent, {
      width: '250px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      let respuesta;
      respuesta = result;
      console.log({respuesta});
    });
  }

  openDialogLeaveGroup(data): void {
    const dialogRef = this.dialog.open(LeaveEventGroupDialogComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(isAccepted => {
      if(isAccepted){
        this.store.dispatch(new RemoveUserOfGroup({userId:this.userId,group:this.userGroupMembers.group}));
      }
    });
  }
}
