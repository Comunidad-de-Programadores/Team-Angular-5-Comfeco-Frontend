import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs/operators";
import { BadgesService } from "../../services/api/badges/badges.service";
import { EventsService } from "../../services/api/events/events.service";
import { GroupsService } from "../../services/api/groups/groups.service";
import { UserService } from "../../services/api/user/user.service";
import { SetCurrentPage, AddAreaToUser, AddUserActivity, AddUserEvent, GetAllGroups, GetCurrentUserProfile, GetAllBadges, GetAllEvents, LoadGroupMembers } from "./user-profile.actions";
import { UserProfileStateModel } from "./user-profile.model";

@State({
  name: 'userProfile',
  defaults: {
    currentPage: 'nav-profile',
    user: {
      areas:['Frontend','Backend'],
      nick:'alejandra Mariel orozco',
      biografia: `Lorem ipsum dolor sit amet consectetur adipiscing
      elit ultricies, volutpat justo luctus tortor tempus
      aptent ligula nam maecenas, cursus bibendum aliquet
      sapien morbi proin neque. Id proin volutpat phasellus
      arcu posuere senectus erat tincidunt,
      curabitur ante potenti ornare aenean eu dignissim
      ultricies, facilisis sociis in magna urna ut tortor.
      Urna class ultrices eros nostra nec cubilia condimentum
      phasellus vulputate orci tincidunt, commodo tortor duis
      aptent nascetur mauris fringilla magnis habitasse netus
      justo mi, ac sagittis blandit neque senectus augue
      tempus vivamus aliquam proin.`,
      imgProfile:'data:image/jpeg;base64,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'
    } , // TODO: Cambiar tipo a interface usuario cuando este definida
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
    private eventsService: EventsService) {
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
  static areUserGroupLoaded(state:UserProfileStateModel){return state.areUserGroupLoade}

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
    user.areas=[...user.areas,payload];
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
    return this.userService.getUserById(payload).pipe(
      tap(result=>{
        const state = getState();
        patchState({
          user:{...state.user,
            badges:result.badges,
            ban_events:result.ban_events,
            active_events:result.active_events,
            activities:result.activities,
            group_member:result.group_member,
            team_rol:result.team_rol
          },
          areUserProfileLoaded:true
        });
      }),
        // TODO: implementar dispatch para manejar errores en el estado
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
            areUserGroupLoade:true,
          });
      }),
    );
  }
}
