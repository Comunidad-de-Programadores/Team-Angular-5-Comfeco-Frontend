import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event, EventDetail, UserProfile } from 'src/app/core/models/user/user.models';
import { ApplicationState } from 'src/app/core/store/application/application.state';
import { AddEventToUser, AddUserActivity, GetAllEvents, RemoveUserOfEvent } from 'src/app/core/store/user-profile/user-profile.actions';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';
import { LeaveEventGroupDialogComponent } from '../shared/leave-event-group-dialog/leave-event-group-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // @Select(UserProfileState.getEventsList) eventsLists$:Observable<Event[]>;
  @Select(UserProfileState.getAllEventsWithUserOrWithout) eventsLists$:Observable<EventDetail[]>;
  @Select(UserProfileState.areEventsLoaded) areEventsLoaded$: Observable<boolean>;
  @Select(ApplicationState.getActiveUserId) activeUserId$:Observable<string>;
  @Select(UserProfileState.getCurrentUserProfile) userProfile$:Observable<UserProfile>;
  userProfileSub:Subscription;
  areEventsLoadedSubs:Subscription;
  activeUserSub:Subscription;
  userId:string;
  userProfile:UserProfile;

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.areEventsLoadedSubs = this.areEventsLoaded$.pipe(
      tap((areEventsLoaded)=>{
        console.log({areEventsLoaded})
        if(!areEventsLoaded){
          this.store.dispatch(new GetAllEvents());
        }
      })
    ).subscribe()
    this.activeUserSub=this.activeUserId$.pipe(
      tap(result=>{
        this.userId = result;
      })
    ).subscribe();

    this.userProfileSub = this.userProfile$.pipe(
      tap(userProfile=>this.userProfile=userProfile)
    ).subscribe()
  }
  ngOnDestroy(): void {
    this.areEventsLoadedSubs.unsubscribe();
    this.activeUserSub.unsubscribe();
  }

  onParticipateClick(event:Event){
    if((this.userProfile.ban_events.find(ev=>event.name===ev.name))){
      let data = {
        title:'Lo sentimos.',
        description:'No puedes participar en este evento ya que anteriormente estuviste registrado y fuiste baneado.',
        actionButtons:{accept:'Aaceptar'}
      };
      this.openDialogJoinBanEvent(data);
    }else{
      this.store.dispatch(new AddEventToUser({userId:this.userId,event}));
    }
  }

  onLeaveClick(event:Event){
    let data = {
      title:'¿Abandonar evento?',
      description:'¿Estas seguro que quieres abandonar el evento? Si lo abandonas no podras unirte nuevamente en un futuro ya que quedaras baneado.',
      actionButtons:{accept:'Abandonar', cancel:'Cancelar'},
      event:event
    };
    this.openDialogLeaveEvent(data);
  }

  openDialogLeaveEvent(data:{title:string,description:string,actionButtons:{accept:string,cancel?:string},event?:Event}): void {
    const dialogRef = this.dialog.open(LeaveEventGroupDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(isAccepted => {
      if(isAccepted){
        this.store.dispatch(new RemoveUserOfEvent({userId:this.userId,event:data.event}));
      }
    });
  }

  openDialogJoinBanEvent(data:{title:string,description:string,actionButtons:{accept:string,cancel?:string},event?:Event}): void {
    const dialogRef = this.dialog.open(LeaveEventGroupDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(isAccepted => {

    });
  }
}
