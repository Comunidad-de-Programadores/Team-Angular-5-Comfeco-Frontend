import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { combineLatest, zip } from "rxjs";
import { catchError, concatMap, map, mergeMap, take, tap } from "rxjs/operators";
import { User, UserFirebase } from "../../models/auth/user";
import { BadgesService } from "../../services/api/badges/badges.service";
import { EventsService } from "../../services/api/events/events.service";
import { GroupsService } from "../../services/api/groups/groups.service";
import { UserService } from "../../services/api/user/user.service";
import { SetCurrentPage, AddAreaToUser, AddUserActivity, AddUserEvent, GetAllGroups, GetCurrentUserProfile, GetAllBadges, GetAllEvents, LoadGroupMembers, AddBadgesToUser, UpdateUserProfile, ResetUserProfile, AddUserToGroup, RemoveUserOfGroup, AddEventToUser, RemoveUserOfEvent } from "./user-profile.actions";
import { UserProfileStateModel } from "./user-profile.model";
import { ApplicationState } from '../application/application.state'
import { UpdateUserActive } from "../application/application.actions";
import { NotificationService } from "../../services/notification.service";
import { Activity, Group, GroupMembers, UserDetail, UserProfile } from "../../models/user/user.models";
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
      email:'',
      activities:[],
      badges:[],
      ban_events:[],
      active_events:[],
      team_rol:null,
      group_member:''
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
    private afs:AngularFirestore,
    private ntfService: NotificationService) {
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

  @Selector()
  static getAllEventsWithUserOrWithout(state:UserProfileStateModel){
    let result= state.events.map(eventInPrincipalList=>{
      const event = state.user.active_events.find(active=>active.name===eventInPrincipalList.name);
      return (event)?{...eventInPrincipalList,isUserJoined:true}:{...eventInPrincipalList,isUserJoined:false}
    });
    // console.log('lista mapeada: ',result);
    return result;
  }

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
    return this.userService.postUserActivity(payload.userId,payload.activity).pipe(
      tap(result=>{
        const activity:Activity = result;
        patchState({...state,
          user:{...state.user,
            activities:[...state.user.activities,activity]
          }
        });
      }),
    );

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

  @Action(AddBadgesToUser)
  addBadges({getState, patchState}:StateContext<UserProfileStateModel>, {payload}:any){
    const state = getState();
    let result= state.user.badges.find(b=>b.id==payload.id);
    if (result?true:false) {
      return;

  }else {
    return this.userService.addBadgeToUser(payload.userId,{id: payload.id}).pipe(
      tap(result=>{
        patchState({
          user:{...state.user,
            badges:result.badges
          },
          areBadgesLoaded:true
        });
        this.ntfService.openSnackBar("¡Felicidades, te haz ganado una Insignia!", "BADGE!")

      }),
        // TODO: implementar dispatch para manejar errores en el estado
    );
  };
  }

  @Action(UpdateUserProfile)
  UpdateUserProfile({getState, patchState}:StateContext<UserProfileStateModel>, {payload}:UpdateUserProfile){
    const state = getState();

    return  patchState({
          user:{ ...state.user,
            user_id: payload.uid,
            uid: payload.uid,
            photoURL:payload.photoURL,
            fullName: payload.fullName,
            gender: payload.gender,
            dateBirth: payload.dateBirth,
            country: payload.country,
            biography: payload.biography,
            facebook: payload.facebook,
            github: payload.github,
            twitter: payload.twitter,
            linkedin: payload.linkedin,
            interests:payload.interests,
            userName: payload.userName,
            email:payload.email
          },
        });

        // TODO: implementar dispatch para manejar errores en el estado

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
  loadGroupMembers({getState,patchState}:StateContext<UserProfileStateModel>, {payload}:LoadGroupMembers){
    console.log('userid: ',payload.userId)
    let membersProfile:UserProfile[]=[];
    let groupMembers:GroupMembers;
    return this.userService.getGroupMembersUserById(payload.userId,payload.groupMembersId).pipe(
      // tap(
      //   result=>{

      //     const state = getState();
      //     patchState({
      //       ...state,
      //       userGroupMembers:result,
      //       areUserGroupLoaded:true,
      //     });
      // }),)

      // mergeMap(groupMembers=>combineLatest(groupMembers.members.map(member=>this.afs.doc<UserFirebase>(`users/${member.user_id}`).valueChanges()))
      //   .pipe(
      //     tap(usersFirebase=>{
      //       console.log({usersFirebase,groupMembers});
      //       const state = getState();
      //       let membersProfile:UserProfile[]=[];
      //       groupMembers.members.map((member,i)=>{
      //         const m = {...member,...usersFirebase[i]};
      //         membersProfile.push(m);
      //       });
      //       console.log({groupMembers})
      //       console.log({membersProfile})

      //       patchState({
      //         ...state,
      //         userGroupMembers:{...groupMembers,members:membersProfile},
      //         areUserGroupLoaded:true,
      //       });
      //     })
      //   ))

      mergeMap(gm=>combineLatest(gm.members.map(member=>this.afs.doc<UserFirebase>(`users/${member.user_id}`).valueChanges()))
        .pipe(
          map(usersFirebase=>{
            gm.members.map((member,i)=>{
              const m = {...member,...usersFirebase[i]};
              membersProfile.push(m);
            });
            groupMembers={group:gm.group,members:membersProfile};
           return groupMembers;
          })
        )),
        tap(result=>{
          // console.log({result});
          const state = getState();
          patchState({
            ...state,
            userGroupMembers:result,
            areUserGroupLoaded:true,
          });
        })
    );
  }

  @Action(ResetUserProfile)
  resetUserProfile({getState,patchState}:StateContext<UserProfileStateModel>){
    patchState({
      currentPage: 'nav-profile',
      user: {
        user_id:'',
        activities:[],
        badges:[],
        ban_events:[],
        active_events:[],
        team_rol:null,
        group_member:'',
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
        email:'',
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

  @Action(AddUserToGroup)
  addUserToGroup({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:AddUserToGroup){
    const state = getState();
    let response: {user?:UserDetail,groupMembers?:GroupMembers} = {};
    let groupMembers: GroupMembers;
    let membersProfile: UserProfile[]=[];
    return this.userService.addGroupToUser(payload.userId, payload.group).pipe(
      tap(userDetail=>{
        response.user= userDetail;
      }
      ),
      mergeMap(userDetail=>this.userService.getGroupMembersUserById(userDetail.user_id,userDetail.group_member)
        .pipe(
          tap(groupMembers=>{
            response.groupMembers = groupMembers;
          }),
        )
      ),
      mergeMap(gm=>combineLatest(gm.members.map(member=>this.afs.doc<UserFirebase>(`users/${member.user_id}`).valueChanges()))
        .pipe(
          map(usersFirebase=>{
            gm.members.map((member,i)=>{
              const m = {...member,...usersFirebase[i]};
              membersProfile.push(m);
            });
            groupMembers={group:gm.group,members:membersProfile};
           return groupMembers;
          })
        )),
      mergeMap(groupMembers=>this.userService.postUserActivity(response.user.user_id,{description:`Se unio al grupo "${payload.group.name}".`})
      .pipe(
        tap(activity=>{
          patchState({...state,
            user:{...state.user,
              group_member: response.user.group_member,
              team_rol: response.user.team_rol,
              activities:[...state.user.activities,activity]
            },
            userGroupMembers:groupMembers,
            areUserGroupLoaded:true,
          });
          this.ntfService.openSnackBar(`Se unio correctamente al grupo ${payload.group.name}`, "Aceptar");
        }),
      )),
    );
  }

  @Action(RemoveUserOfGroup)
  removeUserOfGroup({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:RemoveUserOfGroup){
    const state = getState();
    return this.userService.removeGroupToUser(payload.userId,payload.group).pipe(
      mergeMap(userDetail=> this.userService.postUserActivity(payload.userId,{description:`Ha abandonado el grupo "${payload.group.name}"`}).pipe(
        tap(activity=>{
          patchState({...state,
            user:{...state.user,
              activities:[...state.user.activities,activity],
              group_member:null,
              team_rol:null,
            }
          });
          this.ntfService.openSnackBar('Abandonó el grupo de manera satisfactoria.','Aceptar');
        })
      ))
    );
  }

  @Action(AddEventToUser)
  addEventToUser({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:AddEventToUser){
    const state = getState();
    let userDetail:UserDetail;
    return this.userService.addEventToUser(payload.userId,payload.event).pipe(
      tap(userDet=>userDetail=userDet),
      concatMap(()=>this.userService.postUserActivity(payload.userId,{description:`Se ha registrado al evento "${payload.event.name}".`})),
      tap(activity=>{
        patchState({...state,
          user:{...state.user,
            active_events:userDetail.active_events,
            activities:[...state.user.activities, activity]
          }
        }),
        this.ntfService.openSnackBar('Te registraste correctamente al evento','Aceptar');
      }),
      catchError((err)=>{
        console.log({err})
        throw 'Ocurrio un error al realizar la operación';
      })
    )
  }

  @Action(RemoveUserOfEvent)
  removeUserOfEvent({getState,patchState}:StateContext<UserProfileStateModel>,{payload}:RemoveUserOfEvent){
    const state= getState();
    let userDetail : UserDetail;
    return this.userService.removeEventToUser(payload.userId,payload.event).pipe(
      tap(res=>userDetail=res),
      concatMap(userDetail=>this.userService.postUserActivity(payload.userId,{description:`Ha salido del evento "${payload.event}".`})),
      tap(activity=>{
        patchState({...state,
          user:{...state.user,
            ban_events:userDetail.ban_events,
            active_events:userDetail.active_events,
            activities:[...state.user.activities,activity]
          }
        })
      }),
      catchError((err)=>{
        console.log({err});
        throw "Ocurrio un error al realizar la operación";
      })
    )

  }
}
