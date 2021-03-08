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
  constructor(public payload: string){}
}



export class AddUserEvent{
  static readonly type = '[USER PROFILE] Add User Event';
  constructor(public payload: string){}
}
