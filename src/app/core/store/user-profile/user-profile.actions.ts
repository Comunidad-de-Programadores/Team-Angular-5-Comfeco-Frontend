import { Activity, Event } from "../../models/user/user.models";

export class SetCurrentPage{
  static readonly type = '[USER PROFILE] Set Current Page'
  constructor(public payload: string ){}
}

export class AddAreaToUser{
  static readonly type = '[USER PROFILE] Add Area'
  constructor(public payload: string ){}
}


export class AddUserActivity{
  static readonly type = '[USER PROFILE] Add User Activity';
  constructor(public payload: Activity){}
}



export class AddUserEvent{
  static readonly type = '[USER PROFILE] Add User Event';
  constructor(public payload: Event){}
}

export class GetAllGroups{
  static readonly type = '[USER PROFILE] Get All Groups';
  constructor(){}
}


export class GetCurrentUserProfile{
  static readonly type = '[USER PROFILE] Get Current User';
  constructor(public payload:string){}
}

export class GetAllBadges{
  static readonly type = '[USER PROFILE] Get All Badges';
  constructor(){}
}

export class GetAllEvents{
  static readonly type = '[USER PROFILE] Get All Events';
  constructor(){}
}
