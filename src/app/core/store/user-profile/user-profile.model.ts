import { Activity, Badge, Event, Group, GroupMembers, UserProfile } from "../../models/user/user.models";

export class UserProfileStateModel{
  currentPage:string;
  user:UserProfile;
  groups: Group[];
  badges: Badge[];
  activities: Activity[];
  events:Event[];
  userGroupMembers:GroupMembers;
  areUserGroupLoaded:boolean;
  areGroupsLoaded:boolean;
  areEventsLoaded:boolean;
  areUserProfileLoaded:boolean;
  areBadgesLoaded:boolean;

}
