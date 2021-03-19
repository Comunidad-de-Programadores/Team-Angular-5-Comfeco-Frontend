import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { zip } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User, UserFirebase } from "../../models/auth/user";
import { BadgesService } from "../../services/api/badges/badges.service";
import { EventsService } from "../../services/api/events/events.service";
import { GroupsService } from "../../services/api/groups/groups.service";
import { UserService } from "../../services/api/user/user.service";
import { SetCurrentPage, AddAreaToUser, AddUserActivity, AddUserEvent, GetAllGroups, GetCurrentUserProfile, GetAllBadges, GetAllEvents, LoadGroupMembers, ResetUserProfile } from "./user-profile.actions";
import { UserProfileStateModel } from "./user-profile.model";

@State({
  name: 'userProfile',
  defaults: {
    currentPage: 'nav-profile',
    user: {
      uid:'',
      photoURL:'',
      fullName:'',
      gender:'',
      dateBirth:'',
      country:'',
      biography:'',
      facebook:'',
      github:'',
      twitter:'',
      linkedin:'',
      interests:'',
      userName:'',
      email:''
    },
    groups: [],
    badges: [],
    activities: [],
    events:[],
    userGroupMembers:null,
    areUserGroupLoaded:false,
    areUserProfileLoaded: false,
    areGroupsLoaded:false,
    areEventsLoaded:false,
    areBadgesLoaded:false,
  }
})
@Injectable()
export class UserProfileState{

  constructor(private groupService: GroupsService,
    private userService: UserService,
    private badgesService: BadgesService,
    private eventsService: EventsService,
    private afs:AngularFirestore) {
  }

  @Selector()
  static getCurrentPage(state:UserProfileStateModel){return state.currentPage}

  @Selector()
  static getUserActivities(state:UserProfileStateModel){return state.user.activities}

  @Selector()
  static getCurrentUserProfile(state:UserProfileStateModel){return state.user}

  @Selector()
  static areGroupsLoaded(state:UserProfileStateModel){return state.areGroupsLoaded}

  @Selector()
  static areEventsLoaded(state:UserProfileStateModel){return state.areEventsLoaded}

  @Selector()
  static areUserGroupLoaded(state:UserProfileStateModel){return state.areUserGroupLoaded}

  @Selector()
  static isUserOnAGroup(state:UserProfileStateModel){
    return state.user?.group_member?true:false;
  }

  @Selector()
  static areCurrentUserLoaded(state:UserProfileStateModel){return state.areUserProfileLoaded}

  @Selector()
  static areBagesLoaded(state:UserProfileStateModel){return state.areBadgesLoaded}

  @Selector()
  static getUserGroupMembers(state:UserProfileStateModel){return state.userGroupMembers}

  @Selector()
  static getGroupsList(state:UserProfileStateModel){return state.groups}

  @Selector()
  static getEventsList(state:UserProfileStateModel){return state.events}

  @Selector()
  static getBadges(state:UserProfileStateModel){return state.badges}

  @Action(SetCurrentPage)
  setCurrentPage({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:SetCurrentPage){
    const state = getState();
    patchState({
      ...state,
      currentPage: payload,
    });
  }

  @Action(AddAreaToUser)
  addArea({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:AddAreaToUser){
    const state = getState();
    let user = state.user;
    user.interests=[...user.interests,payload];
    patchState({
      user:{...user}
    });
  }


  // TODO: implementar conforme a las reglas de negocio
  @Action(AddUserActivity)
  addUserActivity({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:AddUserActivity){
    const state = getState();
    patchState({
      user:{...state.user,
        activities:[...state.user.activities,payload]
      }
    });
  }

  // TODO: implementar conforme a las reglas de negocio
  @Action(AddUserEvent)
  addUserEvent({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:AddUserEvent){
    const state = getState();
    patchState({
      events:[...state.events,payload]
    });
  }


  @Action(GetAllGroups)
  getAllGroups({getState,patchState}:StateContext<UserProfileStateModel>){
    return this.groupService.getGroups().pipe(
      tap(result=>{
        const state = getState();
        patchState({...state,
          groups:[...result],
          areGroupsLoaded:true
        });
      }),
      catchError(
        err=>{
        console.log({err});
        // TODO: implementar dispatch para manejar errores en el estado
        throw 'Se encontró un error'
        })
    );
  }

  @Action(GetCurrentUserProfile)
  getCurrentUserProfile({getState,patchState}:StateContext<UserProfileStateModel>, {payload}:GetCurrentUserProfile){

    const userProfileDoc= this.afs.doc<UserFirebase>(`users/${payload}`).valueChanges();
    const state = getState();

    return zip(this.userService.getUserById(payload),userProfileDoc).pipe(
      tap(([detail,profile])=>{
        patchState({
          user:{ ...state.user,
            badges: detail.badges,
            ban_events: detail.ban_events,
            active_events: detail.active_events,
            activities: detail.activities,
            group_member: detail.group_member,
            team_rol: detail.team_rol,
            fullName: profile.fullName,
            github: profile.github,
            facebook: profile.facebook,
            twitter: profile.twitter,
            country: profile.country,
            email: profile.email,
            userName:profile.userName,
            biography: profile.biography,
            interests: profile.interests,
            photoURL:profile.photoURL,
            linkedin:profile.linkedin,
            dateBirth:profile.dateBirth,
            uid:profile.uid,
            gender:profile.gender
          },
          areUserProfileLoaded: true
        });
      })
    );
  }

  @Action(GetAllBadges)
  getAllBadges({getState, patchState}:StateContext<UserProfileStateModel>){
    const state = getState();
    return this.badgesService.getBadges().pipe(
      tap(result=>{
        patchState({
          badges:result,
          areBadgesLoaded:true
        });
      }),
        // TODO: implementar dispatch para manejar errores en el estado
    );
  }

  @Action(GetAllEvents)
  getAllEvents({getState, patchState}:StateContext<UserProfileStateModel>){
    return this.eventsService.getEvents().pipe(
      tap(result=>{
        const state = getState();
        patchState({...state,
          events:[...result],
          areEventsLoaded:true
        });
      }),
        // TODO: implementar dispatch para manejar errores en el estado
    );
  }

  @Action(LoadGroupMembers)
  loadGroupMembers({getState,patchState}:StateContext<UserProfileStateModel>, {payload}:any){
    console.log('userid: ',payload.userId)
    return this.userService.getGroupMembersUserById(payload.userId,payload.groupMembersId).pipe(
      tap(
        result=>{
          const state = getState();
          patchState({
            ...state,
            userGroupMembers:result,
            areUserGroupLoaded:true,
          });
      }),
    );
  }

  @Action(ResetUserProfile)
  resetUserProfile({getState,patchState}:StateContext<UserProfileStateModel>){
    patchState({
      currentPage: 'nav-profile',
      user: {
        user_id:'',
        activities:[],
        uid:'',
        photoURL:'',
        fullName:'',
        gender:'',
        dateBirth:'',
        country:'',
        biography:'',
        facebook:'',
        github:'',
        twitter:'',
        linkedin:'',
        interests:[],
        userName:'',
        email:''
      } ,
      groups: [],
      badges: [],
      activities: [],
      events:[],
      userGroupMembers:null,
      areUserGroupLoaded:false,
      areUserProfileLoaded: false,
      areGroupsLoaded:false,
      areEventsLoaded:false,
      areBadgesLoaded:false,
    })
  }
}
