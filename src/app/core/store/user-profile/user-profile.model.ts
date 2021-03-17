import { Activity, Badge, Event, Group, GroupMembers } from "../../models/user/user.models";

export class UserProfileStateModel{
  currentPage:string;
  user:any; // TODO: Cambiar tipo a interface usuario cuando este definida
  groups: Group[];
  badges: Badge[];
  activities: Activity[];
  events:Event[];
  userGroupMembers:GroupMembers[];
  areUserGroupLoade:boolean;
  areGroupsLoaded:boolean;
  areEventsLoaded:boolean;
  areUserProfileLoaded:boolean;
  areBadgesLoaded:boolean;

}
