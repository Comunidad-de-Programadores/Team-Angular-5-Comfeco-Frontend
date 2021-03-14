import { Activity, Badge, Event, Group } from "../../models/user/user.models";

export class UserProfileStateModel{
  currentPage:string;
  user:any; // TODO: Cambiar tipo a interface usuario cuando este definida
  groups: Group[];
  badges: Badge[];
  activities: Activity[];
  events:Event[];
  areGroupsLoaded:boolean;
  areEventsLoaded:boolean;
  areUserProfileLoaded:boolean;
  areBadgesLoaded:boolean;

}
